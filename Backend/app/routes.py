# backend/app/routes.py
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlalchemy.orm import Session
from . import schemas, crud
from .database import get_db

router = APIRouter()

# -------- User --------
@router.post("/users", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db, user)

@router.get("/users", response_model=List[schemas.UserResponse])
def list_users(db: Session = Depends(get_db)):
    return crud.get_users(db)

# -------- Skill --------
@router.post("/users/{user_id}/skills", response_model=schemas.SkillResponse)
def add_skill(user_id: int, skill: schemas.SkillCreate, db: Session = Depends(get_db)):
    return crud.create_skill(db, user_id, skill)

@router.get("/users/{user_id}/skills", response_model=List[schemas.SkillResponse])
def get_skills(user_id: int, db: Session = Depends(get_db)):
    return crud.get_skills(db, user_id)

@router.delete("/skills/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_skill(db, skill_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Skill not found")
    return {"detail": "Skill deleted"}

# -------- Resource --------
@router.post("/skills/{skill_id}/resources", response_model=schemas.ResourceResponse)
def add_resource(skill_id: int, resource: schemas.ResourceCreate, db: Session = Depends(get_db)):
    return crud.add_resource(db, skill_id, resource)

# -------- Progress --------
@router.post("/skills/{skill_id}/progress", response_model=schemas.ProgressResponse)
def add_progress(skill_id: int, progress: schemas.ProgressCreate, db: Session = Depends(get_db)):
    return crud.add_progress(db, skill_id, progress)

@router.get("/skills/{skill_id}/progress", response_model=List[schemas.ProgressResponse])
def get_progress(skill_id: int, db: Session = Depends(get_db)):
    return crud.get_progress(db, skill_id)
