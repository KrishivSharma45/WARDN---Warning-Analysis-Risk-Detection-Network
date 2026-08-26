from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional

from database import engine, Base, get_db
import models
import schemas
from analyzer import analyze_email_content
import gmail_service

# Initialize Database tables if not already created
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Wardn Security API", version="1.0.0")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── 1. GET /api/health ────────────────────────────────────────────────
@app.get("/api/health")
def get_health():
    return {"status": "ok", "service": "Wardn Security Engine", "version": "1.0.0"}

# ── 2. POST /api/analyze ─────────────────────────────────────────────
@app.post("/api/analyze", response_model=schemas.AnalysisSchema)
def analyze_email(req: schemas.AnalyzeRequestSchema, db: Session = Depends(get_db)):
    result = analyze_email_content(
        sender=req.sender,
        sender_name=req.sender_name or "",
        subject=req.subject,
        body=req.body
    )
    
    # Save email entry
    email_obj = models.Email(
        sender=req.sender,
        sender_name=req.sender_name or req.sender.split("@")[0],
        subject=req.subject,
        preview=req.body[:120],
        body=req.body,
        received_at="Just now",
        is_read=False
    )
    db.add(email_obj)
    db.commit()
    db.refresh(email_obj)

    # Save analysis
    analysis_obj = models.Analysis(
        email_id=email_obj.id,
        risk_score=result["risk_score"],
        severity=result["severity"],
        category=result["category"],
        confidence=result["confidence"],
        explanation=result["explanation"]
    )
    db.add(analysis_obj)
    db.commit()
    db.refresh(analysis_obj)

    for threat in result["threats"]:
        t_obj = models.Threat(
            analysis_id=analysis_obj.id,
            type=threat["type"],
            description=threat["description"]
        )
        db.add(t_obj)
    db.commit()

    return analysis_obj

# ── 3. GET /api/emails ───────────────────────────────────────────────
@app.get("/api/emails", response_model=List[schemas.EmailSchema])
def get_emails(
    severity: Optional[str] = None, 
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Email)
    
    if severity and severity.lower() != "all":
        query = query.join(models.Analysis).filter(models.Analysis.severity == severity.lower())
        
    emails = query.all()
    
    if search:
        s = search.lower()
        emails = [
            e for e in emails 
            if s in e.subject.lower() or s in e.sender.lower() or s in (e.sender_name or "").lower() or s in e.body.lower()
        ]
        
    return emails

# ── 4. GET /api/emails/{id} ──────────────────────────────────────────
@app.get("/api/emails/{id}", response_model=schemas.EmailSchema)
def get_email_by_id(id: int, db: Session = Depends(get_db)):
    email_obj = db.query(models.Email).filter(models.Email.id == id).first()
    if not email_obj:
        raise HTTPException(status_code=404, detail="Email not found")
    return email_obj

# ── 5. GET /api/threats ──────────────────────────────────────────────
@app.get("/api/threats")
def get_threats(db: Session = Depends(get_db)):
    threat_emails = (
        db.query(models.Email)
        .join(models.Analysis)
        .filter(models.Analysis.severity != "safe")
        .all()
    )
    
    threat_items = []
    for e in threat_emails:
        if e.analysis:
            threat_items.append({
                "id": e.id,
                "sender": e.sender_name or e.sender,
                "email": e.sender,
                "subject": e.subject,
                "category": e.analysis.category,
                "risk_score": e.analysis.risk_score,
                "severity": e.analysis.severity,
                "time": e.received_at,
                "flags_count": len(e.analysis.threats)
            })
            
    return threat_items

# ── 6. GET /api/stats ────────────────────────────────────────────────
@app.get("/api/stats", response_model=schemas.StatsSchema)
def get_stats(db: Session = Depends(get_db)):
    total_emails = db.query(models.Email).count()
    suspicious_count = db.query(models.Analysis).filter(models.Analysis.severity == "suspicious").count()
    high_critical_count = db.query(models.Analysis).filter(models.Analysis.severity.in_(["high", "critical"])).count()
    
    average_risk = db.query(models.Analysis).with_entities(
        __import__("sqlalchemy").func.avg(models.Analysis.risk_score)
    ).scalar()

    # Calculate category breakdown
    categories = ["Phishing", "Job Scam", "Payment Scam", "Impersonation", "Account Takeover"]
    breakdown = []
    colors = {"Phishing": "#DC2626", "Job Scam": "#EA580C", "Payment Scam": "#D97706", "Impersonation": "#8B5CF6", "Account Takeover": "#EC4899"}
    
    for cat in categories:
        cnt = db.query(models.Analysis).filter(models.Analysis.category == cat).count()
        if cnt > 0:
            breakdown.append({
                "name": cat,
                "value": cnt,
                "color": colors.get(cat, "#3D7A5C")
            })
            
    return {
        "protection_score": 94,
        "emails_scanned": total_emails + 1276, # Simulated lifetime count
        "suspicious_count": suspicious_count,
        "threats_detected": high_critical_count,
        "average_risk_score": round(average_risk or 0),
        "category_breakdown": breakdown
    }

# ── 7. POST /api/assistant ───────────────────────────────────────────
@app.post("/api/assistant", response_model=schemas.AssistantResponseSchema)
def ask_assistant(req: schemas.AssistantRequestSchema, db: Session = Depends(get_db)):
    q = req.question.strip()
    
    email_context = None
    if req.email_id:
        email_context = db.query(models.Email).filter(models.Email.id == req.email_id).first()

    # Context-aware responses
    if "suspicious" in q.lower() or "why" in q.lower():
        if email_context and email_context.analysis:
            ans = f"This email has a risk score of {email_context.analysis.risk_score}/100 ({email_context.analysis.severity.upper()}). Key indicators include: {', '.join([t.type for t in email_context.analysis.threats])}."
        else:
            ans = "Emails are flagged suspicious when their sender domain is unverified, artificial urgency is used, or links point to credential-harvesting sites."
    elif "scam" in q.lower() or "real" in q.lower():
        if email_context and email_context.analysis:
            ans = f"High probability of fraud ({email_context.analysis.category}). {email_context.analysis.explanation}"
        else:
            ans = "Based on our AI analysis engine, this email exhibits high-risk indicators. Treat with extreme caution."
    elif "do" in q.lower() or "action" in q.lower():
        ans = "Recommended actions:\n1. Do not click any links or buttons.\n2. Never enter passwords or personal data.\n3. Verify the sender independently via official channels."
    else:
        ans = "Wardn Guard continuously monitors email signals. Avoid interacting with unverified external links or upfront payment requests."

    return {
        "question": req.question,
        "answer": ans
    }


# ── Gmail integration ────────────────────────────────────────────────
@app.get("/api/gmail/status")
def gmail_status():
    return gmail_service.get_state()


@app.post("/api/gmail/connect")
def gmail_connect():
    state = gmail_service.start_connect()
    return state


@app.post("/api/gmail/sync")
def gmail_sync():
    return gmail_service.sync_now()


@app.post("/api/gmail/disconnect")
def gmail_disconnect():
    return gmail_service.disconnect()
