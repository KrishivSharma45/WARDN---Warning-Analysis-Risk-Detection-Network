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
  <a href="#-roadmap">Roadmap</a>
</p>

---

## 🧭 Overview

ScamShield AI is a cybersecurity platform that adds a security layer to your Gmail inbox.

It connects to Gmail using read-only OAuth access, imports incoming emails, and analyzes them for phishing, scams, suspicious links, social engineering, financial requests, credential harvesting, and other threat signals.

Instead of simply marking an email as suspicious, ScamShield provides a detailed security investigation explaining **why an email may be dangerous**.

---

## ✨ Features

### 📧 Gmail Integration

- Google OAuth 2.0 authentication
- Read-only Gmail access
- Real inbox synchronization
- Manual Gmail sync
- Automatic email importing
- Sender and email metadata extraction

### 🔍 Threat Detection

ScamShield analyzes emails for:

- Phishing indicators
- Scam patterns
- Suspicious links
- Social-engineering signals
- Account takeover attempts
- Credential harvesting
- Financial/payment requests
- Suspicious sender domains
- Artificial urgency
- Suspicious billing activity

### 🎯 Risk Scoring

Every analyzed email receives a security score from:

**0 → 100**

Emails are categorized into:

- 🟢 Safe
- 🟡 Suspicious
- 🟠 High Risk
- 🔴 Critical Risk

### 🧠 Security Intelligence

Each analyzed email provides:

- Risk score
- Severity
- Threat category
- Confidence level
- Security explanation
- Detected threat indicators
- Recommended action

### 📊 Security Dashboard

The dashboard provides a complete overview of inbox security:

- Protection score
- Emails scanned
- Suspicious emails
- Threats detected
- Guard status
- Overall security health

### 📬 Email Investigation

Users can open individual emails and inspect:

- Sender information
- Email subject
- Email content
- Security investigation report
- Risk score
- Threat category
- Detected threat indicators
- Security intelligence explanation

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
              ┌──────────┼──────────┐
              ▼          ▼          ▼
         Risk Scoring  Threat    Security
                      Detection  Explanation
              │          │          │
              └──────────┼──────────┘
                         ▼
                 ScamShield Dashboard
                         │
                         ▼
                 Email Investigation
```

---

## 🖥️ Application Flow

```text
Connect Gmail
      ↓
Google Authorization
      ↓
Inbox Synchronization
      ↓
Email Analysis
      ↓
Threat Detection
      ↓
Risk Classification
      ↓
Security Dashboard
      ↓
Detailed Email Investigation
```

---

## 💻 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Build Tool | Vite |
| Styling | CSS |
| Backend | Python |
| API Framework | FastAPI |
| Database | SQLite |
| ORM | SQLAlchemy |
| Authentication | Google OAuth 2.0 |
| Email API | Gmail API |
| Server | Uvicorn |
| Version Control | Git + GitHub |

---

## 📁 Project Structure

```text
ScamShield/
│
├── backend/
│   ├── analyzer.py
│   ├── database.py
│   ├── gmail_service.py
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── seed.py
│   ├── requirements.txt
│   └── credentials.example.json
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── api/
│   │   └── scamShieldApi.js
│   │
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   │
│   ├── pages/
│   │   ├── ConnectPage.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Inbox.jsx
│   │   └── ...
│   │
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── Gmail_SETUP.md
├── INTEGRATION_STATUS.md
├── README.md
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/KrishivSharma45/ScamShield-AI.git
cd ScamShield-AI
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Install backend dependencies

Open a terminal inside the `backend` folder:

```bash
cd backend
pip install -r requirements.txt
```

### 4. Configure Gmail OAuth

Create a Google OAuth Desktop application and download the credentials file.

Place it inside:

```text
backend/credentials.json
```

> ⚠️ Never upload `credentials.json` or `token.json` to GitHub.

### 5. Start the backend

From the `backend` directory:

```bash
py -m uvicorn main:app --host 127.0.0.1 --port 8000
```

The backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI documentation is available at:

```text
http://127.0.0.1:8000/docs
```

### 6. Start the frontend

Open another terminal in the project root:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5174
```

---

## 🔐 Gmail OAuth Flow

```text
User
 │
 ▼
ScamShield Connect Page
 │
 ▼
Google OAuth Authorization
 │
 ▼
Read-Only Gmail Permission
 │
 ▼
Gmail API
 │
 ▼
ScamShield Backend
 │
 ▼
Email Synchronization
 │
 ▼
Security Analysis
 │
 ▼
Dashboard
```

ScamShield only requests Gmail read-only access for email security analysis.

---

## 🛡️ Security & Privacy

ScamShield follows a **read-only security model**.

### ScamShield can:

- ✅ Read emails for security analysis
- ✅ Analyze sender information
- ✅ Analyze email content
- ✅ Detect suspicious activity
- ✅ Generate security reports

### ScamShield cannot:

- ❌ Send emails
- ❌ Delete emails
- ❌ Modify emails
- ❌ Reply to emails

Sensitive OAuth files are excluded from Git version control through `.gitignore`.

The following files should never be committed:

```text
backend/credentials.json
backend/token.json
backend/*.db
```

---

## 📊 Example Security Analysis

A suspicious email may produce an investigation such as:

```text
Risk Score: 70 / 100

Severity: HIGH RISK

Category:
Account Takeover

Threat Indicators:
• Upfront Payment / Financial Request
• Credential / Identity Harvesting Attempt
• Suspicious Link

Security Recommendation:
Avoid interacting with embedded links
or replying to the email.
```

The investigation view allows users to understand the detected threat instead of simply receiving a warning.

---

## 🎯 Project Goals

ScamShield AI was built to explore the combination of:

- Cybersecurity
- Email threat detection
- AI-assisted security analysis
- OAuth authentication
- API integration
- Risk scoring
- Security dashboards
- Threat intelligence

The main goal is to make complex email security signals easier for users to understand and act upon.

---

## 🔮 Roadmap

Future improvements planned for ScamShield include:

- 🤖 Machine-learning based phishing classification
- 🔗 Advanced URL reputation analysis
- 🌐 Domain intelligence
- 📸 Malicious webpage analysis
- 🧩 Browser extension
- ⚡ Real-time inbox monitoring
- 🔔 Real-time threat notifications
- 📈 Advanced security analytics
- 🧠 Improved threat classification
- 📊 Historical security trends

---

## ⚠️ Disclaimer

ScamShield AI is a cybersecurity prototype intended for educational, research, and demonstration purposes.

Security analysis should not be treated as a guarantee that an email is safe or malicious.

Always exercise caution when interacting with suspicious emails, links, attachments, or requests for sensitive information.

---

## 👨‍💻 Author

**Krishiv Sharma**

B.Tech CSE — Cybersecurity

---

<p align="center">
  Built with a focus on
  <b>Cybersecurity • AI • Email Security • Threat Detection</b>
</p>

<p align="center">
  ⭐ If you found ScamShield AI interesting, consider starring the repository.
</p>