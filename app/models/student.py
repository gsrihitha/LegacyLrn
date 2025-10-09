from pydantic import BaseModel
from typing import Optional

class StudentCreate(BaseModel):
    name: str
    email: str
    goal: str
    preferred_skill: Optional[str] = None
    location: Optional[str] = None
