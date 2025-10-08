from fastapi import FastAPI
from app.routes import users
from app.core.config import settings

app = FastAPI(
    title="LegacyLearn",
    description="AI-Driven Mentorship Platform connecting retirees & students",
    version="0.1.0",
)

app.include_router(users.router, prefix="/api/users", tags=["Users"])

@app.get("/ping")
def ping():
    return {"message": "pong", "debug": settings.DEBUG}
