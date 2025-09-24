# backend/app/crud.py
from sqlalchemy.orm import Session
from . import models, schemas
from datetime import datetime

# -------- User --------
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(name=user.name, email=user.email)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_users(db: Session):
    return db.query(models.User).all()

# -------- Skill --------
def create_skill(db: Session, user_id: int, skill: schemas.SkillCreate):
    db_skill = models.Skill(
        user_id=user_id,
        name=skill.name,
        category=skill.category,
        difficulty=skill.difficulty,
        total_hours=skill.total_hours or 0
    )
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

def get_skills(db: Session, user_id: int):
    return db.query(models.Skill).filter(models.Skill.user_id == user_id).all()

def get_skill(db: Session, skill_id: int):
    return db.query(models.Skill).filter(models.Skill.id == skill_id).first()

def delete_skill(db: Session, skill_id: int):
    skill = get_skill(db, skill_id)
    if not skill:
        return None
    db.delete(skill)
    db.commit()
    return skill

# -------- Resource --------
def add_resource(db: Session, skill_id: int, resource: schemas.ResourceCreate):
    db_res = models.Resource(
        skill_id=skill_id,
        title=resource.title,
        type=resource.type,
        platform=resource.platform,
        url=resource.url
    )
    db.add(db_res)
    db.commit()
    db.refresh(db_res)
    return db_res

# -------- Progress --------
def add_progress(db: Session, skill_id: int, progress: schemas.ProgressCreate):
    db_prog = models.Progress(
        skill_id=skill_id,
        status=progress.status,
        hours=progress.hours,
        notes=progress.notes,
        date=datetime.utcnow()
    )
    db.add(db_prog)
    
    db.commit()
    db.refresh(db_prog)
    return db_prog

def get_progress(db: Session, skill_id: int):
    return db.query(models.Progress).filter(models.Progress.skill_id == skill_id).all()

def get_total_hours(db: Session, skill_id: int):
    entries = db.query(models.Progress).filter(models.Progress.skill_id == skill_id).all()
    return sum([p.hours for p in entries])

