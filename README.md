# QuickTask – Personal Task Management Application

QuickTask is a full-stack personal task management application designed to help users efficiently organize, track, and analyze their daily tasks. With QuickTask, users can securely 
register and log in, create and manage tasks with priorities and statuses, and view a personalized dashboard featuring task statistics and productivity analytics.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Prerequisites](#prerequisites)
4. [Installation & Setup](#installation--setup)
5. [Running the Application](#running-the-application)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Python Analytics Service](#python-analytics-service)
6. [API Endpoint Documentation](#api-endpoint-documentation)
7. [Screenshots](#screenshots)
8. [Known Limitations / Assumptions](#known-limitations--assumptions)
9. [MongoDB Schema Design](#mongodb-schema-design)
10. [Seed Script](#seed-script)

---

## Project Overview

QuickTask is a personal task management application that allows users to manage their daily tasks efficiently and track productivity. It includes a dashboard with analytics, task management features, and a separate analytics microservice for insights.

### Key Features

- **Secure user authentication with JWT**  
- **Task CRUD operations** (Create, Read, Update, Delete)  
- **Filter, sort, and search tasks**  
- **Dashboard with charts** (task completion trends & priority distribution)  
- **Python analytics microservice** providing user statistics and productivity trends

---

## Technology Stack

| Layer      | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | React.js, Tailwind CSS, Recharts, Axios |
| Backend   | Node.js, Express.js, MongoDB, JWT       |
| Analytics | Python, FastAPI, PyMongo                |
| Deployment| Vercel (frontend), Render (backend + analytics) |

---

## Prerequisites

- **Node.js** >= 18.x  
- **npm** >= 9.x  
- **Python** >= 3.9  
- **MongoDB Atlas** account or local MongoDB instance  
- **Optional:** Vercel CLI or Render account for deployment

---

## Installation & Setup

To get started with **QuickTask**, follow these steps:

### 1. Clone the repository

   ```bash
   git clone https://github.com/sandeepmukku12/quicktask.git
   cd quicktask
   ```

### 2. Backend Setup
   
   Navigate to the backend directory and install dependencies:

   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:

   ```env
   PORT=8082
   MONGO_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   FRONTEND_URL_DEV=http://localhost:3000
   FRONTEND_URL_PROD=<your_frontend_deployed_url>
   ```

### 3. Frontend Setup

   Navigate to the frontend directory and install dependencies:

   ```bash
   cd ../frontend
   npm install
   ```
   Create a `.env` file in the `frontend` directory:

   ```env
   REACT_APP_AUTH_BASE_URL=http://localhost:8082/api
   REACT_APP_TASKS_BASE_URL=http://localhost:8082/api
   REACT_APP_ANALYTICS_BASE_URL=http://localhost:8000
   ```

### 4. Analytics Service Setup

   Navigate to the analytics-service directory:

   ```bash
   cd ../analytics-service
   python3 -m venv venv
   source venv/bin/activate  # Linux/macOS
   venv\Scripts\activate     # Windows
   pip install -r requirements.txt
   ```
   Create a `.env` file in the `analytics-service` directory:

   ```env
   PORT=8000
   MONGO_URI=<your_mongodb_uri>
   FRONTEND_URL_DEV=http://localhost:3000
   FRONTEND_URL_PROD=<your_frontend_deployed_url>
   ```

> ✅ **Notes:** You can check the `.env.example` files included in each directories (frontend, backend, analytics-service) for reference

---

## Running the Application

### Backend

   ```bash
     cd backend
     npm run dev     # for development with nodemon
     npm start       # for production
   ```
- **Health check:** GET http://localhost:8082/api/health

### Frontend

   ```bash
     cd frontend
     npm start       # development mode
     npm run build   # production build
   ```

### Python Analytics Service

- **Linux/macOS**:

    ```bash
       cd analytics-service
       source venv/bin/activate  # Linux/macOS
       uvicorn app:app --reload --host 0.0.0.0 --port 8000
    ```
   
- **Windows (Command Prompt)**:

    ```bash
       cd analytics-service
       venv\Scripts\activate
       uvicorn app:app --reload --host 0.0.0.0 --port 8000
    ```

- **Windows (PowerShell)**:

    ```bash
       cd analytics-service
       .\venv\Scripts\Activate.ps1
       uvicorn app:app --reload --host 0.0.0.0 --port 8000
    ```
> Once running, endpoints are available at:
   - `http://localhost:8000/user-stats?user_id=<id>`
   - `http://localhost:8000/productivity?user_id=<id>&days=7`

### ✅ Notes

- After running the frontend, open your browser at [http://localhost:3000](http://localhost:3000) to access the app.  
- Make sure the backend server is running before using the frontend.

---

## API Endpoint Documentation

### User Authentication

| Method | Endpoint           | Body / Params         | Description               |
|--------|------------------|---------------------|---------------------------|
| POST   | `/api/auth/register` | `{ email, password }` | Register a new user       |
| POST   | `/api/auth/login`    | `{ email, password }` | Login and receive JWT     |
| GET    | `/api/auth/logout`   | —                   | Logout user              |

### Tasks

| Method | Endpoint             | Body / Params                                         | Description                     |
|--------|---------------------|------------------------------------------------------|---------------------------------|
| POST   | `/api/tasks`         | `{ title, description, priority, status, dueDate }` | Create task                     |
| GET    | `/api/tasks`         | `?status=&priority=&search=&sortBy=`               | Get all tasks with search and filters      |
| PUT    | `/api/tasks/:id`     | `{ title?, description?, priority?, status?, dueDate? }` | Update task                 |
| DELETE | `/api/tasks/:id`     | —                                                    | Delete task                     |

### Analytics (Python Service)

| Method | Endpoint           | Query Params                        | Description                               |
|--------|------------------|------------------------------------|-------------------------------------------|
| GET    | `/user-stats`     | `?user_id=<id>`                     | Get total, completed, pending tasks       |
| GET    | `/productivity`   | `?user_id=<id>&days=7`              | Get task completion trends over last N days |

---

## Known Limitations / Assumptions

- Single-user login is supported per account (no multi-organization features yet)  
- Due date reminders are not implemented (bonus feature)  
- No export to CSV/PDF in MVP  
- Analytics service depends on MongoDB timestamps for trends

---

## MongoDB Schema Design

### User Collection

```json
{
  "_id": "ObjectId",
  "email": "String",
  "password": "String (hashed)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Task Collection

```json
{
  _id: ObjectId,
  userId: ObjectId,
  title: String,
  description: String,
  priority: "Low" | "Medium" | "High",
  status: "Todo" | "In Progress" | "Completed",
  dueDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---
