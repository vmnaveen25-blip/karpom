from typing import Optional, List
from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str
    role: Optional[str] = "Student"

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
    institution: str
    department: str
    streak_days: int

class AskAIRequest(BaseModel):
    prompt: str
    course: Optional[str] = "Data Structures and Algorithms"
    material: Optional[str] = "Arrays"
    mode: Optional[str] = "Chat & Explain"

class AskAIResponse(BaseModel):
    response: str
    course: str
    material: str
    mode: str
