import os
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.task_analytics import user_stats, productivity_trends

app = FastAPI(title="QuickTask Analytics Service")

origins = [
    os.getenv("FRONTEND_URL_DEV") or "http://localhost:3000",
    os.getenv("FRONTEND_URL_PROD"),
]


# Allow CORS from frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],   # GET, POST, PUT, DELETE
    allow_headers=["*"],
)

@app.get("/user-stats")
def get_user_stats(user_id: str = Query(..., description="MongoDB User ID")):
    """
    Returns aggregate stats for a user.
    Required query parameter: user_id
    """
    try:
        return user_stats(user_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/productivity")
def get_productivity(
    user_id: str = Query(..., description="MongoDB User ID"),
    days: int = Query(7, gt=0, le=30, description="Number of days to analyze")
):
    """
    Returns tasks completed per day over the last N days
    """
    try:
        return productivity_trends(user_id, days)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
