const mongoose = require("mongoose")
const ticketSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: "open" },
  customerId: String,
})
module.exports = mongoose.model("Ticket", ticketSchema)
