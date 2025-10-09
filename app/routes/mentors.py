from fastapi import APIRouter, HTTPException
from app.models.mentor import MentorCreate
from app.core.db import supabase

router = APIRouter()

@router.post("/register")
def register_mentor(mentor: MentorCreate):
    res= supabase.table("mentors").insert(mentor.model_dump()).execute()
    if res.data:
        return{"message": "Mentor registered!", "mentor": res.data[0]}
    raise HTTPException(status_code=400, detail="Insert failed")

@router.get("/")
def list_mentors():
    res = supabase.table("mentors").select("*").execute()
    return {"mentors": res.data}

@router.get("/{email}")
def get_mentor(email: str):
    for m in mentors_db:
        if m["email"] == email:
            return m
    raise HTTPException(status_code=404, detail="Mentor not found")
