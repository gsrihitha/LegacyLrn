"""
Script to create test users for development/demo purposes.
Run this to create dummy accounts you can use to test login.
"""

from app.core.db import supabase
from app.core.auth import hash_password
from app.models.student import StudentCreate
from app.models.mentor import MentorCreate

def create_test_users():
    """Create test student and mentor accounts"""
    
    # Test Student
    test_student = {
        "name": "Anita Student",
        "email": "anita@test.com",
        "password": hash_password("test123"),
        "goal": "I want to learn Python programming and web development to start my career in tech.",
        "preferred_skill": "Python",
        "location": "San Francisco, CA"
    }
    
    # Test Mentor
    test_mentor = {
        "name": "Dr. John Smith",
        "email": "john@test.com",
        "password": hash_password("test123"),
        "skill": "Software Engineering & Python",
        "years_experience": 25,
        "hourly_rate": 50.00,
        "mode": "online",
        "location": "New York, NY"
    }
    
    try:
        # Check if users already exist
        student_check = supabase.table("students").select("*").eq("email", test_student["email"]).execute()
        mentor_check = supabase.table("mentors").select("*").eq("email", test_mentor["email"]).execute()
        
        if student_check.data:
            print(f"⚠️  Student {test_student['email']} already exists")
        else:
            result = supabase.table("students").insert(test_student).execute()
            print(f"✅ Created test student: {test_student['email']}")
        
        if mentor_check.data:
            print(f"⚠️  Mentor {test_mentor['email']} already exists")
        else:
            result = supabase.table("mentors").insert(test_mentor).execute()
            print(f"✅ Created test mentor: {test_mentor['email']}")
        
        print("\n" + "="*50)
        print("TEST CREDENTIALS:")
        print("="*50)
        print("\n📚 STUDENT:")
        print(f"   Email: {test_student['email']}")
        print(f"   Password: test123")
        print(f"   Name: {test_student['name']}")
        print("\n👨‍🏫 MENTOR:")
        print(f"   Email: {test_mentor['email']}")
        print(f"   Password: test123")
        print(f"   Name: {test_mentor['name']}")
        print("\n" + "="*50)
        
    except Exception as e:
        print(f"❌ Error creating test users: {e}")
        raise

if __name__ == "__main__":
    print("Creating test users...")
    create_test_users()
    print("\n✅ Done! You can now use these credentials to login.")

