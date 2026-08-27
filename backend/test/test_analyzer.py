import sys
from pathlib import Path

# Allow the test file to import analyzer.py from the backend folder
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from analyzer import analyze_email_content
from gmail_service import _friendly_error


def get_url_flag(url):
    result = analyze_email_content(
        "sender@github.com",
        "Test Sender",
        "Test Email",
        url
    )

    return any(
        threat["type"] == "Suspicious Embedded URL Destination"
        for threat in result["threats"]
    )


def test_trusted_github_domain():
    assert get_url_flag("https://github.com/test") is False


def test_trusted_google_subdomain():
    assert get_url_flag("https://mail.google.com/test") is False


def test_lookalike_github_domain():
    assert get_url_flag("https://evil-github.com/test") is True


def test_suspicious_external_domain():
    assert get_url_flag("https://example-scam.com/test") is True

def test_friendly_error_for_expired_authorization():
    message = _friendly_error(Exception("invalid_grant"))
    assert "authorization expired" in message.lower()


def test_friendly_error_for_api_quota():
    message = _friendly_error(Exception("quota exceeded"))
    assert "api limit" in message.lower()


def test_friendly_error_for_connection_issue():
    message = _friendly_error(Exception("connection timeout"))
    assert "connect to gmail" in message.lower()