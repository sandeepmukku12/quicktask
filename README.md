# QuickTask – Personal Task Management Application

QuickTask is a full-stack personal task management application designed to help users efficiently organize, track, and analyze their daily tasks. With QuickTask, users can securely 
register and log in, create and manage tasks with priorities and statuses, and view a personalized dashboard featuring task statistics and productivity analytics.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Prerequisites](#prerequisites)
4. [Installation & Setup](#installation--setup)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-the-application)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Python Analytics Service](#python-analytics-service)
7. [API Endpoint Documentation](#api-endpoint-documentation)
8. [Screenshots](#screenshots)
9. [Known Limitations / Assumptions](#known-limitations--assumptions)
10. [MongoDB Schema Design](#mongodb-schema-design)
11. [Seed Script](#seed-script)

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
