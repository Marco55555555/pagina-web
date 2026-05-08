"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Database,
  FileText,
  Home,
  Brain,
  LogIn,
  User,
  Users,
  HeadphonesIcon
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/explicacion", label: "Explicación", icon: FileText },
  { href: "/datos", label: "Datos", icon: Database },
  { href: "/analisis", label: "Análisis", icon: BarChart3 },
  { href: "/modelo", label: "Modelo ML", icon: Brain },
  { href: "/equipo", label: "Equipo", icon: Users },
  { href: "/soporte", label: "Soporte", icon: HeadphonesIcon },
]

interface NavigationProps {
  isLoggedIn?: boolean
  onLoginClick?: () => void
}

export function Navigation({ isLoggedIn = false, onLoginClick }: NavigationProps) {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">Electoral Analytics</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <Button variant="ghost" size="sm" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Mi Cuenta</span>
            </Button>
          ) : (
            <Button onClick={onLoginClick} size="sm" className="gap-2">
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">Iniciar Sesión</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
