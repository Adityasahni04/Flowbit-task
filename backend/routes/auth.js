const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config() // Load .env

const users = [
  {
    email: "admin@logistics.com",
    password: bcrypt.hashSync("123", 10),
    role: "admin",
    customerId: "logistics",
  },
  {
    email: "admin@retail.com",
    password: bcrypt.hashSync("123", 10),
    role: "admin",
    customerId: "retail",
  },
]

module.exports = {
  login: (req, res) => {
    const { email, password } = req.body
    const u = users.find((u) => u.email === email)

    if (!u || !bcrypt.compareSync(password, u.password)) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign(
      {
        email: u.email,
        role: u.role,
        customerId: u.customerId,
      },
      process.env.JWT_SECRET, // 🔐 Use value from .env
      { expiresIn: "1h" },
    )

    res.json({ token })
  },
  users,
}
