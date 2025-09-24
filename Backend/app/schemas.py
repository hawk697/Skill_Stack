# backend/app/schemas.py
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

# -------- Resource --------
class ResourceCreate(BaseModel):
    title: str
    type: Optional[str] = None
    platform: Optional[str] = None
    url: Optional[str] = None

class ResourceResponse(ResourceCreate):
    id: int
    skill_id: int
    class Config:
        orm_mode = True

# -------- Progress --------
class ProgressCreate(BaseModel):
    status: str
    hours_spent: Optional[int] = 0
    notes: Optional[str] = None

class ProgressResponse(ProgressCreate):
    id: int
    skill_id: int
    date: datetime
    class Config:
        orm_mode = True

# -------- Skill --------
class SkillCreate(BaseModel):
    name: str
    category: Optional[str] = None
    difficulty: Optional[int] = 1

class SkillResponse(SkillCreate):
    id: int
    created_at: datetime
    resources: List[ResourceResponse] = []
    progress_entries: List[ProgressResponse] = []
    class Config:
        orm_mode = True

# -------- User --------
class UserCreate(BaseModel):
    name: str
    email: str

class UserResponse(UserCreate):
    id: int
    skills: List[SkillResponse] = []
    class Config:
        orm_mode = True
