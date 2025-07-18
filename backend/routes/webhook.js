const express = require("express")
const Ticket = require("../models/Ticket")
const router = express.Router()

router.post("/ticket-done", async (req, res) => {
  // Log incoming request headers
  console.log("📩 Incoming /ticket-done request")
  console.log("🔐 Headers:", req.headers)

  // Log the shared secret check
  const secret = req.headers["x-secret"]
  console.log("🔑 Received secret:", secret)

  if (secret !== "flowbit123") {
    console.warn("❌ Unauthorized: Invalid secret")
    return res.sendStatus(403)
  }

  // Log body
  console.log("📦 Body:", req.body)

  const { ticketId } = req.body

  if (!ticketId) {
    console.error("⚠️ ticketId missing in request body")
    return res.status(400).json({ error: "ticketId is required" })
  }

  try {
    const result = await Ticket.findByIdAndUpdate(ticketId, { status: "done" }, { new: true })

    if (!result) {
      console.warn("⚠️ Ticket not found:", ticketId)
      return res.status(404).json({ error: "Ticket not found" })
    }

    console.log("✅ Ticket updated:", result)
    res.json({ updated: true, ticket: result })
  } catch (err) {
    console.error("💥 Error updating ticket:", err)
    res.status(500).json({ error: "Internal Server Error" })
  }
})

module.exports = router
