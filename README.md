# 🎉 EventFlow – Campus Event Management System (Frontend Only)

EventFlow is a **frontend-only React application** that simplifies event organization and participation on a college campus. It supports **role-based access** for students and teachers. Teachers can create and manage events, while students can register for events and view their participation – all powered by **localStorage** (no backend required).

---

## 🔧 Tech Stack

### 🖥️ Frontend
- React.js (Vite)
- HTML5, CSS3
- React Icons
- Local Storage (for session and event data)

---

## 📁 Project Structure

```
hp-eventflow/
├── eventflow-frontend/     # React Frontend Only
│   └── src/
│       ├── assets/         # Images and icons
│       ├── components/     # Reusable components
│       ├── pages/          # Page-level components
│       ├── styles/         # CSS files
│       └── main.jsx        # Entry point
├── .gitignore
├── README.md               # Project README (this file)
└── package.json
```

---

## 🚀 Features

### 👨‍🏫 Teacher
- Sign up / Login
- View profile
- Create new events
- Delete or update existing events
- View registered student section (placeholder)

### 👨‍🎓 Student
- Sign up / Login
- View profile
- Browse all events
- Register for events
- View registered events (based on localStorage)

### 💾 Local Storage
All user data (sign-up, login), event creation, and registration are stored in the browser's localStorage for demo purposes.

---

## 🧪 Demo Flow (For Interview / Showcase)

> Use one browser and incognito mode to simulate **Teacher** and **Student** separately.

### 🔸 Teacher Flow
```
1. Sign Up → 
2. Login → 
3. View Profile → 
4. Create Events → 
5. View Event Info
```

### 🔸 Student Flow
```
1. Sign Up → 
2. Login → 
3. View Profile → 
4. Browse Events → 
5. Register for Events → 
6. View Registered Events
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Itshari2005/EventFlow.git
cd EventFlow/eventflow-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

### ✅ Open in Browser
```
http://localhost:5173
```

---

## 🌐 Deployment (Optional)

You can deploy this frontend-only version using:
- **Vercel**
- **Netlify**
- **GitHub Pages (with Vite adapter)**

---

## 👨‍💼 Author

**Hari Prashath**  
Aspiring Full Stack Developer  
Focused on clean UI/UX and real-world functionality  
Open to learning and growing through team collaboration  

[GitHub Profile](https://github.com/Itshari2005)

---

## 📃 License

This project is intended for **educational and demo purposes** only. Not for production use.

