"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { LoginModal } from "@/components/login-modal"
import { StatsCard } from "@/components/stats-card"
import { SectionCard } from "@/components/section-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  BarChart3, 
  Database, 
  Brain, 
  FileText,
  ArrowRight,
  Users,
  MessageSquare,
  TrendingUp,
  Vote
} from "lucide-react"

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = (email: string, password: string) => {
    console.log("[v0] Login attempt:", email)
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  const handleRegister = (name: string, email: string, password: string) => {
    console.log("[v0] Register attempt:", name, email)
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

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm mb-6">
              <Vote className="h-4 w-4 text-primary" />
              <span>Elecciones Colombia 2026</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
              Análisis Electoral con{" "}
              <span className="text-primary">Machine Learning</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Plataforma de análisis de datos electorales y predicción de resultados 
              utilizando técnicas avanzadas de Machine Learning y procesamiento de 
              datos de redes sociales.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/explicacion">
                <Button size="lg" className="gap-2">
                  Comenzar <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/datos">
                <Button variant="outline" size="lg" className="gap-2">
                  <Database className="h-4 w-4" />
                  Ver Datos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Comentarios Analizados"
            value="1,272+"
            change={12.5}
            icon={MessageSquare}
            description="Última semana"
          />
          <StatsCard
            title="Candidatos Rastreados"
            value="5"
            icon={Users}
          />
          <StatsCard
            title="Precisión del Modelo"
            value="87.3%"
            change={2.1}
            icon={Brain}
            description="vs. modelo anterior"
          />
          <StatsCard
            title="Tendencia Electoral"
            value="+4.2%"
            icon={TrendingUp}
            description="Variación semanal"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Módulos de la Plataforma</h2>
          <p className="text-muted-foreground">
            Explora cada sección para entender el análisis electoral completo.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/explicacion" className="block group">
            <SectionCard
              title="Explicación del Proyecto"
              description="Metodología y objetivos"
              icon={FileText}
              className="h-full transition-all group-hover:border-primary/50"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Conoce la metodología, fuentes de datos y objetivos del análisis 
                electoral para las elecciones Colombia 2026.
              </p>
              <div className="flex items-center text-sm text-primary">
                Leer más <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </SectionCard>
          </Link>

          <Link href="/datos" className="block group">
            <SectionCard
              title="Visualización de Datos"
              description="Datos crudos y procesados"
              icon={Database}
              className="h-full transition-all group-hover:border-primary/50"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Explora los datasets utilizados: encuestas, datos de redes sociales 
                y resultados históricos de la Registraduría.
              </p>
              <div className="flex items-center text-sm text-primary">
                Ver datos <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </SectionCard>
          </Link>

          <Link href="/analisis" className="block group">
            <SectionCard
              title="Análisis de Datos"
              description="Estadísticas y visualizaciones"
              icon={BarChart3}
              className="h-full transition-all group-hover:border-primary/50"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Análisis de sentimiento, tendencias temporales y correlaciones 
                entre variables electorales.
              </p>
              <div className="flex items-center text-sm text-primary">
                Ver análisis <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </SectionCard>
          </Link>

          <Link href="/modelo" className="block group">
            <SectionCard
              title="Modelo de Machine Learning"
              description="Predicciones y métricas"
              icon={Brain}
              className="h-full transition-all group-hover:border-primary/50"
            >
              <p className="text-sm text-muted-foreground mb-4">
                Modelo predictivo basado en Deep Learning para estimar 
                intención de voto y resultados electorales.
              </p>
              <div className="flex items-center text-sm text-primary">
                Ver modelo <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </SectionCard>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BarChart3 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">Electoral Analytics Colombia 2026</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Proyecto de análisis electoral con Machine Learning
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
