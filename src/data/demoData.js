// Demo data for ScamShield AI

export const demoEmails = [
  {
    id: "1",
    sender: "Bank Support",
    email: "alerts@unknown-domain.com",
    subject: "URGENT: Action Required on Your Account",
    preview: "We detected unusual activity on your account. Verify your identity immediately to avoid suspension.",
    time: "9:14 AM",
    date: "Today",
    riskScore: 91,
    category: "Phishing",
    severity: "critical",
    read: false,
    body: `Dear Customer,

We have detected unusual activity on your account that requires your immediate attention.

Your account has been temporarily limited. To restore full access, you must verify your identity within 24 hours.

Failure to act will result in permanent account suspension.

Please click the button below to verify your account immediately.

[ Verify Account Now ]

Thank you,
Bank Support Team`,
    suspiciousLinks: ["http://bank-verify-account.suspicious-domain.com/login"],
    flags: [
      { label: "Mismatched sender domain", detail: "The email claims to be from a major bank but originates from 'unknown-domain.com', which has no affiliation with any legitimate financial institution." },
      { label: "Artificial urgency", detail: "Phrases like 'immediate action', '24 hours', and 'permanent suspension' are classic pressure tactics used to override rational decision-making." },
      { label: "Suspicious link", detail: "The 'Verify Account Now' button leads to 'bank-verify-account.suspicious-domain.com' — not a real bank domain." },
      { label: "Credential request", detail: "Legitimate banks never ask you to verify login credentials via email. This is a credential harvesting attempt." }
    ],
    aiExplanation: "This email appears to impersonate a legitimate financial institution but contains multiple critical indicators of a phishing attack. The sender domain does not match any known bank, artificial urgency is used to pressure you into clicking a link, and the destination URL is a credential-harvesting site designed to steal your login information."
  },
  {
    id: "2",
    sender: "HR Department",
    email: "hr@career-offer.net",
    subject: "Exciting Internship Opportunity - Apply Now!",
    preview: "Congratulations! You have been selected for an exclusive internship. A small registration fee is required.",
    time: "8:02 AM",
    date: "Today",
    riskScore: 76,
    category: "Job Scam",
    severity: "high",
    read: false,
    body: `Hello,

Congratulations! Your profile was selected from thousands of applicants for an exclusive remote internship opportunity at our company.

This is a fully remote position with a competitive monthly stipend of $3,000.

To confirm your spot, please pay a one-time registration/training fee of $150 via PayPal or Zelle.

This is non-refundable and required to process your application.

Respond urgently — spots are limited.

Best regards,
HR Department`,
    suspiciousLinks: [],
    flags: [
      { label: "Upfront payment requested", detail: "Legitimate employers never ask for payment to start a job. Any request for 'registration fees', 'training fees', or 'equipment deposits' is a red flag." },
      { label: "Suspicious sender domain", detail: "The email comes from 'career-offer.net', a generic domain with no verifiable company identity." },
      { label: "Artificial urgency", detail: "'Respond urgently — spots are limited' is a pressure tactic to prevent you from verifying the offer." },
      { label: "Unsolicited job offer", detail: "You did not apply to this company. Receiving an unsolicited offer is a common job scam pattern." }
    ],
    aiExplanation: "This email exhibits the hallmark signs of a job scam. The request for upfront payment before employment begins is the clearest red flag — legitimate companies do not charge applicants. The use of artificial urgency and an unverifiable sender domain further confirm this is fraudulent."
  },
  {
    id: "3",
    sender: "Security Alert",
    email: "security@alert-service.net",
    subject: "Account Verification Required",
    preview: "Your account verification is pending. Please complete this step to continue using our services.",
    time: "Yesterday",
    date: "Yesterday",
    riskScore: 52,
    category: "Suspicious",
    severity: "suspicious",
    read: true,
    body: `Hello,

This is a reminder that your account verification is still pending.

Please complete the verification process to ensure continued access to your account.

Click here to verify: http://verify.alert-service.net

If you have already verified, please disregard this message.

Regards,
Security Team`,
    suspiciousLinks: ["http://verify.alert-service.net"],
    flags: [
      { label: "Generic sender domain", detail: "The sender uses 'alert-service.net', which is not associated with any identifiable company or service." },
      { label: "Vague service reference", detail: "The email does not specify which account or service is being referenced, a common tactic to cast a wide phishing net." },
      { label: "Suspicious link", detail: "The verification link points to 'alert-service.net', not a known legitimate domain." }
    ],
    aiExplanation: "This email has several suspicious characteristics including an unidentifiable sender domain and a vague account reference. While not definitively malicious, the combination of these factors warrants caution. Do not click any links until you verify this email independently."
  },
  {
    id: "4",
    sender: "PayPal",
    email: "service@paypa1-billing.com",
    subject: "Your Payment of $299.99 Has Been Processed",
    preview: "A payment of $299.99 was processed from your account. If you did not authorize this, contact us immediately.",
    time: "2 days ago",
    date: "Aug 7",
    riskScore: 88,
    category: "Payment Scam",
    severity: "critical",
    read: true,
    body: `Dear Customer,

A payment of $299.99 has been successfully processed from your PayPal account.

Transaction ID: #PP-92847561
Merchant: TechStore Premium
Date: August 7, 2026

If you did not authorize this transaction, please call our support line immediately at +1-888-555-0192 or click the link below to dispute this charge.

[ Dispute This Charge ]

PayPal Customer Service`,
    suspiciousLinks: ["http://paypal-dispute.fake-billing.com/dispute"],
    flags: [
      { label: "Misspelled sender domain", detail: "The email comes from 'paypa1-billing.com' (note the number '1' instead of 'l') — a classic typosquatting tactic." },
      { label: "Fake transaction alert", detail: "This is designed to create panic about an unauthorized payment, prompting you to call a fake support number or click a malicious link." },
      { label: "Suspicious phone number", detail: "The provided support number is not an official PayPal number. Calling it may connect you to scammers who will ask for your credentials." },
      { label: "Phishing link", detail: "The 'Dispute This Charge' link leads to a non-PayPal domain designed to harvest credentials." }
    ],
    aiExplanation: "This is a classic payment scam using a fake transaction to create urgency. The misspelled domain 'paypa1-billing.com' is a clear impersonation attempt. Do not call the number or click any links. If you are concerned, log in to PayPal directly through your browser."
  },
  {
    id: "5",
    sender: "Google Account",
    email: "noreply@google-accounts-verify.com",
    subject: "Sign-in attempt blocked on your Google Account",
    preview: "We blocked a suspicious sign-in attempt. Verify it was you to prevent account lockout.",
    time: "Aug 6",
    date: "Aug 6",
    riskScore: 83,
    category: "Account Takeover",
    severity: "high",
    read: true,
    body: `Hi,

We blocked a sign-in attempt from an unrecognized device in Moscow, Russia.

If this was you, please verify your identity to allow the sign-in.

If this wasn't you, your account may be at risk. Secure your account now.

[ Secure My Account ]

The Google Account Team`,
    suspiciousLinks: ["http://google-accounts-verify.com/secure"],
    flags: [
      { label: "Fake Google domain", detail: "Google sends account security emails from '@google.com' or '@accounts.google.com', not 'google-accounts-verify.com'." },
      { label: "Geographic intimidation", detail: "Mentioning a specific foreign location (Moscow, Russia) is designed to create fear and override your critical thinking." },
      { label: "Phishing link", detail: "The 'Secure My Account' button leads to 'google-accounts-verify.com', a phishing site that will steal your Google credentials." }
    ],
    aiExplanation: "This email impersonates a Google account security alert but uses a fake domain designed to steal your credentials. The geographic scare tactic is used to create panic. Never click security links from emails — always navigate to google.com directly."
  },
  {
    id: "6",
    sender: "Amazon",
    email: "shipment@amazon-delivery.info",
    subject: "Your package could not be delivered",
    preview: "We attempted to deliver your package but were unable to. Please reschedule your delivery.",
    time: "Aug 5",
    date: "Aug 5",
    riskScore: 67,
    category: "Impersonation",
    severity: "high",
    read: true,
    body: `Dear Customer,

We attempted to deliver your package today but were unable to complete delivery.

To reschedule, please update your delivery preferences and confirm your address within 48 hours or the package will be returned.

[ Reschedule Delivery ]

Amazon Logistics`,
    suspiciousLinks: ["http://amazon-delivery.info/reschedule"],
    flags: [
      { label: "Non-Amazon sender domain", detail: "Amazon delivers notifications from 'amazon.com' or 'amazon.co.uk'. This email originates from 'amazon-delivery.info', which is not affiliated with Amazon." },
      { label: "No order details", detail: "A legitimate delivery failure email would include your order number, items ordered, and tracking ID." },
      { label: "Suspicious link", detail: "The 'Reschedule Delivery' link points to a non-Amazon domain." }
    ],
    aiExplanation: "This email impersonates Amazon's delivery notification system. The use of a generic 'amazon-delivery.info' domain and lack of order-specific details are strong indicators of a phishing attempt aimed at stealing your Amazon credentials or personal information."
  },
  {
    id: "7",
    sender: "Newsletter",
    email: "hello@productupdate.io",
    subject: "Your monthly product digest is ready",
    preview: "Here's your monthly roundup of product updates and feature releases.",
    time: "Aug 4",
    date: "Aug 4",
    riskScore: 8,
    category: "Safe",
    severity: "safe",
    read: true,
    body: `Hi there,

Here's your monthly roundup of what's new in your favorite tools.

This month's highlights:
- New dashboard analytics
- Improved search
- Mobile app updates

Unsubscribe | Manage Preferences`,
    suspiciousLinks: [],
    flags: [],
    aiExplanation: "This email appears to be a legitimate marketing newsletter. The sender domain is consistent, there are no suspicious links, and the content is informational with no pressure tactics or credential requests."
  },
  {
    id: "8",
    sender: "LinkedIn",
    email: "jobs-noreply@linkedin.com",
    subject: "3 new job matches for you",
    preview: "Based on your profile, we found 3 new jobs you might be interested in.",
    time: "Aug 3",
    date: "Aug 3",
    riskScore: 5,
    category: "Safe",
    severity: "safe",
    read: true,
    body: `Hi,

Based on your profile and preferences, we found 3 new job openings that match your skills:

1. Software Engineer at TechCorp — Remote
2. Frontend Developer at StartupXYZ — Hybrid
3. Full Stack Developer at Enterprise Inc — On-site

View all matches on LinkedIn.`,
    suspiciousLinks: [],
    flags: [],
    aiExplanation: "This email is from a legitimate LinkedIn sender domain (linkedin.com). The content matches expected LinkedIn job alert behavior with no suspicious patterns detected."
  }
];

