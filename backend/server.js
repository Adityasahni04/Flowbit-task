const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const { login } = require("./routes/auth")
const { authMiddleware, requireAdmin } = require("./services/middleware")
const ticketsRouter = require("./routes/Ticket")
const webhookRouter = require("./routes/webhook")

require("dotenv").config()

async function main() {
  console.log("Starting server...")

  try {
    console.log("Connecting to MongoDB...")
    await mongoose.connect("mongodb://localhost:27017/flowbit-db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("✅ Connected to MongoDB")
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message)
    process.exit(1) // Exit if DB connection fails
  }

  const app = express()

  // CORS configuration
  app.use(
    cors({
      origin: "http://localhost:3000", // Frontend URL
      credentials: true,
    }),
  )

  app.use(express.json())

  // Logging middleware (optional)
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    next()
  })

  // Routes
  app.post("/auth/login", login)
  app.use("/tickets", authMiddleware, ticketsRouter)
  app.use("/webhook", webhookRouter)

  // Add /me/screens endpoint
  app.get("/me/screens", authMiddleware, (req, res) => {
    const { customerId } = req.user

    // Registry of screens per tenant (hardcoded as per requirements)
    const registry = {
      logistics: [
        {
          id: "tickets",
          name: "Support Tickets",
          url: "/tickets",
          icon: "ticket",
        },
      ],
      retail: [
        {
          id: "tickets",
          name: "Support Tickets",
          url: "/tickets",
          icon: "ticket",
        },
      ],
    }

    const screens = registry[customerId] || []
    res.json({ screens })
  })

  const PORT = 5000
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  })
}

main()
