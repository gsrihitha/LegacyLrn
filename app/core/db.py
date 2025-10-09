#For using from supabase client:

from supabase import create_client
from app.core.config import settings

supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

# mentors_db = []
# students_db = []
# supabase.table("mentors").insert({...}).execute()
# supabase.table("students").select("*").execute()



#--------For using PostgreSQL directly:-----------
# from sqlalchemy import create_engine
# from app.core.config import settings

# engine = create_engine(settings.DATABASE_URL)
