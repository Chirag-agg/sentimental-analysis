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
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="flex h-16 items-center px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 font-medium">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
            Nuance AI
          </span>
          <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">
            Sentiment + Sarcasm
          </span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="border-slate-300 hover:bg-slate-50 transition-all duration-300"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
            {theme === "dark" ? "Light" : "Dark"}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-300"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
            <span className="text-sm font-medium text-slate-700">John</span>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">J</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
