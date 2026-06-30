# 🌟 HanyuStar — AI-Powered Mandarin Learning Platform

A full-stack language learning app built with **React + TypeScript** (frontend) and **FastAPI + SQLite** (backend).

---

## 📁 Project Structure

```
hanyustar/
├── backend/                   ← FastAPI Python server
│   ├── app/
│   │   ├── main.py            ← All API routes
│   │   ├── models/models.py   ← SQLAlchemy DB models
│   │   ├── schemas/schemas.py ← Pydantic request/response schemas
│   │   ├── core/
│   │   │   ├── database.py    ← DB engine & session
│   │   │   └── security.py    ← JWT auth & password hashing
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── hanyustar.db           ← SQLite database (auto-created)
│   └── .env.example           ← Copy to .env and fill in values
│
├── frontend/                  ← React + Vite + TailwindCSS
│   ├── src/
│   │   ├── App.tsx            ← Root component & routing
│   │   ├── main.tsx           ← React entry point
│   │   ├── index.css          ← Global styles + Tailwind
│   │   ├── components/        ← All page components
│   │   ├── data/              ← HSK vocab, grammar, stories, etc.
│   │   └── services/
│   │       ├── api.ts         ← All fetch calls to backend
│   │       └── i18n.ts        ← Multi-language setup
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts         ← Dev proxy → backend:8000
│   └── tailwind.config.js
│
└── docker-compose.yml         ← Run everything with one command
```

---

## 🚀 Option A — Run with Docker (Easiest)

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed

### Steps

```bash
# 1. Clone / unzip the project
cd hanyustar

# 2. Copy and configure environment
cp backend/.env.example backend/.env
# (optionally open backend/.env and add your OPENAI_API_KEY)

# 3. Start the backend
docker-compose up --build
```

The API will be available at **http://localhost:8000**

API docs (Swagger UI): **http://localhost:8000/docs**

---

## 🛠️ Option B — Run Locally (No Docker)

### Backend

**Requirements:** Python 3.11+

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # macOS / Linux
venv\Scripts\activate           # Windows

# Install dependencies
pip install -r requirements.txt

# Copy and configure env
cp .env.example .env

# Run the server
uvicorn app.main:app --reload --port 8000
```

✅ Backend running at: **http://localhost:8000**
📖 Swagger docs at: **http://localhost:8000/docs**

---

### Frontend

**Requirements:** Node.js 18+ and npm

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server (proxies /api → localhost:8000 automatically)
npm run dev
```

✅ Frontend running at: **http://localhost:5173**

> **Both must be running at the same time** for full functionality.

---

## 🔑 Environment Variables (backend/.env)

| Variable | Default | Description |
|---|---|---|
| `SECRET_KEY` | `hanyustarsupersecretkey987654321` | JWT signing key — **change in production!** |
| `DATABASE_URL` | `sqlite:///./hanyustar.db` | DB connection string |
| `OPENAI_API_KEY` | `mock_key` | OpenAI key for AI features. Leave as `mock_key` for offline mode |

---

## 🧩 AI Features

All AI endpoints work in **offline mock mode** by default (no API key needed).

To enable real AI (chat, writing coach, speech analysis):
1. Get an API key from [platform.openai.com](https://platform.openai.com)
2. Set `OPENAI_API_KEY=sk-...` in `backend/.env`
3. Restart the backend

---

## 🗄️ Database

- Uses **SQLite** by default — zero configuration, the file `hanyustar.db` is created automatically.
- Tables are created on first startup via SQLAlchemy `Base.metadata.create_all()`.
- To switch to **PostgreSQL**, update `DATABASE_URL` in `.env`:
  ```
  DATABASE_URL=postgresql://user:password@localhost:5432/hanyustar
  ```

---

## 📦 Building for Production

### Frontend build
```bash
cd frontend
npm run build
# Output in frontend/dist/ — deploy to Vercel, Netlify, or serve statically
```

### Backend production
```bash
# In backend/.env, set a strong SECRET_KEY and your real DATABASE_URL
docker-compose up --build -d
```

---

## 🧪 API Endpoints Summary

| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Login → JWT token |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/update` | Update profile |
| POST | `/api/learning/lesson/complete` | Mark lesson done + award XP |
| GET | `/api/learning/saved-words` | Get saved vocabulary |
| POST | `/api/learning/saved-words` | Toggle save/unsave a word |
| GET | `/api/learning/srs/due` | Get SRS review queue |
| POST | `/api/learning/srs/review` | Submit SRS review |
| POST | `/api/ai/chat` | AI teacher chat |
| POST | `/api/ai/writing-coach` | Evaluate Chinese writing |
| GET | `/api/ai/writing-portfolio` | Get past submissions |
| GET | `/api/analytics` | User stats & charts data |
