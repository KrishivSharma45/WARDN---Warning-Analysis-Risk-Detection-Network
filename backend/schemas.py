from pydantic import BaseModel
from typing import List, Optional

class ThreatSchema(BaseModel):
    id: Optional[int] = None
    type: str
    description: str

    class Config:
        from_attributes = True

class AnalysisSchema(BaseModel):
    id: Optional[int] = None
    email_id: Optional[int] = None
    risk_score: int
    severity: str
    category: str
    confidence: int = 95
    explanation: str
    threats: List[ThreatSchema] = []

    class Config:
        from_attributes = True

class EmailSchema(BaseModel):
    id: int
    sender: str
    sender_name: str
    subject: str
    preview: Optional[str] = None
    body: str
    received_at: str
    is_read: bool = False
    analysis: Optional[AnalysisSchema] = None

    class Config:
        from_attributes = True

class AnalyzeRequestSchema(BaseModel):
    sender: str
    sender_name: Optional[str] = ""
    subject: str
    body: str

class AssistantRequestSchema(BaseModel):
    question: str
    email_id: Optional[int] = None

class AssistantResponseSchema(BaseModel):
    question: str
    answer: str

class StatsSchema(BaseModel):
    protection_score: int
    emails_scanned: int
    suspicious_count: int
    threats_detected: int
    average_risk_score: int = 0
    category_breakdown: List[dict]
