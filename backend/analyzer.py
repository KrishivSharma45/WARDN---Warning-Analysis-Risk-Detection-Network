import re
from urllib.parse import urlparse

# ============================================================
# TRUSTED DOMAINS
# ============================================================

KNOWN_SAFE_DOMAINS = [
    "google.com",
    "linkedin.com",
    "microsoft.com",
    "apple.com",
    "amazon.com",
    "github.com",
    "paypal.com",
    "instagram.com",
    "facebook.com",
    "youtube.com",
    "netflix.com",
    "spotify.com",
    "unidays.com",
]


# ============================================================
# HELPERS
# ============================================================

def extract_urls(text):
    """Extract URLs from email text."""

    if not text:
        return []

    urls = re.findall(
        r'https?://[^\s<>"\']+|www\.[^\s<>"\']+',
        text,
        flags=re.IGNORECASE
    )

    cleaned = []

    for url in urls:
        url = url.rstrip(".,;:!?)]}>")

        if url not in cleaned:
            cleaned.append(url)

    return cleaned


def get_domain(url):
    """Safely extract hostname from a URL."""

    try:
        normalized = url

        if not normalized.lower().startswith(("http://", "https://")):
            normalized = "https://" + normalized

        parsed = urlparse(normalized)

        return (parsed.hostname or "").lower().rstrip(".")

    except Exception:
        return ""


def is_trusted_domain(domain):
    """Check whether a domain belongs to the trusted whitelist."""

    if not domain:
        return False

    domain = domain.lower().rstrip(".")

    for trusted in KNOWN_SAFE_DOMAINS:
        trusted = trusted.lower()

        if domain == trusted or domain.endswith("." + trusted):
            return True

    return False


# ============================================================
# LINK INTELLIGENCE
# ============================================================

def analyze_link(url):
    """
    Analyze one URL and return a security profile.
    """

    original_url = url.strip().rstrip(".,;:!?)]}>")

    normalized_url = original_url

    if not normalized_url.lower().startswith(
        ("http://", "https://")
    ):
        normalized_url = "https://" + normalized_url

    indicators = []
    risk_score = 0

    try:
        parsed = urlparse(normalized_url)

        domain = (parsed.hostname or "").lower().rstrip(".")

        if not domain:
            return {
                "url": original_url,
                "domain": "unknown",
                "risk_score": 90,
                "status": "dangerous",
                "indicators": [
                    "Malformed or invalid URL"
                ]
            }

        # ----------------------------------------------------
        # 1. TRUSTED DOMAIN
        # ----------------------------------------------------

        trusted = is_trusted_domain(domain)

        if not trusted:
            risk_score += 30

            indicators.append(
                "Destination domain is not in the trusted domain whitelist"
            )

        # ----------------------------------------------------
        # 2. RAW IP ADDRESS
        # ----------------------------------------------------

        if re.match(
            r"^\d{1,3}(\.\d{1,3}){3}$",
            domain
        ):
            risk_score += 30

            indicators.append(
                "Link uses a raw IP address instead of a normal domain"
            )

        # ----------------------------------------------------
        # 3. SUSPICIOUS SECURITY KEYWORDS
        # ----------------------------------------------------

        security_keywords = [
            "login",
            "verify",
            "verification",
            "secure",
            "account",
            "update",
            "confirm",
            "password",
            "auth",
            "signin",
            "sign-in",
        ]

        keyword_hits = [
            keyword
            for keyword in security_keywords
            if keyword in domain
        ]

        if keyword_hits and not trusted:
            risk_score += 15

            indicators.append(
                "Domain contains account or security-related keywords"
            )

        # ----------------------------------------------------
        # 4. BRAND IMPERSONATION
        # ----------------------------------------------------

        brands = [
            "google",
            "paypal",
            "amazon",
            "microsoft",
            "apple",
            "linkedin",
            "github",
            "instagram",
            "facebook",
        ]

        for brand in brands:

            if brand in domain and not trusted:

                risk_score += 25

                indicators.append(
                    f"Possible {brand.title()} impersonation in destination domain"
                )

                break

        # ----------------------------------------------------
        # 5. HTTP WITHOUT HTTPS
        # ----------------------------------------------------

        if parsed.scheme.lower() == "http":

            risk_score += 15

            indicators.append(
                "Link does not use HTTPS"
            )

        # ----------------------------------------------------
        # 6. VERY LONG URL
        # ----------------------------------------------------

        if len(original_url) > 150:

            risk_score += 10

            indicators.append(
                "URL is unusually long"
            )

        # ----------------------------------------------------
        # 7. MANY QUERY PARAMETERS
        # ----------------------------------------------------

        query_parameters = []

        if parsed.query:
            query_parameters = parsed.query.split("&")

        if len(query_parameters) >= 5:

            risk_score += 10

            indicators.append(
                "URL contains many query parameters"
            )

        # ----------------------------------------------------
        # 8. URL ENCODING
        # ----------------------------------------------------

        if "%" in original_url:

            risk_score += 5

            indicators.append(
                "URL contains encoded characters"
            )

        # ----------------------------------------------------
        # 9. SUSPICIOUS TLD
        # ----------------------------------------------------

        suspicious_tlds = [
            ".zip",
            ".click",
            ".top",
            ".xyz",
            ".tk",
            ".ml",
            ".ga",
            ".cf",
            ".gq",
        ]

        if any(domain.endswith(tld) for tld in suspicious_tlds):

            risk_score += 15

            indicators.append(
                "Domain uses a commonly abused or suspicious top-level domain"
            )

        # ----------------------------------------------------
        # LIMIT SCORE
        # ----------------------------------------------------

        risk_score = min(100, risk_score)

        # ----------------------------------------------------
        # STATUS
        # ----------------------------------------------------

        if trusted and risk_score < 20:
            status = "trusted"

        elif risk_score >= 70:
            status = "dangerous"

        elif risk_score >= 40:
            status = "suspicious"

        else:
            status = "caution"

        # ----------------------------------------------------
        # NO RED FLAGS
        # ----------------------------------------------------

        if not indicators:

            indicators.append(
                "No major link-level risk indicators detected"
            )

        return {
            "url": original_url,
            "domain": domain,
            "risk_score": risk_score,
            "status": status,
            "indicators": indicators,
        }

    except Exception:

        return {
            "url": original_url,
            "domain": "unknown",
            "risk_score": 90,
            "status": "dangerous",
            "indicators": [
                "Unable to safely parse this URL"
            ],
        }


