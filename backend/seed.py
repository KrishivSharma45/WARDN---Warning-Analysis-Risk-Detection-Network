from database import engine, SessionLocal, Base
from models import User, Email, Analysis, Threat
from analyzer import analyze_email_content

# Realistic demo email dataset matching UI
SEED_EMAILS = [
  {
    "id": 1,
    "sender": "alerts@unknown-domain.com",
    "sender_name": "Bank Support",
    "subject": "URGENT: Action Required on Your Account",
    "preview": "We detected unusual activity on your account. Verify your identity immediately to avoid suspension.",
    "received_at": "9:14 AM",
    "is_read": False,
    "body": """Dear Customer,

We have detected unusual activity on your account that requires your immediate attention.

Your account has been temporarily limited. To restore full access, you must verify your identity within 24 hours.

Failure to act will result in permanent account suspension.

Please click the button below to verify your account immediately.

[ Verify Account Now ]

Thank you,
Bank Support Team"""
  },
  {
    "id": 2,
    "sender": "hr@career-offer.net",
    "sender_name": "HR Department",
    "subject": "Exciting Internship Opportunity - Apply Now!",
    "preview": "Congratulations! You have been selected for an exclusive internship. A small registration fee is required.",
    "received_at": "8:02 AM",
    "is_read": False,
    "body": """Hello,

Congratulations! Your profile was selected from thousands of applicants for an exclusive remote internship opportunity at our company.

This is a fully remote position with a competitive monthly stipend of $3,000.

To confirm your spot, please pay a one-time registration/training fee of $150 via PayPal or Zelle.

This is non-refundable and required to process your application.

Respond urgently — spots are limited.

Best regards,
HR Department"""
  },
  {
    "id": 3,
    "sender": "security@alert-service.net",
    "sender_name": "Security Alert",
    "subject": "Account Verification Required",
    "preview": "Your account verification is pending. Please complete this step to continue using our services.",
    "received_at": "Yesterday",
    "is_read": True,
    "body": """Hello,

This is a reminder that your account verification is still pending.

Please complete the verification process to ensure continued access to your account.

Click here to verify: http://verify.alert-service.net

If you have already verified, please disregard this message.

Regards,
Security Team"""
  },
  {
    "id": 4,
    "sender": "service@paypa1-billing.com",
    "sender_name": "PayPal",
    "subject": "Your Payment of $299.99 Has Been Processed",
    "preview": "A payment of $299.99 was processed from your account. If you did not authorize this, contact us immediately.",
    "received_at": "2 days ago",
    "is_read": True,
    "body": """Dear Customer,

A payment of $299.99 has been successfully processed from your PayPal account.

Transaction ID: #PP-92847561
Merchant: TechStore Premium
Date: August 7, 2026

If you did not authorize this transaction, please call our support line immediately at +1-888-555-0192 or click the link below to dispute this charge.

[ Dispute This Charge ]

PayPal Customer Service"""
  },
  {
    "id": 5,
    "sender": "noreply@google-accounts-verify.com",
    "sender_name": "Google Account",
    "subject": "Sign-in attempt blocked on your Google Account",
    "preview": "We blocked a suspicious sign-in attempt. Verify it was you to prevent account lockout.",
    "received_at": "Aug 6",
    "is_read": True,
    "body": """Hi,

We blocked a sign-in attempt from an unrecognized device in Moscow, Russia.

If this was you, please verify your identity to allow the sign-in.

If this wasn't you, your account may be at risk. Secure your account now.

[ Secure My Account ]

The Google Account Team"""
  },
  {
    "id": 6,
    "sender": "shipment@amazon-delivery.info",
    "sender_name": "Amazon",
    "subject": "Your package could not be delivered",
    "preview": "We attempted to deliver your package but were unable to. Please reschedule your delivery.",
    "received_at": "Aug 5",
    "is_read": True,
    "body": """Dear Customer,

We attempted to deliver your package today but were unable to complete delivery.

To reschedule, please update your delivery preferences and confirm your address within 48 hours or the package will be returned.

[ Reschedule Delivery ]

Amazon Logistics"""
  },
  {
    "id": 7,
    "sender": "hello@productupdate.io",
    "sender_name": "Newsletter",
    "subject": "Your monthly product digest is ready",
    "preview": "Here's your monthly roundup of product updates and feature releases.",
    "received_at": "Aug 4",
    "is_read": True,
    "body": """Hi there,

Here's your monthly roundup of what's new in your favorite tools.

This month's highlights:
- New dashboard analytics
- Improved search
- Mobile app updates

Unsubscribe | Manage Preferences"""
  },
  {
    "id": 8,
    "sender": "jobs-noreply@linkedin.com",
    "sender_name": "LinkedIn",
    "subject": "3 new job matches for you",
    "preview": "Based on your profile, we found 3 new jobs you might be interested in.",
    "received_at": "Aug 3",
    "is_read": True,
    "body": """Hi,

Based on your profile and preferences, we found 3 new job openings that match your skills:

1. Software Engineer at TechCorp — Remote
2. Frontend Developer at StartupXYZ — Hybrid
3. Full Stack Developer at Enterprise Inc — On-site

View all matches on LinkedIn."""
  }
]

def seed_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        # Seed default user
        user = User(email="user@gmail.com")
        db.add(user)
        db.commit()

        # Seed emails and generate deterministic analysis
        for e_data in SEED_EMAILS:
            email_obj = Email(
                id=e_data["id"],
                sender=e_data["sender"],
                sender_name=e_data["sender_name"],
                subject=e_data["subject"],
                preview=e_data["preview"],
                body=e_data["body"],
                received_at=e_data["received_at"],
                is_read=e_data["is_read"]
            )
            db.add(email_obj)
            db.commit()
            db.refresh(email_obj)

            # Analyze email via engine
            res = analyze_email_content(
                sender=email_obj.sender,
                sender_name=email_obj.sender_name,
                subject=email_obj.subject,
                body=email_obj.body
            )

            # Insert Analysis
            analysis_obj = Analysis(
                email_id=email_obj.id,
                risk_score=res["risk_score"],
                severity=res["severity"],
                category=res["category"],
                confidence=res["confidence"],
                explanation=res["explanation"]
            )
            db.add(analysis_obj)
            db.commit()
            db.refresh(analysis_obj)

            # Insert Threats/Red Flags
            for threat_item in res["threats"]:
                t_obj = Threat(
                    analysis_id=analysis_obj.id,
                    type=threat_item["type"],
                    description=threat_item["description"]
                )
                db.add(t_obj)
            db.commit()

        print("Database successfully seeded with 8 realistic demo emails and threat analyses!")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
