from fastapi import FastAPI, Query
from services.task_analytics import user_stats, productivity_trends

app = FastAPI(title="QuickTask Analytics Service")

@app.get("/user-stats")
def get_user_stats(user_id: str = Query(...)):
    return user_stats(user_id)

@app.get("/productivity")
def get_productivity(user_id: str = Query(...), days: int = Query(7)):
    return productivity_trends(user_id, days)
