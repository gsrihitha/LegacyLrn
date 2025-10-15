"""
Database connection layer for LegacyLearn.
Handles Supabase (PostgreSQL) and optional direct SQLAlchemy access.
"""

from supabase import create_client, Client
from sqlalchemy import create_engine
from app.core.config import settings
import os

# --- Supabase client setup ---
def get_supabase() -> Client:
    """Return a Supabase client using URL and KEY from .env."""
    url = settings.SUPABASE_URL
    key = settings.SUPABASE_KEY
    if not url or not key:
        raise ValueError("Supabase URL or Key not provided in environment variables.")
    return create_client(url, key)

# Create global instance for use throughout app
supabase = get_supabase()

# --- Optional: SQLAlchemy engine (if you ever query DB directly) ---
DATABASE_URL = os.getenv("DATABASE_URL")
engine = None
if DATABASE_URL:
    try:
        engine = create_engine(DATABASE_URL)
    except Exception as e:
        print(f"[Warning] Could not create SQLAlchemy engine: {e}")

# --- Utility health check ---
def test_connection():
    """Quick sanity check to confirm Supabase connectivity."""
    try:
        supabase.table("mentors").select("*").limit(1).execute()
        return True
    except Exception as e:
        print(f"[DB] Supabase connection test failed: {e}")
        return False

