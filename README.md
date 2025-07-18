# 🚀 Flowbit Multi-Tenant Support System

A complete multi-tenant support ticket management system with **React frontend**, **Node.js backend**, and **n8n workflow integration**.

---

## ⚡ Quick Start

### ✅ Prerequisites

* Node.js 18+
* Docker & Docker Compose
* MongoDB (or use Docker for it)

### 📥 1. Clone and Setup

```bash
git clone https://github.com/Adityasahni04/Flowbit-task
cd Flowbit-task
```

### 📦 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 🐳 3. Start with Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### 🛠️ 4. Manual Setup (Alternative)

```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Start Backend
cd backend
npm run dev

# Terminal 3: Start Frontend
cd frontend
npm run dev

# Terminal 4: Start n8n
npx n8n start
```

---

## 🔐 Demo Accounts

| Tenant      | Email                                             | Password |
| ----------- | ------------------------------------------------- | -------- |
| LogisticsCo | [admin@logistics.com](mailto:admin@logistics.com) | 123      |
| RetailGmbH  | [admin@retail.com](mailto:admin@retail.com)       | 123      |

---

## 📱 Features

* ✅ Multi-tenant authentication with JWT
* ✅ Tenant data isolation
* ✅ Dynamic tenant-specific navigation
* ✅ Real-time ticket status updates
* ✅ Seamless n8n workflow integration
* ✅ Responsive React frontend
* ✅ Full Docker containerization

---

## 📡 API Endpoints

* `POST /auth/login` – Authenticate user
* `GET /tickets` – Get tenant-specific tickets
* `POST /tickets` – Create a new support ticket
* `GET /me/screens` – Fetch navigation screens
* `POST /webhook/ticket-done` – Receive ticket update from n8n

---

## 🧪 Testing the Flow

1. Open [http://localhost:3000](http://localhost:3000)
2. Log in as `admin@logistics.com` / `123`
3. Create a new ticket
4. Watch status auto-update from **open** to **done** (via n8n)
5. Log in as `admin@retail.com` to confirm complete tenant isolation

---

## 🐳 Docker Services

| Service  | Description         | Port  |
| -------- | ------------------- | ----- |
| Frontend | React app           | 3000  |
| Backend  | Node.js REST API    | 5000  |
| MongoDB  | NoSQL database      | 27017 |
| n8n      | Workflow automation | 5678  |

---

## 🛠️ Troubleshooting

* 🔍 View logs:
  `docker-compose logs -f`

* ♻️ Restart services:
  `docker-compose restart`

* 🧹 Clean rebuild:
  `docker-compose down && docker-compose up --build`