# ============================================================
# MAIN EMAIL ANALYZER
# ============================================================

def analyze_email_content(
    sender,
    sender_name,
    subject,
    body
):
    """
    Main Wardn email analysis engine.

    Returns:
        risk_score
        severity
        category
        confidence
        explanation
        threats
        link_intelligence
    """

    sender = sender or ""
    sender_name = sender_name or ""
    subject = subject or ""
    body = body or ""

    full_text = (
        f"{sender} "
        f"{sender_name} "
        f"{subject} "
        f"{body}"
    ).lower()

    score = 0
    flags = []

    # ========================================================
    # 1. SENDER DOMAIN ANALYSIS
    # ========================================================

    sender_domain = ""

    if "@" in sender:
        sender_domain = sender.split("@")[-1].lower().strip()

    if sender_domain and not is_trusted_domain(sender_domain):

        score += 15

        flags.append({
            "type": "Unverified Sender Domain",
            "description": (
                f"Sender domain '{sender_domain}' "
                "is not present in the verified domain whitelist."
            )
        })

    # ========================================================
    # 2. CREDENTIAL / IDENTITY HARVESTING
    # ========================================================

    credential_keywords = [
        "password",
        "passcode",
        "otp",
        "one-time password",
        "verification code",
        "login",
        "log in",
        "sign in",
        "signin",
        "verify your identity",
        "confirm your identity",
        "account verification",
        "security verification",
        "reset your password",
        "update your password",
    ]

    credential_hits = [
        word
        for word in credential_keywords
        if word in full_text
    ]

    if credential_hits:

        score += 25

        flags.append({
            "type": "Credential / Identity Harvesting Attempt",
            "description": (
                "The email contains language associated with "
                "requests for passwords, OTPs, login credentials, "
                "or identity information."
            )
        })

    # ========================================================
    # 3. URGENCY / PRESSURE
    # ========================================================

    urgency_keywords = [
        "urgent",
        "immediately",
        "act now",
        "action required",
        "within 24 hours",
        "expires today",
        "account will be closed",
        "account will be suspended",
        "final warning",
        "last chance",
        "respond immediately",
    ]

    urgency_hits = [
        word
        for word in urgency_keywords
        if word in full_text
    ]

    if urgency_hits:

        score += 15

        flags.append({
            "type": "Urgency / Pressure Tactics",
            "description": (
                "The message uses urgency or pressure to encourage "
                "the recipient to act quickly."
            )
        })

    # ========================================================
    # 4. PAYMENT / FINANCIAL SCAM
    # ========================================================

    payment_keywords = [
        "payment",
        "invoice",
        "refund",
        "transaction",
        "billing",
        "credit card",
        "debit card",
        "bank account",
        "wire transfer",
        "payment required",
        "amount due",
        "subscription payment",
        "payment failed",
    ]

    payment_hits = [
        word
        for word in payment_keywords
        if word in full_text
    ]

    if payment_hits:

        score += 20

        flags.append({
            "type": "Financial / Payment Risk",
            "description": (
                "The email contains financial or payment-related "
                "language that may require verification."
            )
        })

    # ========================================================
    # 5. JOB / INTERNSHIP SCAM
    # ========================================================

    job_keywords = [
        "job offer",
        "internship",
        "internship opportunity",
        "career opportunity",
        "selected for",
        "congratulations",
        "hiring",
        "recruitment",
        "registration fee",
        "processing fee",
        "application fee",
        "joining fee",
        "training fee",
        "pay a fee",
    ]

    job_hits = [
        word
        for word in job_keywords
        if word in full_text
    ]

    if job_hits:

        score += 20

        flags.append({
            "type": "Job / Internship Scam Risk",
            "description": (
                "The email contains job or internship language, "
                "especially potentially suspicious fee or payment requests."
            )
        })

    # ========================================================
    # 6. ACCOUNT TAKEOVER / SECURITY ALERT
    # ========================================================

    takeover_keywords = [
        "unusual activity",
        "suspicious activity",
        "new login",
        "new sign-in",
        "account compromised",
        "account locked",
        "account suspended",
        "security alert",
        "unauthorized access",
        "unauthorized login",
        "verify account",
    ]

    takeover_hits = [
        word
        for word in takeover_keywords
        if word in full_text
    ]

    if takeover_hits:

        score += 20

        flags.append({
            "type": "Account Takeover Risk",
            "description": (
                "The email claims that unusual or unauthorized "
                "account activity has occurred."
            )
        })

    # ========================================================
    # 7. LINK INTELLIGENCE
    # ========================================================

    urls = extract_urls(body)

    link_intelligence = [
        analyze_link(url)
        for url in urls
    ]

    suspicious_links = [
        link
        for link in link_intelligence
        if link["status"] in {
            "caution",
            "suspicious",
            "dangerous",
        }
    ]

    if suspicious_links:

        highest_link = max(
            suspicious_links,
            key=lambda item: item["risk_score"]
        )

        # Add controlled contribution to email risk.
        score += min(
            25,
            round(highest_link["risk_score"] * 0.25)
        )

        flags.append({
            "type": "Suspicious Embedded URL Destination",
            "description": (
                f"Contains a link ({highest_link['url'][:100]}) "
                f"pointing to an unverified or suspicious destination."
            )
        })

    # ========================================================
    # 8. ATTACHMENT / DOCUMENT LANGUAGE
    # ========================================================

    attachment_keywords = [
        "open the attachment",
        "attached document",
        "download the attachment",
        "download this file",
        "open this file",
        "attached invoice",
        "attached form",
        "enable macros",
    ]

    attachment_hits = [
        word
        for word in attachment_keywords
        if word in full_text
    ]

    if attachment_hits:

        score += 10

        flags.append({
            "type": "Suspicious Attachment Language",
            "description": (
                "The message asks the recipient to open or download "
                "an attachment or document."
            )
        })

    # ========================================================
    # 9. EXCESSIVE URGENCY / EXCLAMATION
    # ========================================================

    if subject.count("!") >= 2:

        score += 5

        flags.append({
            "type": "Aggressive Subject Formatting",
            "description": (
                "The subject contains repeated exclamation marks "
                "that may be intended to create urgency."
            )
        })

    # ========================================================
    # CAP SCORE
    # ========================================================

    score = min(
        100,
        max(0, score)
    )

    # ========================================================
    # CATEGORY
    # ========================================================

    if payment_hits:
        category = "Payment Scam"

    elif job_hits:
        category = "Job Scam"

    elif credential_hits:
        category = "Credential Phishing"

    elif takeover_hits:
        category = "Account Takeover"

    elif suspicious_links:
        category = "Phishing"

    elif attachment_hits:
        category = "Suspicious Attachment"

    else:
        category = "General"

    # ========================================================
    # SEVERITY
    # ========================================================

    if score >= 85:
        severity = "critical"

    elif score >= 65:
        severity = "high"

    elif score >= 35:
        severity = "suspicious"

    else:
        severity = "safe"

    # ========================================================
    # CONFIDENCE
    # ========================================================

    if len(flags) >= 3:
        confidence = 95

    elif len(flags) == 2:
        confidence = 92

    elif len(flags) == 1:
        confidence = 88

    else:
        confidence = 96

    # ========================================================
    # EXPLANATION
    # ========================================================

    if flags:

        threat_names = [
            flag["type"]
            for flag in flags
        ]

        explanation = (
            f"This email has been flagged with a risk score "
            f"of {score}/100 ({severity.upper()}). "
            f"The analysis detected the following signals: "
            f"{'; '.join(threat_names)}. "
            "Recommended action: avoid interacting with "
            "suspicious links or attachments and verify the "
            "sender through another trusted channel."
        )

    else:

        explanation = (
            "No significant phishing, payment, credential, "
            "account takeover, or suspicious link indicators "
            "were detected. The email passes the current "
            "Wardn safety checks."
        )

    # ========================================================
    # FINAL RESULT
    # ========================================================

    return {
        "risk_score": score,
        "severity": severity,
        "category": category,
        "confidence": confidence,
        "explanation": explanation,
        "threats": flags,
        "link_intelligence": link_intelligence,
    }