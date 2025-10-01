# 📌 MERN Task Distribution App

A full-stack MERN application to **manage agents and distribute tasks** automatically by uploading a CSV file.  
The system assigns tasks to at least 5 agents in a **round-robin distribution** and displays them on a dashboard.

---

## 🚀 Features

- 🔐 User authentication (JWT-based)
- 👩‍💼 Add and manage agents
- 📂 Upload CSV/XLSX files with tasks
- ⚖️ Even distribution of tasks among agents
- 📊 Dashboard view for:
  - Agents list
  - Distributed tasks grouped by agent
- ⚡ Built with **React, Express, MongoDB, Node.js**

---

## 🛠️ Tech Stack

- **Frontend**: React, TailwindCSS, Axios, React Router
- **Backend**: Node.js, Express.js, Multer, CSV-Parser
- **Database**: MongoDB + Mongoose
- **Auth**: JWT (JSON Web Token)

---

## 📂 Project Structure

/client → React frontend

/server → Express backend

/routes → API routes (agents, upload, auth)

/models → Mongoose models (Agent, ListItem, User)

/middleware → Auth middleware


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/mern-task-distributor.git
cd mern-task-distributor
```
### 2️⃣ Backend Setup
```
cd server
npm install

```

---

**Create a .env file in server/:**
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-app
JWT_SECRET=your_jwt_secret

```
---

**Start backend:**
```
npm run dev

```
---

### 3️⃣ Frontend Setup

```
cd ../client
npm install

```

---
**Start frontend:**
```
npm start

```

---

### CSV Format

**Your CSV file must have the following headers:**
```
FirstName,Phone,Notes
John,9876543210,Call in the morning
Alice,9087654321,Send email
Bob,9012345678,Follow up next week

```
---

### How It Works

1. Add at least 5 agents.

2. Upload a CSV file of tasks.

3. Backend distributes tasks evenly among the first 5 agents.

4. Dashboard displays agents & their assigned tasks.

 
 ---
 
### Demo Video

Watch the working demo here: https://drive.google.com/file/d/1-8Oqg5zLuyj_NEA_XoIC8R__-CVsq9_a/view?usp=sharing


















