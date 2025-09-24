from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Text
from sqlalchemy.orm import declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)

    skills = relationship("Skill", back_populates="user")

class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String, nullable=False)
    category = Column(String, nullable=True)
    difficulty = Column(Integer, default=1)
    created_at = Column(DateTime, default=datetime.utcnow)
    total_hours = Column(Integer, default=0)

    user = relationship("User", back_populates="skills")
    resources = relationship("Resource", back_populates="skill")
    progress_entries = relationship("Progress", back_populates="skill")

class Resource(Base):
    __tablename__ = "resources"

    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(Integer, ForeignKey("skills.id"))
    title = Column(String, nullable=False)
    type = Column(String, nullable=True)      # book, video, course, etc.
    platform = Column(String, nullable=True)
    url = Column(String, nullable=True)

    skill = relationship("Skill", back_populates="resources")

class Progress(Base):
    __tablename__ = "progress"

    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(Integer, ForeignKey("skills.id"))
    status = Column(String, nullable=False)   # started / in-progress / completed
    hours = Column(Integer, default=0)
    notes = Column(Text, nullable=True)
    date = Column(DateTime, default=datetime.utcnow)

    skill = relationship("Skill", back_populates="progress_entries")
