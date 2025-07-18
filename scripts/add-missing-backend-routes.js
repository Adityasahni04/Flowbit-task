// This script adds the missing /me/screens endpoint to your backend
// Add this to your backend server.js file

const express = require("express")
const cors = require("cors")

const app = express()

// Declare authMiddleware variable or import it as per your setup
const authMiddleware = (req, res, next) => {
  // Example implementation of authMiddleware
  req.user = { customerId: "logistics" } // Replace with actual authentication logic
  next()
}

// Add this route to your server.js after the existing routes
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

app.use(
  cors({
    origin: "http://localhost:3000", // Your React app URL
    credentials: true,
  }),
)

console.log("✅ Added /me/screens endpoint and CORS configuration")
