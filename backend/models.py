import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Email(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True, index=True)
    sender = Column(String, nullable=False)
    sender_name = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    preview = Column(String, nullable=True)
    body = Column(Text, nullable=False)
    received_at = Column(String, nullable=False)
    is_read = Column(Boolean, default=False)

    analysis = relationship("Analysis", back_populates="email", uselist=False, cascade="all, delete-orphan")

class Analysis(Base):
    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    email_id = Column(Integer, ForeignKey("emails.id"), nullable=False, unique=True)
    risk_score = Column(Integer, nullable=False)
    severity = Column(String, nullable=False) # safe, suspicious, high, critical
    category = Column(String, nullable=False) # Phishing, Job Scam, Payment Scam, etc.
    confidence = Column(Integer, default=95)
    explanation = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    email = relationship("Email", back_populates="analysis")
    threats = relationship("Threat", back_populates="analysis", cascade="all, delete-orphan")

class Threat(Base):
    __tablename__ = "threats"

    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analyses.id"), nullable=False)
    type = Column(String, nullable=False) # Red flag title
    description = Column(Text, nullable=False)

    analysis = relationship("Analysis", back_populates="threats")
