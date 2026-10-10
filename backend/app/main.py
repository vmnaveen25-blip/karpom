import os
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from .models import User, Course, Note, Flashcard, ChatHistory
from .schemas import LoginRequest, UserResponse, AskAIRequest, AskAIResponse
from .services.gemini_service import ask_gemini_tutor

# Create DB tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Tutor V2 - AI Tutor API",
    description="Backend API for AI-Powered Learning Platform with Multi-Role Portals & Google Gemini",
    version="2.0.0"
)

# CORS configuration for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Seed database with initial student record if empty
@app.on_event("startup")
def seed_data():
    db = next(get_db())
    existing = db.query(User).filter(User.email == "vijay.vikas@college.edu").first()
    if not existing:
        student = User(
            name="Vijay Vikas",
            email="vijay.vikas@college.edu",
            hashed_password="hashed_demo_pw",
            role="student",
            institution="Erode Sengunthar Engineering College",
            department="Computer Science & Engineering",
            streak_days=7
        )
        db.add(student)
        db.commit()

@app.get("/api/health")
def health_check():
    return {
        "status": "online",
        "app": "Tutor V2 API",
        "version": "2.0.0",
        "gemini_ready": bool(os.getenv("GEMINI_API_KEY"))
    }

@app.post("/api/auth/login", response_model=UserResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        # For seamless demo experience, create or return demo user
        user = User(
            name=req.email.split("@")[0].replace(".", " ").title(),
            email=req.email,
            hashed_password="pw",
            role=req.role.lower() if req.role else "student",
            institution="Erode Sengunthar Engineering College",
            department="Computer Science & Engineering",
            streak_days=7
        )
        db.add(user)
        db.commit()
        db.refresh(user)

    return UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        role=req.role or user.role,
        institution=user.institution,
        department=user.department,
        streak_days=user.streak_days
    )

@app.post("/api/ai/ask", response_model=AskAIResponse)
def ask_ai(req: AskAIRequest, db: Session = Depends(get_db)):
    ai_answer = ask_gemini_tutor(
        prompt=req.prompt,
        course=req.course or "Data Structures and Algorithms",
        material=req.material or "Arrays",
        mode=req.mode or "Chat & Explain"
    )

    # Save to chat history
    chat_entry = ChatHistory(
        course=req.course or "DSA",
        material=req.material or "Arrays",
        mode=req.mode or "Chat",
        prompt=req.prompt,
        response=ai_answer
    )
    db.add(chat_entry)
    db.commit()

    return AskAIResponse(
        response=ai_answer,
        course=req.course or "Data Structures and Algorithms",
        material=req.material or "Arrays",
        mode=req.mode or "Chat & Explain"
    )

@app.get("/api/student/dashboard")
def get_student_dashboard():
    return {
        "profile": {
            "name": "Vijay Vikas",
            "role": "Student",
            "enrolledCourses": 3,
            "completedLessons": 5,
            "pendingAssessments": 2,
            "overallProgress": 78,
            "streakDays": 7
        }
    }