export const threatStats = {
  protectionScore: 94,
  emailsScanned: 1284,
  suspicious: 12,
  threatsDetected: 8
};

export const reportData = {
  emailsAnalyzed: 248,
  threatsDetected: 21,
  averageRisk: 32,
  protectionScore: 94,
  breakdown: [
    { name: "Phishing", value: 42, color: "#EF4444" },
    { name: "Job Scams", value: 27, color: "#F97316" },
    { name: "Payment Scams", value: 18, color: "#EAB308" },
    { name: "Impersonation", value: 13, color: "#6B7280" }
  ],
  weeklyTrends: [
    { day: "Mon", threats: 2, safe: 18 },
    { day: "Tue", threats: 4, safe: 22 },
    { day: "Wed", threats: 1, safe: 31 },
    { day: "Thu", threats: 3, safe: 19 },
    { day: "Fri", threats: 5, safe: 27 },
    { day: "Sat", threats: 2, safe: 14 },
    { day: "Sun", threats: 4, safe: 21 }
  ]
};

export const learnContent = [
  {
    id: "phishing",
    title: "Phishing",
    icon: "fish",
    color: "#EF4444",
    description: "Deceptive emails that impersonate legitimate organizations to steal credentials or personal information.",
    whatItIs: "Phishing is a type of social engineering attack where criminals send fraudulent emails that appear to come from reputable sources — banks, tech companies, government agencies — to trick recipients into revealing sensitive information like passwords, credit card numbers, or Social Security numbers.",
    warningSigns: [
      "Sender domain doesn't match the claimed organization",
      "Urgent language demanding immediate action",
      "Links that don't match the visible URL",
      "Generic greetings like 'Dear Customer'",
      "Requests for passwords, PINs, or personal data",
      "Spelling and grammar errors"
    ],
    howToProtect: [
      "Never click links in unsolicited emails — navigate directly to websites",
      "Verify sender domains carefully (paypa1.com ≠ paypal.com)",
      "Enable two-factor authentication on all accounts",
      "Report suspicious emails to your email provider",
      "When in doubt, call the company using a number from their official website"
    ]
  },
  {
    id: "job-scams",
    title: "Job Scams",
    icon: "briefcase",
    color: "#F97316",
    description: "Fake job offers that request upfront payments or steal personal information under the guise of employment.",
    whatItIs: "Job scams exploit people seeking employment by posing as legitimate employers. They often promise high pay for easy remote work, then request personal information for 'background checks' or demand upfront payments for training, equipment, or registration fees.",
    warningSigns: [
      "Unsolicited job offers you didn't apply for",
      "Requests for upfront payment (training, registration, equipment)",
      "Unusually high pay for minimal work",
      "Vague job descriptions",
      "Requests for personal documents early in hiring",
      "Gmail or Yahoo sender addresses claiming to be HR"
    ],
    howToProtect: [
      "Research the company independently before engaging",
      "Never pay upfront for a job — legitimate employers don't require this",
      "Verify job postings on the company's official website",
      "Be wary of interviews conducted only via text or chat",
      "Report job scams to the FTC at ReportFraud.ftc.gov"
    ]
  },
  {
    id: "payment-scams",
    title: "Payment Scams",
    icon: "credit-card",
    color: "#EAB308",
    description: "Fraudulent payment requests or fake transaction alerts designed to steal money or financial credentials.",
    whatItIs: "Payment scams trick victims into sending money or revealing financial credentials through fake invoices, fraudulent transaction alerts, overpayment schemes, or impersonation of payment platforms like PayPal, Venmo, or banks.",
    warningSigns: [
      "Unexpected payment confirmations for purchases you didn't make",
      "Requests for wire transfers or gift card payments",
      "Overpayment followed by a request to refund the difference",
      "Fake customer service numbers in transaction alert emails",
      "Misspelled payment platform domains"
    ],
    howToProtect: [
      "Log in to your payment accounts directly rather than via email links",
      "Never send gift cards or wire transfers to 'verify' your account",
      "Verify transaction alerts by checking your account directly",
      "Contact payment platforms using their official website's support page"
    ]
  },
  {
    id: "impersonation",
    title: "Impersonation",
    icon: "user-x",
    color: "#8B5CF6",
    description: "Emails pretending to be trusted individuals or organizations to manipulate behavior.",
    whatItIs: "Impersonation attacks involve criminals posing as trusted entities — your bank, Google, Amazon, your boss, or even friends — to manipulate you into taking actions you otherwise wouldn't. This includes Business Email Compromise (BEC) where attackers impersonate executives.",
    warningSigns: [
      "Sender name matches a trusted contact but email domain is different",
      "Requests from 'executives' to transfer money urgently",
      "Slight misspellings in sender domains",
      "Requests to keep communication confidential",
      "Unusual tone or phrasing from someone you know"
    ],
    howToProtect: [
      "Always verify unusual requests through a separate communication channel",
      "Check the actual sender email address, not just the display name",
      "Establish verification protocols for financial transfers",
      "Be skeptical of any request for secrecy or urgency"
    ]
  },
  {
    id: "suspicious-links",
    title: "Suspicious Links",
    icon: "link",
    color: "#6EAB8A",
    description: "Malicious URLs designed to steal information, install malware, or redirect to fake websites.",
    whatItIs: "Malicious links can lead to phishing websites that mimic legitimate sites, drive-by malware downloads that infect your device automatically, or tracking pages that harvest your information. They often use URL shorteners or look-alike domains to disguise their true destination.",
    warningSigns: [
      "URLs with misspelled brand names (amaz0n.com, g00gle.com)",
      "Shortened URLs (bit.ly, tinyurl) hiding the destination",
      "HTTP instead of HTTPS on pages asking for credentials",
      "URLs with random strings of characters",
      "Domain extensions you don't recognize (.xyz, .info, .tk)"
    ],
    howToProtect: [
      "Hover over links to preview the destination URL before clicking",
      "Use a URL scanner like VirusTotal.com to check suspicious links",
      "Never click links from emails — navigate directly to websites",
      "Keep your browser and antivirus software updated"
    ]
  },
  {
    id: "account-takeover",
    title: "Account Takeover",
    icon: "lock",
    color: "#EC4899",
    description: "Attempts to gain unauthorized access to your accounts through credential theft or social engineering.",
    whatItIs: "Account takeover (ATO) attacks aim to gain control of your accounts by stealing login credentials, bypassing security measures, or tricking you into providing access. Once compromised, attackers can steal data, make fraudulent transactions, or use your identity for further attacks.",
    warningSigns: [
      "Fake security alerts urging immediate account verification",
      "Emails claiming a sign-in attempt from an unusual location",
      "Requests for OTPs or verification codes",
      "Fake 'Your account has been compromised' messages",
      "Prompts to 'confirm your password' via email links"
    ],
    howToProtect: [
      "Enable two-factor authentication on all important accounts",
      "Use a password manager and unique passwords for each account",
      "Never share OTPs or verification codes — even with 'bank support'",
      "Check your account's login history regularly",
      "Use passkeys where available — they're phishing-resistant"
    ]
  }
];

