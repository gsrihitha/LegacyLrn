from fastapi import APIRouter, HTTPException
from app.models.student import StudentCreate
from app.core.db import supabase

router = APIRouter()

@router.post("/register")
def register_student(student: StudentCreate):
    res = supabase.table("students").insert(student.model_dump()).execute()
    if res.data:
        return {"message": "Student registered", "student": res.data[0]}
    raise HTTPException(status_code=400, detail="Insert failed")

@router.get("/")
def list_students():
    res = supabase.table("students").select("*").execute()
    return{"students": res.data}

@router.get("/{email}")
def get_student(email: str):
    for s in students_db:
        if s["email"] == email:
            return s
    raise HTTPException(status_code=404, detail="Student not found")
