# Wardn Gmail OAuth — 10 minute setup

1. In Google Cloud Console, create/select a project.
2. Enable the Gmail API.
3. Open Google Auth Platform / Branding and configure the consent screen.
4. If using a personal Gmail account, use External audience and add your Gmail account as a test user.
5. Create an OAuth client: Application type = Desktop app.
6. Download the JSON credential and save it as `backend/credentials.json`.
7. Never commit or share `credentials.json` or `backend/token.json`.
8. From `backend/`, install requirements:
   `python -m pip install -r requirements.txt`
9. Start FastAPI:
   `python -m uvicorn main:app --host 127.0.0.1 --port 8000`
10. Start Vite in another terminal:
   `npm run dev`
11. Open Wardn and click Connect Gmail.
12. Google authorization opens in the browser. Grant the read-only Gmail permission.
13. Wardn imports up to 15 recent Inbox messages and runs the local analyzer on each.
