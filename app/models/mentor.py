from pydantic import BaseModel
from typing import Optional

class MentorCreate(BaseModel):
    name: str
    email: str
    skill: str
    years_experience: int
    hourly_rate: Optional[float] = None
    mode: Optional[str] = "online"  # online / in_person
    location: Optional[str] = None
