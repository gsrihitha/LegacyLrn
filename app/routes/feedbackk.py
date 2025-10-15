from fastapi import APIRouter, Depends
from services.feedback import log_match_feedback
from app.core.auth import verify_token

router = APIRouter()

@router.post("/")
def give_feedback(
    student_email: str,
    mentor_email: str,
    query: str,
    rating: int,
    comment: str = "",
    token: dict = verify_token
):
    return log_match_feedback(student_email, mentor_email, query, rating, comment)
