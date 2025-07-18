const express = require("express")
const router = express.Router()
const Ticket = require("../models/Ticket")
const axios = require("axios") // ✅ using axios

// POST / - Create a new ticket
router.post("/", async (req, res) => {
  console.log("📩 [POST /tickets] Ticket creation request received")

  // Check for authenticated user
  if (!req.user || !req.user.customerId) {
    console.warn("⛔ Unauthorized request – Missing user info")
    return res.status(401).json({ error: "Unauthorized: Missing user info" })
  }

  try {
    const { title } = req.body

    if (!title) {
      console.warn("⚠️ Ticket title missing in request body")
      return res.status(400).json({ error: "Ticket title is required" })
    }

    console.log(`📝 Creating ticket with title: "${title}" for customerId: ${req.user.customerId}`)

    const ticket = await Ticket.create({
      title,
      customerId: req.user.customerId,
    })

    console.log(`✅ Ticket successfully created with ID: ${ticket._id}`)

    // n8n webhook integration
    const webhookUrl = "http://localhost:5678/webhook/ticket-trigger"
    const webhookPayload = {
      ticketId: ticket._id.toString(),
      customerId: req.user.customerId,
    }

    console.log(`📤 Sending data to n8n webhook at ${webhookUrl}`)
    try {
      const response = await axios.post(webhookUrl, webhookPayload, {
        headers: { "Content-Type": "application/json" },
      })

      console.log(`✅ Successfully triggered n8n workflow - Status: ${response.status}`)
    } catch (n8nErr) {
      console.error("⚠️ Failed to notify n8n:", n8nErr.message)
    }

    res.status(201).json(ticket)
  } catch (err) {
    console.error("❌ Error while creating ticket:", err.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

// GET / - Get all tickets for the logged-in customer
router.get("/", async (req, res) => {
  const customerId = req.user?.customerId
  console.log(`📥 [GET /tickets] Request for customerId: ${customerId}`)

  if (!customerId) {
    console.warn("⛔ Unauthorized request – Missing customerId")
    return res.status(401).json({ error: "Unauthorized: Missing user info" })
  }

  try {
    const tickets = await Ticket.find({ customerId })
    console.log(`📦 Retrieved ${tickets.length} ticket(s)`)
    res.json(tickets)
  } catch (err) {
    console.error("❌ Failed to fetch tickets:", err.message)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

module.exports = router
