# LegacyLearn

## About the app
LegacyLearn is a mentorship platform that connects retired professionals with students seeking to learn new skills. It supports mentor discovery, AI-assisted matching, and feedback so learners can find the right guide quickly.

## Features
- Student and mentor onboarding with profile data (FastAPI + Supabase/PostgreSQL)
- Lightweight RAG pipeline for AI-driven mentor matching (LangChain + Chroma + sentence-transformers + OpenAI)
- Student dashboard to search and review recommended mentors (React + Vite + Tailwind)
- Mentor dashboard to refresh profile embeddings (FastAPI endpoint + Chroma persistence)
- Feedback submission on match results (FastAPI + Supabase/PostgreSQL)
- JWT-based access tokens for login sessions (FastAPI + PyJWT)

## Current Scope
This project was built to learn how RAG works in a real product flow and to understand how vector search plus LLM summaries can improve matching.

## Tech stack
- Backend: FastAPI, Pydantic, Uvicorn
- Data: Supabase/PostgreSQL
- AI matching: lightweight RAG using LangChain, Chroma vector store, Hugging Face sentence-transformer embeddings, OpenAI (optional)
- Auth: JWT tokens with PyJWT
- Frontend: React, Vite, Tailwind CSS, Axios

## Installation and usage
### Backend
1) Create and activate a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```
2) Install dependencies:
```bash
pip install -r requirements.txt
```
3) Configure environment:
```bash
cp .env.example .env
```
Fill in `SUPABASE_URL`, `SUPABASE_KEY`, and `OPENAI_API_KEY` in `.env`.

4) Run the API:
```bash
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Usage notes
- The frontend currently auto-seeds a dev user to bypass login. Update `frontend/src/context/AuthContext.jsx` if you want real auth.
- If you add or update mentors, call `POST /api/match/refresh` once to rebuild embeddings.
- Matching endpoint: `GET /api/match?query=your+learning+goal`

## Future prospect
- Real auth with role-based access control
- Payments and scheduling workflows
- Mentor availability and calendar sync
- Advanced RAG: reranking, citations, and grounded explanations
- Analytics dashboard for mentor performance and student outcomes
