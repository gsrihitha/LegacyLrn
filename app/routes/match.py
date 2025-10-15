from fastapi import APIRouter, Query
from services.recommender import refresh_mentor_embeddings, recommend_mentors

router = APIRouter()

@router.post("/refresh")
def refresh_embeddings():
    count = refresh_mentor_embeddings()
    return {"message": f"Refreshed {count} mentor embeddings."}

@router.get("/")
def match_mentors(query: str = Query(..., description="Describe what you want to learn")):
    results = recommend_mentors(query)
    return results
