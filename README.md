# 🧠 Smart Resume Analyzer & Job Recommender

An intelligent web application that analyzes resumes using NLP and AI to recommend the most suitable jobs. Users can upload resumes, view extracted insights, and receive job recommendations based on their skills and experience.

---

## 📸 Screenshots

> Add screenshots here after running the app locally.

| Landing Page | Dashboard | Job Recommendations |
|---|---|---|
| ![Landing](<img width="1893" height="905" alt="image" src="https://github.com/user-attachments/assets/2e0c187b-0e34-4e73-808a-56f245f17b16" /> ) | ![Dashboard](<img width="1597" height="763" alt="image" src="https://github.com/user-attachments/assets/f9d94cd8-600a-457e-91c8-36f0ed307ebc" /> ) | 

*To add screenshots: create a `screenshots/` folder in the project root and drop your images there.*

---

## 🚀 Features

- 📄 **Resume Upload & Parsing**
  - Upload PDF resumes
  - Extracts skills, experience, education using AI (NLP)
- 🤖 **AI-Powered Job Recommendations**
  - Matches resume content to relevant job descriptions
  - Uses semantic similarity (embeddings + cosine similarity)
- 🧠 **NLP Skill Extraction**
  - Named Entity Recognition (NER) for identifying key skills and fields
- 🔍 **Job Search & Filtering**
  - Browse and filter jobs by skill, role, or match score
- 🧾 **Resume Summary Viewer**
  - See a parsed summary of your uploaded resume
- 💡 **Match Score Calculation**
  - Display how well each job matches your profile (visual score)
- 🧑‍💻 **User Authentication**
  - Sign up / Log in to manage resumes and recommendations
- 🌐 **RESTful API Integration**
  - Secure endpoints to handle resume uploads, user profiles, and job fetching
- 📈 **Scalable & Extensible**
  - Designed for easy integration with external job APIs and AI microservices

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React + TypeScript + Vite + TailwindCSS + shadcn/ui |
| Backend | Node.js + Express.js |
| Database | MongoDB (Atlas) |
| NLP | Python + FastAPI + spaCy + sentence-transformers |
| Auth | JWT (JSON Web Tokens) |

---

## 📁 Project Structure

```
smart-match-jobs/
├── backend/                  # Node.js Express API
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── python/               # Python NLP microservice
│   │   ├── nlp_server.py
│   │   └── requirements.txt
│   ├── routes/
│   ├── services/
│   ├── .env
│   └── server.js
├── src/                      # React frontend
│   ├── components/
│   ├── context/
│   ├── lib/
│   ├── pages/
│   └── types/
├── public/
├── .env                      # Frontend env
└── index.html
```

---

## ⚙️ Setup & Installation

### Prerequisites

- Node.js v18+
- Python 3.10
- MongoDB Atlas account

---

### 1. Clone the repository

```bash
git clone https://github.com/utshobbose/SmartAnalyzer.git
cd SmartAnalyzer
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `backend/.env`:

```dotenv
MONGO_USER=your_mongo_user
MONGO_PASSWORD=your_mongo_password
JWT_SECRET=your_jwt_secret
PORT=5000
FRONTEND_URL=http://localhost:8080
NLP_SERVICE_URL=http://localhost:8000
```

Start the backend:

```bash
npm run server
```

Backend runs on → `http://localhost:5000`

---

### 3. Python NLP Service Setup

```bash
cd backend/python

# Create virtual environment with Python 3.10
py -3.10 -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux

pip install -r requirements.txt

# Install spaCy language model
pip install https://github.com/explosion/spacy-models/releases/download/en_core_web_sm-3.7.1/en_core_web_sm-3.7.1-py3-none-any.whl

# Start the NLP server
uvicorn nlp_server:app --host 0.0.0.0 --port 8000
```

NLP service runs on → `http://localhost:8000`

---

### 4. Frontend Setup

```bash
# From project root
npm install
```

Create `.env` in project root:

```dotenv
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Frontend runs on → `http://localhost:8080`

---

## 🖥️ Running the Full App

You need **3 terminals running simultaneously**:

| Terminal | Directory | Command | Port |
|---|---|---|---|
| Backend | `backend/` | `npm run server` | 5000 |
| NLP Service | `backend/python/` | `uvicorn nlp_server:app --port 8000` | 8000 |
| Frontend | project root | `npm run dev` | 8080 |

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (auth required) |

### Resume
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/resume/upload` | Upload PDF resume (auth required) |
| GET | `/api/resume/` | List user's resumes (auth required) |
| GET | `/api/resume/:id` | Get resume by ID (auth required) |
| DELETE | `/api/resume/:id` | Delete resume (auth required) |

### Analyze
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/analyze/:resumeId` | Get job recommendations for resume (auth required) |

### Jobs
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/jobs` | List all jobs (filter by `skill`, `role`) |
| GET | `/api/jobs/:id` | Get job by ID |
| POST | `/api/jobs` | Seed a job with embedding (auth required) |

---

## 🌍 Environment Variables

### `backend/.env`
| Variable | Description |
|---|---|
| `MONGO_USER` | MongoDB Atlas username |
| `MONGO_PASSWORD` | MongoDB Atlas password |
| `JWT_SECRET` | Secret key for JWT signing |
| `PORT` | Backend port (default: 5000) |
| `FRONTEND_URL` | Frontend origin for CORS |
| `NLP_SERVICE_URL` | Python NLP service URL |

### `.env` (frontend root)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

---

## 👤 Author

**Utshob Bose** — [github.com/utshobbose](https://github.com/utshobbose)  
Mayhem Softwares Bangladesh
