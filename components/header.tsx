"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Bell, Settings } from "lucide-react"

export default function Header() {
  const { theme, setTheme } = useTheme()
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex h-16 items-center px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 font-medium">
          <img src="/placeholder-logo.svg" alt="Logo" className="h-9 w-9 animate-pulse-slow" />
          <span className="text-xl text-foreground">Nuance AI</span>
          <span className="text-xs bg-primary/15 text-primary px-2 py-0.5 rounded-md ml-1 animate-glow">
            Sentiment + Sarcasm
          </span>
        </div>
        <div className="ml-auto flex items-center gap-5">
          <Button 
            variant="outline" 
            size="sm"
            className="border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all duration-300"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">John</span>
            <img 
              src="/placeholder-user.jpg" 
              alt="User" 
              className="h-8 w-8 rounded-full border border-gray-200" 
            />
          </div>
        </div>
      </div>
    </header>
  )
}
