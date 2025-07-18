
# 🚀 Flowbit Multi-Tenant Support System

A complete multi-tenant support ticket management system with **React frontend**, **Node.js backend**, and **n8n workflow automation**.

---

## ⚡ Quick Start

### ✅ Prerequisites

* Node.js 18+
* Docker & Docker Compose
* MongoDB (or use Docker for it)

---

## 📥 1. Clone and Setup

```bash
git clone https://github.com/Adityasahni04/Flowbit-task
cd Flowbit-task
````

---

## 📦 2. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

---

## 🐳 3. Start with Docker (Recommended)

```bash
docker-compose up -d
```

> 📝 Once the services are running, you can proceed to configure **n8n**.

---

## 🔁 4. Configure n8n Webhook

1. Open the n8n editor UI: [http://localhost:5678](http://localhost:5678)

2. **Create a new workflow** with the following setup:

   ### 🧩 Webhook Node:

   * **HTTP Method:** `POST`
   * **Path:** `ticket-trigger`
   * **Authentication:** None
   * **Respond:** Immediately

   ### 🔗 HTTP Request Node:

   * **Method:** `POST`
   * **URL:** `http://backend:5000/webhook/ticket-done`
   * **Headers:**

     * `x-secret: flowbit123`
   * **Body Content Type:** JSON
   * **JSON Body:**

     ```json
     {
        "ticketId": "{{ $json.body.ticketId }}",
        "status": "done"
     }
     ```

3. Connect the Webhook → HTTP Request, **activate the workflow**, and save.

---


## 📱 Features

* ✅ Multi-tenant authentication with JWT
* ✅ Tenant data isolation
* ✅ Real-time ticket status updates via n8n
* ✅ Seamless webhook handling
* ✅ Full Docker containerization
* ✅ Responsive React frontend

---

## 🧪 Testing the Flow

1. Visit [http://localhost:3000](http://localhost:3000)
2. Log in as `admin@logistics.com` / `123`
3. Create a new ticket
4. Ticket is sent to `http://localhost:5678/webhook/ticket-trigger`
5. n8n workflow calls `http://backend:5000/webhook/ticket-done`
6. Ticket status updates to **done** ✅

---

## 🐳 Docker Services

| Service  | Description         | Port  |
| -------- | ------------------- | ----- |
| Frontend | React app           | 3000  |
| Backend  | Node.js REST API    | 5000  |
| MongoDB  | NoSQL database      | 27017 |
| n8n      | Workflow automation | 5678  |

---

## 🧰 Troubleshooting

* 🔍 Logs: `docker-compose logs -f`
* ♻️ Restart: `docker-compose restart`
* 🧹 Clean rebuild: `docker-compose down && docker-compose up --build`
