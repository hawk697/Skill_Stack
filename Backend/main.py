# backend/main.py
from fastapi import FastAPI
from app.database import init_db
from app.routes import router as api_router

app = FastAPI(title="SkillStack API")

@app.on_event("startup")
def startup_event():
    init_db()

app.include_router(api_router, prefix="/api", tags=["skillstack"])

@app.get("/")
def root():
    return {"message": "SkillStack backend running 🚀"}
