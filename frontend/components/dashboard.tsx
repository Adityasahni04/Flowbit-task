"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SupportTicketsApp } from "@/components/support-tickets-app"
import { LogOut, Ticket, Building } from "lucide-react"

interface Screen {
  id: string
  name: string
  url: string
  icon: string
}

interface DashboardProps {
  user: any
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [screens, setScreens] = useState<Screen[]>([])
  const [activeScreen, setActiveScreen] = useState<string>("tickets")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchScreens()
  }, [])

  const fetchScreens = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:5000/me/screens", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setScreens(data.screens || [])
      } else {
        // Fallback to hardcoded screens if endpoint doesn't exist
        setScreens([
          {
            id: "tickets",
            name: "Support Tickets",
            url: "/tickets",
            icon: "ticket",
          },
        ])
      }
    } catch (error) {
      console.error("Failed to fetch screens:", error)
      // Fallback screens
      setScreens([
        {
          id: "tickets",
          name: "Support Tickets",
          url: "/tickets",
          icon: "ticket",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const getTenantDisplayName = (customerId: string) => {
    switch (customerId) {
      case "logistics":
        return "LogisticsCo"
      case "retail":
        return "RetailGmbH"
      default:
        return customerId
    }
  }

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case "tickets":
        return <SupportTicketsApp user={user} />
      default:
        return <div className="p-6">Screen not found</div>
    }
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
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center space-x-4">
            <Building className="h-6 w-6" />
            <h1 className="text-xl font-semibold">Flowbit</h1>
            <Badge variant="secondary">{getTenantDisplayName(user.customerId)}</Badge>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Ticket className="h-4 w-4" />
              <span className="text-sm">{user.email}</span>
              <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-card min-h-[calc(100vh-4rem)]">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Navigation</h2>
            <nav className="space-y-2">
              {screens.map((screen) => (
                <Button
                  key={screen.id}
                  variant={activeScreen === screen.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveScreen(screen.id)}
                >
                  <Ticket className="h-4 w-4 mr-2" />
                  {screen.name}
                </Button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">{renderActiveScreen()}</main>
      </div>
    </div>
  )
}
