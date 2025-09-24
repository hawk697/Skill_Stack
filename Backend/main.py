# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import init_db
from app.routes import router as api_router

app = FastAPI(title="SkillStack API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],  # allow POST, GET, OPTIONS, DELETE, etc.
    allow_headers=["*"],  # allow Content-Type, Authorization, etc.
)

@app.on_event("startup")
def startup_event():
    init_db()

app.include_router(api_router, prefix="/api", tags=["skillstack"])

@app.get("/")
def root():
    return {"message": "SkillStack backend running 🚀"}
