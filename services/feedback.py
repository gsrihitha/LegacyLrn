import wandb
from datetime import datetime, timezone

def log_match_feedback(student_email, mentor_email, query, rating, comment=None):
    wandb.init(project="gvs190101-arizona-state-university", reinit = True)
    wandb.log({
        "student": student_email,
        "mentor": mentor_email,
        "query": query,
        "rating": rating,
        "comment": comment or "",
        "timestamp": datetime.now(timezone.utc).isoformat()
    })
    wandb.finish()
    return {"status": "logged", "rating": rating}