"use client"

import { useEffect, useState } from "react"
import { LoginForm } from "@/components/login-form"
import { Dashboard } from "@/components/dashboard"

interface User {
  email: string
  role: string
  customerId: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        setUser({
          email: payload.email,
          role: payload.role,
          customerId: payload.customerId,
        })
      } catch (error) {
        localStorage.removeItem("token")
      }
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData: User) => {
    setUser(userData)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {user ? <Dashboard user={user} onLogout={handleLogout} /> : <LoginForm onLogin={handleLogin} />}
    </div>
  )
}
