import base64
import json
import os
import threading
from email.utils import parseaddr
from pathlib import Path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build

from analyzer import analyze_email_content
import models
from database import SessionLocal

SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"]
BASE_DIR = Path(__file__).resolve().parent
CREDENTIALS_PATH = BASE_DIR / "credentials.json"
TOKEN_PATH = BASE_DIR / "token.json"

_state = {
    "status": "disconnected",
    "email": None,
    "message": "",
    "imported": 0,
}
_lock = threading.Lock()


def get_state():
    with _lock:
        return dict(_state)


def _set_state(**kwargs):
    with _lock:
        _state.update(kwargs)


def _get_credentials():
    if not CREDENTIALS_PATH.exists():
        raise FileNotFoundError(
            "backend/credentials.json is missing. Download a Desktop OAuth client "
            "from Google Cloud and place it in backend/credentials.json."
        )

    creds = None
    if TOKEN_PATH.exists():
        creds = Credentials.from_authorized_user_file(str(TOKEN_PATH), SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                str(CREDENTIALS_PATH), SCOPES
            )
            # Google opens the local browser for the user authorization flow.
            creds = flow.run_local_server(
    host="127.0.0.1",
    bind_addr="127.0.0.1",
    port=8080,
    open_browser=False
)

        TOKEN_PATH.write_text(creds.to_json(), encoding="utf-8")

    return creds


def _decode_body(payload):
    if not payload:
        return ""

    mime_type = payload.get("mimeType", "")
    body_data = (payload.get("body") or {}).get("data")
    if body_data and (mime_type.startswith("text/plain") or not payload.get("parts")):
        try:
            return base64.urlsafe_b64decode(body_data + "==").decode(
                "utf-8", errors="ignore"
            )
        except Exception:
            return ""

    parts = payload.get("parts") or []
    texts = []
    for part in parts:
        text = _decode_body(part)
        if text:
            texts.append(text)
    return "\n".join(texts)


def _headers(payload):
    return {
        h.get("name", "").lower(): h.get("value", "")
        for h in (payload.get("headers") or [])
    }


def _import_messages(service, db, max_results=15):
    result = service.users().messages().list(
        userId="me",
        labelIds=["INBOX"],
        maxResults=max_results,
    ).execute()

    message_ids = [m["id"] for m in result.get("messages", [])]
    imported = 0

    for message_id in message_ids:
        msg = service.users().messages().get(
            userId="me",
            id=message_id,
            format="full",
        ).execute()

        payload = msg.get("payload") or {}
        headers = _headers(payload)
        sender_raw = headers.get("from", "")
        sender_name, sender = parseaddr(sender_raw)
        sender = sender or sender_raw or "unknown@unknown"
        sender_name = sender_name or sender.split("@")[0]
        subject = headers.get("subject", "(No subject)")
        body = _decode_body(payload).strip()
        if not body:
            body = msg.get("snippet", "")

        internal_date = msg.get("internalDate")
        received_at = "Recently"
        if internal_date:
            try:
                from datetime import datetime, timezone
                received_at = datetime.fromtimestamp(
                    int(internal_date) / 1000, tz=timezone.utc
                ).strftime("%Y-%m-%d %H:%M UTC")
            except Exception:
                pass

        # Lightweight duplicate protection for repeated syncs.
        existing = (
            db.query(models.Email)
            .filter(
                models.Email.sender == sender,
                models.Email.subject == subject,
                models.Email.received_at == received_at,
            )
            .first()
        )
        if existing:
            continue

        result = analyze_email_content(
            sender=sender,
            sender_name=sender_name,
            subject=subject,
            body=body,
        )

        email_obj = models.Email(
            sender=sender,
            sender_name=sender_name,
            subject=subject,
            preview=body[:120],
            body=body,
            received_at=received_at,
            is_read="UNREAD" not in msg.get("labelIds", []),
        )
        db.add(email_obj)
        db.flush()

        analysis_obj = models.Analysis(
            email_id=email_obj.id,
            risk_score=result["risk_score"],
            severity=result["severity"],
            category=result["category"],
            confidence=result["confidence"],
            explanation=result["explanation"],
        )
        db.add(analysis_obj)
        db.flush()

        for threat in result["threats"]:
            db.add(
                models.Threat(
                    analysis_id=analysis_obj.id,
                    type=threat["type"],
                    description=threat["description"],
                )
            )

        imported += 1

    db.commit()
    return imported
def _friendly_error(exc):
    error_text = str(exc).lower()

    if isinstance(exc, FileNotFoundError):
        return str(exc)

    if "invalid_grant" in error_text:
        return "Gmail authorization expired. Please reconnect your Gmail account."

    if "access_denied" in error_text or "permission" in error_text:
        return "Gmail permission was denied. Please reconnect and allow read-only access."

    if "credentials" in error_text or "token" in error_text:
        return "Gmail authentication failed. Please reconnect your Gmail account."

    if "quota" in error_text or "rate limit" in error_text:
        return "Gmail API limit reached. Please try syncing again later."

    if "connection" in error_text or "timeout" in error_text:
        return "Could not connect to Gmail. Please check your internet connection and try again."

    return "Something went wrong while connecting to Gmail. Please try again."


def _connect_worker():
    try:
        _set_state(status="authorizing", message="Waiting for Google authorization…")
        creds = _get_credentials()
        service = build("gmail", "v1", credentials=creds)

        profile = service.users().getProfile(userId="me").execute()
        email = profile.get("emailAddress")

        db = SessionLocal()
        try:
            imported = _import_messages(service, db)
        finally:
            db.close()

        _set_state(
            status="connected",
            email=email,
            imported=imported,
            message=f"Gmail connected. Imported {imported} new inbox emails.",
        )
    except Exception as exc:
     _set_state(
        status="error",
        message=_friendly_error(exc),
    )


def start_connect():
    state = get_state()
    if state["status"] in {"authorizing", "syncing"}:
        return state

    thread = threading.Thread(target=_connect_worker, daemon=True)
    thread.start()
    return get_state()


def sync_now():
    try:
        creds = _get_credentials()
        service = build("gmail", "v1", credentials=creds)
        profile = service.users().getProfile(userId="me").execute()

        _set_state(
            status="syncing",
            email=profile.get("emailAddress"),
            message="Syncing your inbox…",
        )

        db = SessionLocal()
        try:
            imported = _import_messages(service, db)
        finally:
            db.close()

        _set_state(
            status="connected",
            email=profile.get("emailAddress"),
            imported=imported,
            message=f"Sync complete. Imported {imported} new emails.",
        )
        return get_state()
    except Exception as exc:
     _set_state(
        status="error",
        message=_friendly_error(exc),
    )
    return get_state()


def disconnect():
    # Revoke is intentionally not automatic for this local hackathon build.
    # Removing token.json makes the next connection ask for authorization again.
    try:
        if TOKEN_PATH.exists():
            TOKEN_PATH.unlink()
    finally:
        _set_state(
            status="disconnected",
            email=None,
            imported=0,
            message="Gmail connection removed from this local prototype.",
        )
    return get_state()
