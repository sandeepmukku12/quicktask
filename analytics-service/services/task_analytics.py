from .db import tasks_collection
from bson.objectid import ObjectId
from datetime import datetime, timedelta

def user_stats(user_id, recent_limit=5):
    user_oid = ObjectId(user_id)
    
    total_tasks = tasks_collection.count_documents({"userId": user_oid})
    completed_tasks = tasks_collection.count_documents({"userId": user_oid, "status": "Completed"})
    pending_tasks = total_tasks - completed_tasks
    completion_rate = round((completed_tasks / total_tasks) * 100, 2) if total_tasks > 0 else 0

    # Priority distribution
    pipeline = [
        {"$match": {"userId": user_oid}},
        {"$group": {"_id": "$priority", "count": {"$sum": 1}}}
    ]
    results = list(tasks_collection.aggregate(pipeline))
    priority_distribution = {res["_id"]: res["count"] for res in results}

    # Recent tasks
    recent_tasks_cursor = tasks_collection.find({"userId": user_oid}).sort("createdAt", -1).limit(recent_limit)
    recent_tasks = [{"_id": str(task["_id"]), "title": task["title"], "dueDate": task.get("dueDate")} for task in recent_tasks_cursor]

    return {
        "totalTasks": total_tasks,
        "completedTasks": completed_tasks,
        "pendingTasks": pending_tasks,
        "completionRate": completion_rate,
        "priorityDistribution": priority_distribution,
        "recentTasks": recent_tasks
    }

def productivity_trends(user_id, days=7):
    user_oid = ObjectId(user_id)
    today = datetime.utcnow()
    start_date = today - timedelta(days=days)

    pipeline = [
        {"$match": {"userId": user_oid, "status": "Completed", "updatedAt": {"$gte": start_date}}},
        {"$group": {"_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$updatedAt"}}, "count": {"$sum": 1}}},
        {"$sort": {"_id": 1}}
    ]
    return list(tasks_collection.aggregate(pipeline))
