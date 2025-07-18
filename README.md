# Flowbit Multi-Tenant Support System

A complete multi-tenant support ticket management system with React frontend, Node.js backend, and n8n workflow integration.

## 🏗️ Architecture

\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │  Node.js Backend │    │     MongoDB     │
│   (Port 3000)   │◄──►│   (Port 5000)   │◄──►│   (Port 27017)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         │              ┌─────────────────┐
         └──────────────►│      n8n        │
                        │   (Port 5678)   │
                        └─────────────────┘
\`\`\`

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- MongoDB (or use Docker)

### 1. Clone and Setup
\`\`\`bash
git clone <your-repo>
cd flowbit-system
\`\`\`

### 2. Install Dependencies
\`\`\`bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
\`\`\`

### 3. Start with Docker (Recommended)
\`\`\`bash
# Start all services
docker-compose up -d

# Check logs
docker-compose logs -f
\`\`\`

### 4. Manual Setup (Alternative)
\`\`\`bash
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
\`\`\`

## 🔐 Demo Accounts

- **LogisticsCo**: admin@logistics.com / 123
- **RetailGmbH**: admin@retail.com / 123

## 📱 Features

- ✅ Multi-tenant authentication with JWT
- ✅ Tenant data isolation
- ✅ Dynamic navigation per tenant
- ✅ Real-time ticket status updates
- ✅ n8n workflow integration
- ✅ Responsive React UI
- ✅ Docker containerization

## 🔧 API Endpoints

- `POST /auth/login` - User authentication
- `GET /tickets` - Get tenant tickets
- `POST /tickets` - Create new ticket
- `GET /me/screens` - Get tenant navigation
- `POST /webhook/ticket-done` - n8n callback

## 🎯 Testing the Flow

1. Visit http://localhost:3000
2. Login as admin@logistics.com / 123
3. Create a new ticket
4. Watch status change from 'open' to 'done' (via n8n)
5. Login as admin@retail.com / 123 to verify tenant isolation

## 🐳 Docker Services

- **Frontend**: React app on port 3000
- **Backend**: Node.js API on port 5000
- **MongoDB**: Database on port 27017
- **n8n**: Workflow engine on port 5678

## 🔍 Troubleshooting

- Check Docker logs: `docker-compose logs -f`
- Restart services: `docker-compose restart`
- Clean rebuild: `docker-compose down && docker-compose up --build`
