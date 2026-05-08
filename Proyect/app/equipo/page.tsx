"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { LoginModal } from "@/components/login-modal"
import { SectionCard } from "@/components/section-card"
import {
  Users,
  Home,
  ChevronRight,
  Code2,
  Network,
  Search,
  ShieldCheck,
  ExternalLink,
  Scale
} from "lucide-react"
import { Button } from "@/components/ui/button"

const teamMembers = [
  {
    name: "Miguel Vargas",
    role: "Responsable de Desarrollo",
    description: "Encargado del desarrollo e implementación de las funcionalidades de la plataforma.",
    icon: Code2,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    name: "Diego Avella",
    role: "Responsable de Arquitectura",
    description: "Diseño y estructuración de la arquitectura del sistema y la infraestructura tecnológica.",
    icon: Network,
    color: "bg-purple-500/10 text-purple-400",
  },
  {
    name: "Rafael Baracaldo",
    role: "Responsable de Investigación",
    description: "Investigación de metodologías, análisis de datos electorales y validación del modelo.",
    icon: Search,
    color: "bg-green-500/10 text-green-400",
  },
  {
    name: "Katalina Leiva",
    role: "Responsable de Gestión de Riesgos",
    description: "Identificación, evaluación y mitigación de riesgos del proyecto.",
    icon: ShieldCheck,
    color: "bg-orange-500/10 text-orange-400",
  },
]

export default function EquipoPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  const handleRegister = (name: string, email: string, password: string) => {
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  return (
    <div className="min-h-screen">
      <Navigation isLoggedIn={isLoggedIn} onLoginClick={() => setShowLogin(true)} />

      <LoginModal
        open={showLogin}
        onOpenChange={setShowLogin}
        onLogin={handleLogin}
        onRegister={handleRegister}
      />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="h-3.5 w-3.5" />
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Equipo</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm mb-4">
            <Users className="h-4 w-4 text-primary" />
            <span>Equipo de Trabajo</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Nuestro Equipo</h1>
          <p className="text-muted-foreground max-w-2xl">
            Conoce a los integrantes responsables del desarrollo, arquitectura,
            investigación y gestión del proyecto Electoral Analytics Colombia 2026.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {teamMembers.map((member) => {
            const Icon = member.icon
            return (
              <div
                key={member.name}
                className="rounded-xl border border-border bg-card p-6 flex items-start gap-4 hover:border-primary/40 transition-colors"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${member.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Marco Legal */}
        <SectionCard title="Marco Legal" icon={Scale}>
          <p className="text-sm text-muted-foreground mb-4">
            El proyecto se rige por un marco ético y legal que garantiza el uso
            responsable de los datos electorales, la privacidad de los ciudadanos
            y la transparencia en los análisis realizados.
          </p>
          <a
            href="/marco_etico_v4.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              Ver documento: marco_etico_v4
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-3">
            * Coloca el archivo <code className="bg-secondary px-1 rounded">marco_etico_v4.pdf</code> en la carpeta <code className="bg-secondary px-1 rounded">public/</code> del proyecto para que el botón lo abra correctamente.
          </p>
        </SectionCard>
      </main>
    </div>
  )
}
