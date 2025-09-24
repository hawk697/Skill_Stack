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
    hours: Optional[int] = 0      # ✅ fixed
    notes: Optional[str] = None

class ProgressResponse(BaseModel):
    id: int
    skill_id: int
    status: str
    hours: int
    notes: Optional[str] = None
    date: datetime
    class Config:
        orm_mode = True

# -------- Skill --------
class SkillCreate(BaseModel):
    name: str
    category: Optional[str] = None
    difficulty: Optional[int] = 1
    total_hours: Optional[int] = 0 

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

class SkillSummary(BaseModel):
    skill: str
    required_hours: int
    spent_hours: int
    progress_percent: float