export const aiSuggestions = [
  "Why is this email suspicious?",
  "Is this a scam?",
  "What should I do?",
  "Which part is most suspicious?",
  "How do I report this?",
  "Is the sender domain real?"
];

export const aiResponses = {
  "Why is this email suspicious?": "This email exhibits multiple phishing indicators: the sender domain doesn't match the claimed organization, urgent language is used to pressure immediate action, and the embedded link leads to a credential-harvesting site. Each of these alone would warrant caution — together they indicate a high-confidence phishing attempt.",
  "Is this a scam?": "Based on the analysis, this email has a high probability of being fraudulent. The risk score of 91/100 places it in the Critical category. The combination of domain spoofing, urgency tactics, and a malicious link strongly suggests this is a phishing scam. I recommend not clicking any links and deleting the email.",
  "What should I do?": "Here's what you should do:\n\n1. Do not click any links or attachments in this email\n2. Do not reply to the sender\n3. If it claims to be from a company you use, contact that company directly through their official website\n4. Mark the email as phishing/spam in Gmail\n5. If you already clicked a link, change your passwords immediately and enable two-factor authentication",
  "Which part is most suspicious?": "The most suspicious element is the sender domain. The email claims to be from a major organization but originates from an unrelated domain. This mismatched domain is the clearest indicator of impersonation. The 'Verify Account Now' button is also highly suspicious — legitimate organizations do not embed direct login links in security alert emails.",
  "How do I report this?": "You can report this email in several ways:\n\n1. In Gmail, click the three-dot menu → 'Report phishing'\n2. Forward phishing emails to reportphishing@apwg.org\n3. Report to the FTC at ReportFraud.ftc.gov\n4. If it impersonates a specific company, report it to that company's abuse/security team",
  "Is the sender domain real?": "No, the sender domain 'unknown-domain.com' is not associated with any legitimate organization. When I cross-reference it against known brand domains, there is no match. The domain was likely registered specifically for phishing campaigns. Legitimate organizations always send from their verified domain (e.g., @chase.com, @apple.com, @google.com).",
  "default": "Based on the analysis, this email shows significant risk indicators consistent with phishing and social engineering. The AI model has analyzed the sender reputation, content patterns, link destinations, and behavioral signals. I recommend treating this email with extreme caution and not engaging with any links, buttons, or requests it contains."
};
