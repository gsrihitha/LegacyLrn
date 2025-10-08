# LegacyLearn
## About the app:
LegacyLearn is a mentorship platform that connects retired professionals with students seeking to learn new skills. Retirees can share their experience, earn income, and stay socially active, while students benefit from personalized, one-on-one guidance that goes beyond self-learning through videos or courses.

The system provides secure profile verification, AI-driven mentor recommendations, and a safe booking flow. Students can request a session after reviewing a mentor’s skills and hourly rate; mentors can review the student’s profile before accepting. Once confirmed, the class can take place online (via recorded video calls) or in-person (with safeguards such as verified profiles and optional session recordings).

## Key features include:

1. Verified onboarding for both students and mentors.

2. AI-powered skill matching using vector similarity + LLM explanations.

3. Secure online payments through Stripe (test mode in MVP).

4. Recorded sessions for accountability (online via Jitsi, offline via uploaded recordings).

5. Mutual acceptance workflow — bookings happen only if both sides agree.


## Architecture:
User ─▶ FastAPI backend (auth + matchmaking API)
          ├── Supabase/PostgreSQL → user & skill data
          ├── Chroma / FAISS → semantic vector store
          ├── LangChain + LLM → skill-based recommendations (Day 3)
          ├── W&B / Triton (later) → model tracking + inference
Frontend ─▶ Streamlit / React (optional)

## Repo-structure (current):
legacylearn/
│
├── app/
│   ├── main.py                  # FastAPI entry
│   ├── core/
│   │   ├── config.py            # Load env vars
│   │   └── db.py                # DB connection (Supabase/Postgres)
│   ├── models/
│   │   ├── user.py              # Pydantic models / ORM schemas
│   │   └── skill.py
│   ├── routes/
│   │   ├── users.py             # Registration/login APIs
│   │   ├── mentors.py
│   │   └── students.py
│   ├── utils/
│   │   └── seed_data.py         # Dummy profiles
│   └── __init__.py
│
├── tests/
│   └── test_basic.py
│
├── .env                         # Local secrets
├── .env.example
├── requirements.txt
├── README.md
└── .gitignore


