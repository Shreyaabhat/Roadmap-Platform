# 🚀 PathForge — AI-Powered Learning & Career Roadmap Platform

> A full-stack platform that provides structured roadmaps for programming languages and job roles, tracks user progress, and generates AI-based learning content using OpenAI.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [API Endpoints](#-api-endpoints)
- [Database Models](#-database-models)
- [Frontend Pages](#-frontend-pages)
- [AI Features](#-ai-features)
- [Seeding Sample Data](#-seeding-sample-data)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 Auth | JWT-based Signup, Login, Logout with secure bcrypt hashing |
| 🗺️ Roadmaps | Structured roadmaps for job roles & programming languages |
| 📚 Lessons | Lessons with AI-generated notes, resources & tasks |
| 📊 Progress | Track completed lessons, percentage, streaks |
| 🤖 AI Tutor | Generate notes, roadmaps & recommendations via OpenAI |
| 💬 AI Chat | Chat with an AI tutor about any lesson |
| 📱 Responsive | Clean modern UI, works on mobile & desktop |
| 🔒 Secure | Helmet, rate limiting, input validation |

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** JSON Web Tokens (JWT) + bcryptjs
- **AI:** OpenAI API (GPT-3.5-turbo)
- **Security:** Helmet, express-rate-limit, express-validator

### Frontend
- **Framework:** React.js (Create React App)
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **State:** React Context API

---

## 📁 Folder Structure

```
pathforge/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register, login, getMe
│   │   ├── roadmapController.js   # Roadmap CRUD, enroll
│   │   ├── progressController.js  # Track lesson completion
│   │   ├── aiController.js        # OpenAI integrations
│   │   └── userController.js      # User profile management
│   ├── middleware/
│   │   └── auth.js                # JWT protect middleware
│   ├── models/
│   │   ├── User.js                # User schema
│   │   ├── Roadmap.js             # Roadmap + Module + Lesson schemas
│   │   └── Progress.js            # Progress tracking schema
│   ├── routes/
│   │   ├── auth.js
│   │   ├── roadmaps.js
│   │   ├── lessons.js
│   │   ├── progress.js
│   │   ├── ai.js
│   │   └── users.js
│   ├── seed/
│   │   └── seedData.js            # Sample roadmaps & lessons
│   ├── .env.example
│   ├── package.json
│   └── server.js                  # Entry point
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── auth/              # Login, Signup forms
    │   │   ├── dashboard/         # Dashboard cards, stats
    │   │   ├── layout/            # Sidebar, Navbar, Layout
    │   │   ├── roadmap/           # Roadmap cards, module list
    │   │   ├── lesson/            # Lesson viewer, AI chat
    │   │   ├── progress/          # Progress bars, stats
    │   │   └── ui/                # Reusable UI components
    │   ├── context/
    │   │   └── AuthContext.js     # Global auth state
    │   ├── hooks/
    │   │   ├── useAuth.js
    │   │   └── useProgress.js
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── SignupPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── RoadmapsPage.jsx
    │   │   ├── RoadmapDetailPage.jsx
    │   │   ├── LessonPage.jsx
    │   │   └── ProgressPage.jsx
    │   ├── services/
    │   │   └── api.js             # Axios instance + all API calls
    │   ├── utils/
    │   │   └── helpers.js
    │   ├── App.jsx
    │   └── index.js
    ├── .env.example
    ├── tailwind.config.js
    └── package.json
```

---

## ✅ Prerequisites

Make sure you have these installed before starting:

| Tool | Version | Download |
|---|---|---|
| Node.js | v18+ | https://nodejs.org |
| npm | v9+ | Comes with Node |
| MongoDB Atlas | Free tier | https://cloud.mongodb.com |
| Git | Latest | https://git-scm.com |
| OpenAI API Key | — | https://platform.openai.com |

---

## 🔧 Installation & Setup

### Step 1 — Clone the repository

```bash
git clone https://github.com/your-username/pathforge.git
cd pathforge
```

---

### Step 2 — Set up MongoDB Atlas

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free account
2. Create a new **Cluster** (choose the free M0 tier)
3. Click **Connect** → **Connect your application**
4. Copy the connection string — it looks like:
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/pathforge
   ```
5. Replace `<password>` with your actual password
6. Add your IP address to the **Network Access** whitelist (or use `0.0.0.0/0` for all IPs)

---

### Step 3 — Get your OpenAI API Key

1. Go to [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Click **Create new secret key**
3. Copy the key — you'll only see it once!
4. Make sure your account has billing set up (AI features require API credits)

> ⚠️ **Note:** AI features won't work without a valid OpenAI key, but the rest of the platform functions normally.

---

### Step 4 — Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

Now open `.env` and fill in your values:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://your_user:your_pass@cluster0.xxxxx.mongodb.net/pathforge
JWT_SECRET=your_super_secret_key_at_least_32_chars
JWT_EXPIRE=7d
OPENAI_API_KEY=sk-your-openai-key-here
CLIENT_URL=http://localhost:3000
```

---

### Step 5 — Seed Sample Data

```bash
# While inside the backend folder
npm run seed
```

This will insert sample roadmaps into MongoDB:
- ✅ Frontend Developer Roadmap
- ✅ Backend Developer Roadmap
- ✅ Python Programming Roadmap
- ✅ Data Scientist Roadmap

---

### Step 6 — Frontend Setup

```bash
# Go back to root and into frontend
cd ../frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

Open frontend `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🚀 Running the Project

### Start Backend

```bash
cd backend
npm run dev        # Development (with nodemon auto-reload)
# OR
npm start          # Production
```

You should see:
```
🚀 PathForge API running on port 5000
✅ MongoDB connected successfully
📍 Environment: development
```

### Start Frontend

```bash
cd frontend
npm start
```

The app opens at **http://localhost:3000**

---

## 🌐 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create new account |
| POST | `/api/auth/login` | Public | Login & get JWT |
| GET | `/api/auth/me` | Private | Get current user |

**Register Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "roleGoal": "Frontend Developer",
  "experienceLevel": "Beginner"
}
```

**Login Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (both):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5...",
  "user": {
    "_id": "64abc123...",
    "name": "John Doe",
    "email": "john@example.com",
    "roleGoal": "Frontend Developer",
    "experienceLevel": "Beginner"
  }
}
```

---

### Roadmap Routes — `/api/roadmaps`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/roadmaps` | Public | Get all roadmaps |
| GET | `/api/roadmaps/:id` | Public | Get roadmap by ID or slug |
| POST | `/api/roadmaps/:id/enroll` | Private | Enroll in a roadmap |
| GET | `/api/roadmaps/:roadmapId/lessons/:lessonId` | Private | Get specific lesson |

**Query Parameters for GET /api/roadmaps:**
```
?category=Job Role
?search=frontend
```

---

### Lesson Routes — `/api/lessons`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/lessons/:lessonId` | Private | Get lesson by ID |

---

### Progress Routes — `/api/progress`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/progress/:userId` | Private | Get all progress for user |
| GET | `/api/progress/roadmap/:roadmapId` | Private | Get progress for one roadmap |
| POST | `/api/progress/complete` | Private | Mark lesson as complete |
| POST | `/api/progress/note` | Private | Save note on a lesson |

**Complete Lesson Request Body:**
```json
{
  "roadmapId": "64abc123...",
  "lessonId": "64def456...",
  "moduleId": "64ghi789...",
  "timeSpent": 25
}
```

---

### AI Routes — `/api/ai`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/ai/generate-notes` | Private | Generate lesson notes via GPT |
| POST | `/api/ai/generate-roadmap` | Private | Generate custom roadmap |
| POST | `/api/ai/recommend` | Private | Get topic recommendations |
| POST | `/api/ai/chat` | Private | Chat with AI tutor |

**Generate Notes Request Body:**
```json
{
  "lessonTitle": "Introduction to React Hooks",
  "topic": "useState and useEffect hooks in React",
  "difficulty": "Beginner"
}
```

**Generate Roadmap Request Body:**
```json
{
  "goal": "Become a Full Stack Developer",
  "experienceLevel": "Beginner",
  "timeframe": "6 months",
  "focusAreas": ["JavaScript", "React", "Node.js"]
}
```

---

### User Routes — `/api/users`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/users/profile` | Private | Get user profile + stats |
| PUT | `/api/users/profile` | Private | Update profile |

---

### Using Protected Endpoints

All **Private** routes require the JWT token in the Authorization header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🗄️ Database Models

### User
```js
{
  name: String,           // required, 2-50 chars
  email: String,          // required, unique
  password: String,       // hashed, not returned in queries
  roleGoal: String,       // enum: Frontend, Backend, etc.
  experienceLevel: String,// Beginner | Intermediate | Advanced
  currentRoadmapId: ObjectId, // ref: Roadmap
  bio: String,
  createdAt: Date
}
```

### Roadmap
```js
{
  title: String,
  description: String,
  category: String,       // Job Role | Programming Language
  slug: String,           // auto-generated, URL-friendly
  icon: String,           // emoji
  color: String,          // hex color
  tags: [String],
  difficulty: String,
  estimatedDuration: String,
  modules: [Module],      // embedded
  isPublished: Boolean,
  enrollmentCount: Number
}
```

### Module (embedded in Roadmap)
```js
{
  title: String,
  description: String,
  level: String,          // Beginner | Intermediate | Advanced
  order: Number,
  icon: String,
  lessons: [Lesson]       // embedded
}
```

### Lesson (embedded in Module)
```js
{
  title: String,
  description: String,
  content: String,        // AI-generated or static markdown
  difficulty: String,
  estimatedTime: Number,  // minutes
  resources: [{ title, url, type }],
  tasks: [{ title, description, difficulty }],
  order: Number
}
```

### Progress
```js
{
  userId: ObjectId,       // ref: User
  roadmapId: ObjectId,    // ref: Roadmap
  completedLessons: [String], // array of lesson IDs
  percentage: Number,     // 0-100
  currentLessonId: String,
  currentModuleId: String,
  totalTimeSpent: Number, // minutes
  streak: Number,
  lastActiveDate: Date,
  isCompleted: Boolean,
  completedAt: Date,
  lessonNotes: [{ lessonId, note, createdAt }]
}
```

---

## 🖥️ Frontend Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Landing page with features & CTA |
| Login | `/login` | Email + password login form |
| Signup | `/signup` | Registration with role selection |
| Dashboard | `/dashboard` | User stats, current roadmap, next lesson |
| Roadmaps | `/roadmaps` | Browse all available roadmaps |
| Roadmap Detail | `/roadmaps/:id` | Modules list, lesson count, enroll |
| Lesson | `/lesson/:id` | Lesson content, AI notes, tasks |
| Progress | `/progress` | Charts, streaks, completed lessons |

---

## 🤖 AI Features

### 1. Generate Lesson Notes
Automatically generates structured markdown notes for any lesson topic using GPT-3.5-turbo. Includes overview, key concepts, code examples, and summary.

### 2. Generate Custom Roadmap
Creates a personalized learning roadmap based on the user's goal, experience level, and timeframe.

### 3. Topic Recommendations
Analyzes completed lessons and suggests what to learn next, based on the user's role goal.

### 4. AI Tutor Chat
An in-lesson chat interface where users can ask questions about the current topic and get instant AI-powered answers.

---

## 🌱 Seeding Sample Data

The seed script adds 4 complete roadmaps with modules and lessons:

```bash
cd backend
npm run seed
```

**Sample Roadmaps included:**
- 🎨 **Frontend Developer** — HTML/CSS → JavaScript → React → Advanced
- ⚙️ **Backend Developer** — Node.js → Express → Databases → APIs
- 🐍 **Python Programming** — Basics → OOP → Libraries → Projects
- 📊 **Data Scientist** — Math → Python → ML → Deep Learning

To reset and re-seed:
```bash
npm run seed   # Clears existing roadmaps and re-inserts
```

---

## ☁️ Deployment

### Deploy Backend to Render

1. Push your code to GitHub
2. Go to [https://render.com](https://render.com) and sign up
3. Click **New** → **Web Service**
4. Connect your GitHub repository
5. Configure the service:
   - **Name:** `pathforge-api`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Add **Environment Variables** in Render dashboard:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_key
   CLIENT_URL=https://your-frontend.vercel.app
   ```
7. Click **Deploy**
8. Copy your Render URL: `https://pathforge-api.onrender.com`

---

### Deploy Frontend to Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign up
2. Click **Add New Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
5. Add **Environment Variables**:
   ```
   REACT_APP_API_URL=https://pathforge-api.onrender.com/api
   ```
6. Click **Deploy**
7. Your app is live at `https://pathforge.vercel.app`

---

### Post-Deployment Checklist

- [ ] Update `CLIENT_URL` in Render with your Vercel URL
- [ ] Test registration and login
- [ ] Run the seed script against production DB:
  ```bash
  MONGODB_URI=your_prod_uri node seed/seedData.js
  ```
- [ ] Test AI features with a valid OpenAI key
- [ ] Check CORS settings if you get network errors

---

## 🔒 Environment Variables Reference

### Backend `.env`

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/pathforge?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
JWT_EXPIRE=7d

# OpenAI API Key (get from platform.openai.com)
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxx

# Frontend URL (for CORS — no trailing slash)
CLIENT_URL=http://localhost:3000
```

### Frontend `.env`

```env
# Backend API URL (no trailing slash)
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🐛 Troubleshooting

### MongoDB connection fails
- Check your IP is whitelisted in MongoDB Atlas → Network Access
- Verify the connection string has the correct username and password
- Make sure the database name is included in the URI

### JWT errors (401 Unauthorized)
- Check that `JWT_SECRET` in `.env` matches what was used to generate the token
- Token may be expired — log out and log back in
- Make sure the frontend is sending `Authorization: Bearer <token>`

### OpenAI errors (503)
- Verify `OPENAI_API_KEY` is set correctly in `.env`
- Check your OpenAI account has billing set up and credits available
- The platform works without OpenAI — AI buttons will show an error message

### CORS errors in browser
- Make sure `CLIENT_URL` in backend `.env` matches your frontend URL exactly
- No trailing slash: `http://localhost:3000` ✅ not `http://localhost:3000/` ❌
- Restart the backend after changing `.env`

### Frontend can't reach backend
- Confirm backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- React needs a restart after changing `.env` files

### Port already in use
```bash
# Find process on port 5000
lsof -i :5000
# Kill it
kill -9 <PID>
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---


---

## 🙏 Acknowledgements

- [OpenAI](https://openai.com) — AI capabilities
- [MongoDB Atlas](https://cloud.mongodb.com) — Database hosting
- [Render](https://render.com) — Backend hosting
- [Vercel](https://vercel.com) — Frontend hosting
- [Tailwind CSS](https://tailwindcss.com) — Styling

---

<div align="center">
  Built with ❤️ using Node.js, React, MongoDB & OpenAI
</div>
