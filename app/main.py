from fastapi import FastAPI
from app.routes import students, mentors
from app.core.config import settings

app = FastAPI(
    title="LegacyLearn",
    description="AI-Driven Mentorship Platform connecting retirees & students",
    version="0.2.0",
)

app.include_router(students.router, prefix="/api/students", tags=["Students"])
app.include_router(mentors.router, prefix="/api/mentors", tags=["Mentors"])

@app.get("/ping")
def ping():
    return {"message": "pong", "debug": settings.DEBUG}
