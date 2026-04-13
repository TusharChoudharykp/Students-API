# 🎓 Students API (Full Stack + Dockerized)

A **production-ready full-stack application** built using:

* 🟦 **Golang (Backend API)**
* ⚛️ **React + Vite (Frontend)**
* 🐳 **Docker & Docker Compose**

This project follows **clean architecture principles** and demonstrates real-world backend + frontend integration with containerization.

---

## 🚀 Features

### 🔹 Backend (Golang)

* ✅ Create Student (POST API)
* ✅ Get All Students (GET API)
* ✅ Get Student by ID (GET API)
* ✅ Input Validation (`validator`)
* ✅ Structured Logging (`slog`)
* ✅ SQLite Database
* ✅ Graceful Shutdown
* ✅ Clean Architecture

### 🔹 Frontend (React + Vite)

* ✅ Fetch & display student data
* ✅ API integration with backend
* ✅ Modern UI setup with Vite

### 🔹 DevOps

* 🐳 Dockerized Backend & Frontend
* 🐳 Docker Compose for multi-service setup

---

## 🏗️ Project Structure

```
Students-API/
│
├── Backend/
│   ├── cmd/
│   │   └── student-api/
│   │       └── main.go              # Entry point
│   │
│   ├── config/
│   │   └── local.yaml              # Config file
│   │
│   ├── internal/
│   │   ├── http/
│   │   │   ├── handlers/
│   │   │   │   └── students/
│   │   │   │       └── student.go  # API handlers
│   │   │   └── middlewares/
│   │   │       └── cors.go         # CORS middleware
│   │   │
│   │   ├── storage/
│   │   │   └── sqlite/
│   │   │       ├── sqlite.go       # DB connection
│   │   │       └── storage.go      # Queries
│   │   │
│   │   ├── types/
│   │   │   └── types.go            # Structs
│   │   │
│   │   └── utils/
│   │       └── response/
│   │           └── response.go     # Response helpers
│   │
│   ├── storage/                   # SQLite DB file
│   ├── go.mod
│   └── go.sum
│
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── Dockerfile                     # Backend Dockerfile
├── docker-compose.yml             # Multi-container setup
├── .dockerignore
├── .gitignore
└── README.md
```

---

## ⚙️ Tech Stack

### Backend

* Golang (`net/http`)
* SQLite
* cleanenv
* validator
* slog

### Frontend

* React.js
* Vite
* JavaScript

### DevOps

* Docker
* Docker Compose

---

## 🔧 Setup & Installation

### 1️⃣ Clone Repo

```bash
git clone https://github.com/TusharChoudharykp/Students-API.git
cd Students-API
```

---

## ▶️ Run Backend Locally

```bash
cd Backend
go mod tidy
go run ./cmd/student-api/main.go -config config/local.yaml
```

---

## ▶️ Run Frontend Locally

```bash
cd Frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🐳 Run with Docker (Recommended)

### Run full stack using Docker Compose

```bash
docker-compose up --build
```

---

### Services:

* Backend → http://localhost:8080
* Frontend → http://localhost:5173

---

## 🌐 API Endpoints

### ➕ Create Student

```
POST /api/students
```

```json
{
  "name": "Tushar",
  "age": 22,
  "email": "tushar@gmail.com"
}
```

---

### 📄 Get All Students

```
GET /api/students
```

---

### 🔍 Get Student by ID

```
GET /api/students/{id}
```

---

## 🔗 Frontend ↔ Backend Connection

Frontend calls backend APIs like:

```javascript
fetch("http://localhost:8080/api/students")
```

---

## ⚠️ Error Handling

```json
{
  "status": "Error",
  "error": "error message"
}
```

---

## 🧠 Concepts Covered

* Clean Architecture (Handler → Storage → Types)
* REST API Development
* Full Stack Integration
* Dockerization
* Graceful Shutdown
* Validation & Error Handling

---

## 🛠️ Future Improvements

* 🔐 JWT Authentication
* 📄 Pagination & Filtering
* 🧪 Unit Testing
* 📦 CI/CD (GitHub Actions)
* ☁️ Deployment (AWS / Kubernetes)
* 🔍 Search functionality in frontend

---

## 👨‍💻 Author

**Tushar Choudhary**

* 🏆 SIH 2023 Winner
* 💼 Backend & Blockchain Developer
* ⚡ DevOps Enthusiast

---

## ⭐ Support

If you like this project:

👉 Star ⭐ the repo
👉 Fork & contribute

---
