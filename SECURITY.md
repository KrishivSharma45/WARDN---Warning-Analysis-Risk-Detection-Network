# Security Policy

## About WARDN

WARDN (Warning, Analysis & Risk Detection Network) is an email security platform designed to help identify potentially suspicious, phishing, scam, and social-engineering emails.

WARDN analyzes signals such as:

- Suspicious sender domains
- Embedded URLs
- Artificial urgency
- Payment requests
- Credential-harvesting attempts
- Suspicious job or internship offers

The platform provides a risk score, severity level, threat category, and plain-language explanation to help users make safer decisions.

## Responsible Disclosure

If you discover a security vulnerability in WARDN, please report it responsibly rather than publicly disclosing the issue before it can be investigated.

When reporting a vulnerability, provide:

- A clear description of the issue
- Steps to reproduce it
- The potential security impact
- Any relevant screenshots or logs that do not contain sensitive information

## Security & Privacy

WARDN is designed with security and privacy in mind.

- Gmail integration uses Google's OAuth authorization flow.
- Gmail access is requested using read-only permissions.
- OAuth credentials and tokens should never be committed to the repository.
- Do not include passwords, API keys, access tokens, or other secrets in issues, pull requests, screenshots, or commits.
- Local credential files should remain excluded through `.gitignore`.

## Disclaimer

WARDN is a security analysis aid and **does not guarantee that an email is safe or malicious**.

Risk scores and classifications are based on detected signals and should be used together with user judgment and appropriate security practices.

---

**Built with a focus on responsible cybersecurity development.**