from fastapi import APIRouter, HTTPException
from app.models.mentor import MentorCreate
from app.core.db import supabase
from app.core.auth import hash_password, create_access_token, verify_password

router = APIRouter()

@router.post("/register")
def register_mentor(mentor: MentorCreate):
    data = mentor.model_dump()
    data["password"] = hash_password(data.pop("password"))
    res = supabase.table("mentors").insert(data).execute()
    return{"message": "Mentor registration"}

@router.post("/login")
def login_menor(email: str, password: str):
    res = supabase.table("mentors").select("*").eq("email", email).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="User not found")
    user = res.data
    if not verify_password(password, user["password"]):
        raise HTTPException(status_code=400, detail="Wrong password")
    token = create_access_token({"sub":user["email"], "role": "mentor"})
    return {"access_token": token, "token_type": "bearer"}

# @router.post("/register")
# def register_mentor(mentor: MentorCreate):
#     res= supabase.table("mentors").insert(mentor.model_dump()).execute()
#     if res.data:
#         return{"message": "Mentor registered!", "mentor": res.data[0]}
#     raise HTTPException(status_code=400, detail="Insert failed")

# @router.get("/")
# def list_mentors():
#     res = supabase.table("mentors").select("*").execute()
#     return {"mentors": res.data}

# @router.get("/{email}")
# def get_mentor(email: str):
#     for m in mentors_db:
#         if m["email"] == email:
#             return m
#     raise HTTPException(status_code=404, detail="Mentor not found")
