# 🎉 EventFlow – Campus Event Management System

EventFlow is a full-stack web application that simplifies event organization and participation on a college campus. Teachers can create and manage events, while students can register and view their registered events.

---

## 🔧 Tech Stack

### 🖥️ Frontend
- React.js (Vite)
- HTML5, CSS3
- React Icons
- Axios
- Local Storage (for session handling)

### 🛠️ Backend
- Node.js
- Express.js
- MySQL (with `mysql2`)
- Bcrypt (for password hashing)
- RESTful APIs

---

## 📁 Project Structure

```bash
hp-eventflow/
├── eventflow-frontend/     # React Frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── styles/
│       └── main.jsx
├── eventflow-backend/      # Node.js + Express Backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── .env.example
│   └── server.js
├── .gitignore
├── README.md
└── package.json

🚀 Features

👨‍🏫 Teacher
Sign up / Login
View profile
Create events
Delete events
View registered students

👨‍🎓 Student
Sign up / Login
View profile
View all events
Register for events
View registered events

🔐 Session data is stored in localStorage for demo purposes.

🧪 Demo Flow (for Interview or Showcase)
Teacher Signup → Login → Profile → Admin Panel → Create/Delete Events

Student Signup → Login → Profile → Events → Register → Registered Events View

Use one browser or incognito mode to simulate both roles if needed.

⚙️ Setup Instructions

1️⃣ Clone Repository
git clone https://github.com/Itshari2005/EventFlow.git
cd EventFlow

2️⃣ Backend Setup

cd eventflow-backend
cp .env.example .env   # Fill DB credentials
npm install
node server.js

3️⃣ Frontend Setup

cd eventflow-frontend
npm install
npm run dev

🌐 Hosting
If hosted, access via:
Frontend: http://localhost:5173
Backend: http://localhost:5000
Replace localhost with deployed URL if hosted online.

✅ .env File Example
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret


👨‍💼 Author
Hari Prashath
Aspiring Full Stack Developer
Focused on clean UI/UX and real-world functionality
Open to learning and growing through team collaboration

📃 License
This project is for educational/demo purposes only.