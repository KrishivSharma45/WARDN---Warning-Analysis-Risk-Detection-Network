import re


KNOWN_SAFE_DOMAINS = [
    "google.com",
    "linkedin.com",
    "microsoft.com",
    "apple.com",
    "amazon.com",
    "github.com",
    "paypal.com",
    "chase.com"
]


URGENCY_KEYWORDS = [
    "urgent",
    "immediately",
    "24 hours",
    "account lockout",
    "suspended",
    "action required",
    "disregard",
    "confirm spot",
    "spots are limited"
]


PAYMENT_KEYWORDS = [
    "registration fee",
    "training fee",
    "zelle",
    "paypal fee",
    "wire transfer",
    "gift card",
    "dispute this charge",
    "processed",
    "$299.99",
    "$150"
]


CREDENTIAL_KEYWORDS = [
    "verify your identity",
    "verify account",
    "enter password",
    "otp",
    "sign-in attempt",
    "unauthorized access",
    "login credentials"
]


JOB_SCAM_KEYWORDS = [
    "exclusive remote internship",
    "selected from thousands",
    "monthly stipend",
    "training fee",
    "registration fee"
]


def analyze_email_content(
    sender: str,
    sender_name: str,
    subject: str,
    body: str
) -> dict:

    score = 0
    flags = []
    category = "Safe"

    # Combine subject and body for analysis
    combined_text = (subject + " " + body).lower()
    sender_lower = sender.lower()

    # ============================================================
    # 1. SUSPICIOUS DOMAIN CHECK
    # ============================================================

    domain_match = re.search(r"@([\w.-]+)", sender_lower)
    domain = domain_match.group(1) if domain_match else ""

    if domain:

        # Check for domains that imitate trusted brands
        spoofed_patterns = [
            "unknown-domain",
            "career-offer",
            "alert-service",
            "paypa1",
            "google-accounts-verify",
            "amazon-delivery"
        ]

        if any(pattern in domain for pattern in spoofed_patterns):

            score += 35

            flags.append({
                "type": "Mismatched / Spoofed Sender Domain",
                "description": (
                    f"The sender domain '{domain}' is unverified "
                    "and exhibits patterns commonly associated with "
                    "brand impersonation or spoofing."
                )
            })

        # Any domain outside the trusted whitelist is considered
        # unverified. This prevents unknown .com domains from being
        # automatically treated as safe.
        elif domain not in KNOWN_SAFE_DOMAINS:

            score += 15

            flags.append({
                "type": "Unverified Sender Domain",
                "description": (
                    f"Sender domain '{domain}' is not present "
                    "in the verified domain whitelist."
                )
            })

    # ============================================================
    # 2. ARTIFICIAL URGENCY DETECTION
    # ============================================================

    urgency_hits = [
        keyword
        for keyword in URGENCY_KEYWORDS
        if keyword in combined_text
    ]

    if urgency_hits:

        score += 20

        flags.append({
            "type": "Artificial Urgency Tactics",
            "description": (
                "The email uses psychological pressure or urgency "
                f"keywords ({', '.join(urgency_hits[:2])}) "
                "to encourage immediate action."
            )
        })

    # ============================================================
    # 3. PAYMENT REQUEST DETECTION
    # ============================================================

    payment_hits = [
        keyword
        for keyword in PAYMENT_KEYWORDS
        if keyword in combined_text
    ]

    if payment_hits:

        score += 25

        flags.append({
            "type": "Upfront Payment / Financial Request",
            "description": (
                "The email requests an upfront payment, fee transfer, "
                "financial transaction, or references suspicious billing activity."
            )
        })

    # ============================================================
    # 4. CREDENTIAL HARVESTING DETECTION
    # ============================================================

    credential_hits = [
        keyword
        for keyword in CREDENTIAL_KEYWORDS
        if keyword in combined_text
    ]

    if credential_hits:

        score += 25

        flags.append({
            "type": "Credential / Identity Harvesting Attempt",
            "description": (
                "The email contains language associated with requests "
                "for passwords, OTPs, login credentials, or identity information."
            )
        })

    # ============================================================
    # 5. JOB SCAM DETECTION
    # ============================================================

    job_scam_detected = any(
        keyword in combined_text
        for keyword in JOB_SCAM_KEYWORDS
    )

    if job_scam_detected:

        score += 25

        category = "Job Scam"

        flags.append({
            "type": "Unsolicited Job / Internship Scam Pattern",
            "description": (
                "The email contains patterns commonly associated with "
                "fraudulent employment or internship offers, particularly "
                "offers involving registration or training fees."
            )
        })

    # ============================================================
    # 6. SUSPICIOUS LINK DETECTION
    # ============================================================

    links = re.findall(
        r'https?://[^\s<>"]+|www\.[^\s<>"]+',
        body
    )

    suspicious_links = [
        link
        for link in links
        if not any(
            domain_name in link.lower()
            for domain_name in KNOWN_SAFE_DOMAINS
        )
    ]

    if suspicious_links:

        score += 20

        flags.append({
            "type": "Suspicious Embedded URL Destination",
            "description": (
                f"Contains a link ({suspicious_links[0][:40]}...) "
                "pointing to an unverified external destination."
            )
        })

    # ============================================================
    # 7. CAP SCORE
    # ============================================================

    score = min(100, score)

    # ============================================================
    # 8. DETERMINE SEVERITY AND CATEGORY
    # ============================================================

    if score >= 85:

        severity = "critical"

        if (
            "paypa" in combined_text
            or "billing" in combined_text
            or "dispute" in combined_text
            or "payment" in combined_text
        ):
            category = "Payment Scam"

        elif (
            "job" in combined_text
            or "internship" in combined_text
        ):
            category = "Job Scam"

        else:
            category = "Phishing"

    elif score >= 60:

        severity = "high"

        if (
            "sign-in" in combined_text
            or "blocked" in combined_text
            or "google" in combined_text
        ):
            category = "Account Takeover"

        elif (
            "delivery" in combined_text
            or "amazon" in combined_text
        ):
            category = "Impersonation"

        elif (
            "job" in combined_text
            or "internship" in combined_text
        ):
            category = "Job Scam"

        else:
            category = "Phishing"

    elif score >= 25:

        severity = "suspicious"
        category = "Suspicious Link"

    else:

        severity = "safe"
        category = "Safe"

        # Keep a minimum visible score for the dashboard
        score = max(5, score)

    # ============================================================
    # 9. GENERATE PLAIN-ENGLISH SECURITY EXPLANATION
    # ============================================================

    if severity == "safe":

        explanation = (
            "This email appears relatively safe based on the signals "
            "currently detected. No major phishing, payment, "
            "credential-harvesting, or suspicious-link indicators "
            "were found."
        )

    else:

        # Collect the names of all detected threats
        threat_names = [
            flag["type"]
            for flag in flags
        ]

        # Show a maximum of four signals in the explanation
        reasons = "; ".join(threat_names[:4])

        # Generate severity-specific recommendation
        if severity == "critical":

            recommendation = (
                "Do not click links, provide credentials, "
                "send money, or reply to the sender."
            )

        elif severity == "high":

            recommendation = (
                "Avoid interacting with links or attachments "
                "and verify the sender through another trusted channel."
            )

        else:

            recommendation = (
                "Exercise caution and verify the sender "
                "before taking any requested action."
            )

        explanation = (
            f"This email has been flagged with a risk score of "
            f"{score}/100 ({severity.upper()}). "
            f"The analysis detected the following signals: "
            f"{reasons}. "
            f"Recommended action: {recommendation}"
        )

    # ============================================================
    # 10. DETERMINE CONFIDENCE
    # ============================================================

    if score > 80:
        confidence = 96
    elif score >= 50:
        confidence = 92
    else:
        confidence = 88

    # ============================================================
    # 11. RETURN SECURITY ANALYSIS
    # ============================================================

    return {
        "risk_score": score,
        "severity": severity,
        "category": category,
        "confidence": confidence,
        "explanation": explanation,
        "threats": flags
    }