#For using from supabase client:

from supabase import create_client
from app.core.config import settings

supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


#--------For using PostgreSQL directly:-----------
# from sqlalchemy import create_engine
# from app.core.config import settings

# engine = create_engine(settings.DATABASE_URL)
