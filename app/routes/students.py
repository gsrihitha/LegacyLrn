from fastapi import APIRouter, HTTPException
from app.models.student import StudentCreate
from app.core.db import supabase
from app.core.auth import hash_password, create_access_token, verify_password


router = APIRouter()


@router.post("/register")
def register_student(student: StudentCreate):
    data = student.model_dump()
    data["password"] = hash_password(data.pop("password"))
    res = supabase.table("students").insert(data).execute()
    return {"message": "Student registered"}

@router.post("/login")
def login_student(email: str, password: str):
    res = supabase.table("students").select("*").eq("email", email).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="User not found")
    user = res.data[0]
    if not verify_password(password, user["password"]):
        raise HTTPException(status_code=400, detail="Wrong password")
    token = create_access_token({"sub": user["email"], "role": "student"})
    return {"access_token": token, "token_type": "bearer"}



# @router.post("/register")
# def register_student(student: StudentCreate):
#     res = supabase.table("students").insert(student.model_dump()).execute()
#     if res.data:
#         return {"message": "Student registered", "student": res.data[0]}
#     raise HTTPException(status_code=400, detail="Insert failed")

# @router.get("/")
# def list_students():
#     res = supabase.table("students").select("*").execute()
#     return{"students": res.data}

# @router.get("/{email}")
# def get_student(email: str):
#     for s in students_db:
#         if s["email"] == email:
#             return s
#     raise HTTPException(status_code=404, detail="Student not found")
