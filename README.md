# 🧭 SideQuest
**Gamifying Volunteering and Community Engagement**

SideQuest is a full-stack web application that connects users with local volunteering opportunities while rewarding them for their impact.  
By transforming volunteering into an engaging and trackable experience, SideQuest encourages ongoing participation and strengthens community ties.

---

## 🚀 Features
- 🧩 **Volunteer Opportunities** — Browse and join local community events.  
- 🕹️ **Gamification System** — Earn points, track hours, and climb leaderboards.  
- 🎁 **Rewards Dashboard** — Claim rewards for your contributions.  
- 🧑‍🤝‍🧑 **Organization Portal** — Create and manage events with live participation data.  
- 🔒 **Authentication System** — Secure login and personalized profiles.  

---

## 🧰 Tech Stack

### **Frontend**
- [React](https://react.dev/) (Vite)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

### **Backend**
- [FastAPI](https://fastapi.tiangolo.com/) (Python)
- [Uvicorn](https://www.uvicorn.org/)
- [MongoDB Atlas](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) for containerization

### **Development Tools**
- [Docker Compose](https://docs.docker.com/compose/) — service orchestration  
- [Node.js](https://nodejs.org/) — package management for frontend  
- [Python 3.11+](https://www.python.org/) — backend runtime  
- [dotenv](https://pypi.org/project/python-dotenv/) — environment management  

---

## ⚙️ Prerequisites

Make sure you have the following installed:
- **Docker** and **Docker Compose**
- **Node.js** (v18+ recommended)
- **Python** (v3.11 or higher, if running locally without Docker)
- **MongoDB URI** (from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or local instance)

You’ll also need a `.env` file in your `/backend` directory:
```bash
MONGODB_URI="your_mongodb_connection_uri"
DB_NAME="your_mongodb_database_name"
```

---

## 🧱 Project Structure
```bash
.
├── frontend/              # React + Vite web app
│   ├── src/
│   ├── package.json
│   └── dockerfile
│
├── backend/               # FastAPI backend
│   ├── api/
│   │   ├── main.py
│   │   ├── routers.py
│   │   └── models/
│   ├── requirements.txt
│   └── dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## 🐳 Running the Project with Docker
### 1. Clone the repository
```bash
git clone https://github.com/yourusername/sidequest.git
cd sidequest
```
### 2. Build and start the containers
```bash
docker compose up --build
```
### 3. Access the app
- Frontend: http://localhost:5173
- Backend (FastAPI docs): http://localhost:8000/docs
### 4. Stop the containers
```bash
docker compose down
```

---

## Database Setup

### Our MongoDB Collection Data Structures
db.Events
```json
{
  "eventId": "1",
  "title": "Food Bank Drive",
  "description": "Help collect and organize food donations for families in need.",
  "location": "Downtown Community Center",
  "time": "2025-11-15T13:30:00",
  "points": 200,
  "organizationLabel": "Helping Hands",
  "volunteers": [
    {
      "userId": "4",
      "username": "Cody"
    }
  ],
  "currentState": "Approved"
}
```

db.Rewards
```json
{
  "rewardId": "0",
  "numPoints": 50,
  "title": "Free Coffee Voucher",
  "description": "Enjoy a free medium coffee from BeanWorks Café.",
  "imageURL": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
}
```

db.Users
```json
{
  "userId": "4",
  "username": "Cody",
  "password": "password1231",
  "userType": "volunteer",
  "hours": 55,
  "points": 100,
  "events": [
    "0",
  ],
  "rewards": [
    "0"
  ]
}
```
// Note: Password hashing and secure authentication were not implemented due to time constraints. In a production system, we would integrate a secure authentication service such as BetterAuth to handle user login and credential protection.
