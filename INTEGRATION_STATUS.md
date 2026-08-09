# ScamShield integration status

## Connected to FastAPI
- `GET /api/health`
- `GET /api/stats`
- `GET /api/emails`
- `GET /api/emails/{id}`
- `GET /api/threats`
- `POST /api/assistant`
- `POST /api/analyze` helper is available in the frontend API module

## Frontend pages using live backend data
- Overview / Dashboard
- Inbox
- Threat Center
- Security Analysis
- Reports
- AI Assistant drawer

## Still prototype-only
- Gmail OAuth / real Gmail inbox synchronization
- Settings sync button
- Actual Gmail disconnect
- Historical weekly report data

The current local database is intentionally included so the seeded demo data works immediately.
