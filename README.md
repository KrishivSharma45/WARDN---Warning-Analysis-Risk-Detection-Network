# 🛡️ ScamShield AI

### AI-Powered Email Security & Phishing Detection Platform

<p align="center">
  ScamShield AI connects to Gmail and analyzes incoming emails for phishing,
  scams, suspicious links, and social-engineering threats.
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-how-it-works">How It Works</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-security--privacy">Security</a> •
  <a href="#-future-improvements">Roadmap</a>
</p>

---

## 🧭 Overview

ScamShield AI is a cybersecurity platform that adds a security layer to your Gmail inbox.

It uses Gmail's read-only OAuth integration to import emails and analyze them for phishing, scams, suspicious links, social engineering, and other threat signals.

---

## ✨ Features

### 📧 Gmail Integration
- Google OAuth 2.0
- Read-only Gmail access
- Real inbox synchronization
- Manual Gmail sync

### 🔍 Threat Detection
- Phishing detection
- Scam detection
- Suspicious link identification
- Social-engineering indicators
- Account takeover signals
- Financial request detection

### 🎯 Risk Scoring
Every email receives a **0–100 security risk score** and is classified as:

- 🟢 Safe
- 🟡 Suspicious
- 🟠 High Risk
- 🔴 Critical

### 🧠 Security Analysis
Each email provides:
- Risk score
- Severity
- Threat category
- Confidence
- Threat indicators
- Security explanation

### 📊 Security Dashboard
- Protection score
- Emails scanned
- Suspicious emails
- Threats detected
- Recent threats
- Overall inbox security

### 📬 Email Investigation
Open an email to inspect:
- Sender information
- Email content
- Risk assessment
- Detected threats
- Security intelligence
- Embedded email preview

---

## ⚙️ How It Works

```text
Gmail Inbox
     │
     ▼
Google OAuth 2.0
     │
     ▼
Gmail API
     │
     ▼
Email Sync Engine
     │
     ▼
Security Analyzer
     │
     ├── Risk Scoring
     ├── Threat Detection
     └── Security Explanation
             │
             ▼
      ScamShield Dashboard