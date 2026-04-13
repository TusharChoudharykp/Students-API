# 🎓 Students API

A production-ready REST API built using **Golang**, following clean architecture principles.
This project demonstrates backend fundamentals like **routing, validation, database integration, structured logging, and graceful shutdown**.

---

## 🚀 Features

* ✅ Create Student (POST API)
* ✅ Get All Students (GET API)
* ✅ Get Student by ID (GET API)
* ✅ Input Validation using `validator`
* ✅ JSON Response Handling (Custom Response Utility)
* ✅ SQLite Database Integration
* ✅ Structured Logging using `slog`
* ✅ Graceful Server Shutdown
* ✅ Clean Architecture (Handler → Storage → Types)

---

## 🏗️ Project Structure

```
Students-API/
│
├── cmd/student-api/        # Entry point (main.go)
├── internal/
│   ├── config/             # Config loader (cleanenv)
│   ├── http/
│   │   └── handlers/       # API handlers (students)
│   ├── storage/
│   │   └── Sqlite/         # DB logic
│   ├── types/              # Structs (Student)
│   └── utils/
│       └── response/       # JSON response helpers
│
├── config/
│   ├── local.yaml          # Local config (ignored)
│   └── example.yaml        # Sample config
│
├── storage/                # SQLite DB file
├── go.mod
└── README.md
```

---

## ⚙️ Tech Stack

* 🟦 Golang (net/http)
* 🗄️ SQLite
* 📦 cleanenv (config management)
* ✅ go-playground/validator (validation)
* 📊 slog (structured logging)

---

## 🔧 Setup & Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/TusharChoudharykp/Students-API.git
cd Students-API
```

---

### 2️⃣ Create config file

```bash
cp config/example.yaml config/local.yaml
```

Update `local.yaml`:


---

### 3️⃣ Install dependencies

```bash
go mod tidy
```

---

### 4️⃣ Run the server

```bash
go run ./cmd/student-api/main.go -config config/local.yaml
```

---

## 🌐 API Endpoints

### ➕ Create Student

```http
POST /api/students
```

#### Request Body:

```json
{
  "name": "Tushar",
  "age": 22,
  "email": "tushar@gmail.com"
}
```

---

### 📄 Get All Students

```http
GET /api/students
```

---

### 🔍 Get Student by ID

```http
GET /api/students/{id}
```

---

## ⚠️ Error Handling

Standard response format:

```json
{
  "status": "Error",
  "error": "error message"
}
```

---

## 🧠 Concepts Covered

* Dependency Injection
* Clean Architecture
* REST API Design
* JSON Encoding/Decoding
* Database Querying (SQL)
* Validation Middleware Logic
* Graceful Shutdown using Context

---

## 🛠️ Future Improvements

* 🔐 Authentication (JWT)
* 📄 Pagination & Filtering
* 🧪 Unit Testing
* 📦 Dockerization
* ☁️ Deployment (AWS / Kubernetes)

---

## 👨‍💻 Author

**Tushar Choudhary**

* 💼 Aspiring Backend & Blockchain Developer
* 🏆 SIH 2023 Winner
* ⚡ Passionate about scalable systems & DevOps

---

## ⭐ If you like this project

Give it a ⭐ on GitHub and feel free to contribute😊!

---
