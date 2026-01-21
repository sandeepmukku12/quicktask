from .db import tasks_collection
from bson.objectid import ObjectId
from datetime import dateTime, timedelta

# User statistics
def user_stats(user_id):
    total_tasks = tasks_collection.count_documents({"userId": ObjectId(user_id)})
    
    completed_tasks = tasks_collection.count_documents(
        {"userId": ObjectId(user_id), "status": "Completed"}
    )

    pending_tasks = total_tasks - completed_tasks

    return {
        "total": total_tasks,
        "completed": completed_tasks,
        "pending": pending_tasks
    }


# Productivity trends (tasks completed per day over last N days)
def productivity_trends(user_id, days=7):
    today = dateTime.utcnow()
    start_date = today - timedelta(days=days)
    pipeline = [
        {"$match": {"userId": ObjectId(user_id), "status": "Completed", "updatedAt": {"$gte": start_date}}},
        {"$group": {
            "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": "$updatedAt"}},
            "count": {"$sum": 1}
        }},
        {"$sort": {"_id": 1}}
    ]

    results = list(tasks_collection.aggregate(pipeline))

    return results