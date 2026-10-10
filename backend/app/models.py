import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey, Float
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="student") # student, teacher, admin, super_admin
    institution = Column(String(150), default="Erode Sengunthar Engineering College")
    department = Column(String(100), default="Computer Science & Engineering")
    streak_days = Column(Integer, default=7)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Course(Base):
    __tablename__ = "courses"

    id = Column(String(50), primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    instructor = Column(String(100), nullable=False)
    description = Column(Text)
    category = Column(String(100))
    level = Column(String(50), default="Intermediate")
    progress = Column(Integer, default=0)
    total_lessons = Column(Integer, default=24)
    assessments_count = Column(Integer, default=5)
    thumbnail = Column(String(255))
    status = Column(String(50), default="in-progress")

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)
    course = Column(String(150), nullable=False)
    material = Column(String(150), nullable=False)
    mode = Column(String(50), default="Chat & Explain")
    prompt = Column(Text, nullable=False)
    response = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(String(50))
    title = Column(String(200), nullable=False)
    topic = Column(String(100))
    content = Column(Text)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Flashcard(Base):
    __tablename__ = "flashcards"

    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(String(50))
    topic = Column(String(100))
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)
    difficulty = Column(String(50), default="Easy")
    status = Column(String(50), default="learning") # mastered, learning, unpracticed
