from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class User(BaseModel):
    name: str
    email: str
    role: str  # 'student' or 'mentor'

fake_db = []

@router.post("/register")
def register_user(user: User):
    fake_db.append(user.model_dump())
    return {"message": "User registered", "user": user}
