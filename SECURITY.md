# 🔐 Security Policy

## Overview

Wardn is an AI-assisted email security prototype designed to help identify potential phishing, scams, suspicious links, impersonation, and social-engineering threats.

This project is intended for educational, research, and demonstration purposes.

## Supported Security Concerns

Security-related issues may include:

* Authentication or authorization vulnerabilities
* Exposure of sensitive information
* Insecure handling of email data
* Improper access controls
* Vulnerabilities that could expose OAuth credentials or tokens
* Security issues in the email analysis pipeline

## Reporting a Vulnerability

If you discover a security vulnerability in Wardn, please avoid publicly disclosing the issue before it can be reviewed.

Provide the following information when reporting an issue:

* A clear description of the vulnerability
* Steps required to reproduce it
* The potential security impact
* Any relevant screenshots, logs, or proof-of-concept information

Please do not include real passwords, OAuth tokens, API keys, private email content, or other sensitive information in a report.

## Protecting Secrets

Never commit sensitive credentials or authentication files to GitHub.

The following files must remain local and should be excluded through `.gitignore`:

```text
backend/credentials.json
backend/token.json
backend/*.db
.env
```

API keys, passwords, OAuth tokens, and other secrets should never be hardcoded into source code.

## Gmail Data Privacy

Wardn uses Gmail read-only access for email security analysis.

The application is designed not to:

* Send emails
* Delete emails
* Modify emails
* Reply to emails

Users should avoid using real sensitive or confidential email data when testing development versions of the project.

## Security Disclaimer

Wardn is a prototype and does not guarantee that an email is safe or malicious.

Security classifications and risk scores should be treated as indicators rather than definitive security judgments.

Always exercise caution when interacting with suspicious emails, links, attachments, or requests for sensitive information.

---

**Built with a focus on responsible cybersecurity development.**
