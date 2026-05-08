"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { LoginModal } from "@/components/login-modal"
import { SectionCard } from "@/components/section-card"
import { 
  FileText, 
  Target, 
  Database,
  Workflow,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Globe,
  MessageSquare,
  Vote
} from "lucide-react"

export default function ExplicacionPage() {
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

  const dataSources = [
    {
      name: "CNE - Consejo Nacional Electoral",
      type: "Oficial",
      description: "Encuestas registradas oficialmente con metodología transparente"
    },
    {
      name: "Redes Sociales (YouTube/X)",
      type: "Social",
      description: "Comentarios y sentimiento de usuarios en tiempo real"
    },
    {
      name: "Registraduría Nacional",
      type: "Histórico",
      description: "Resultados electorales históricos 2006-2022"
    },
    {
      name: "Encuestadoras (Invamer, CNC, AtlasIntel)",
      type: "Encuestas",
      description: "Intención de voto y análisis demográfico"
    }
  ]

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
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm mb-4">
            <FileText className="h-4 w-4 text-primary" />
            <span>Documentación</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Explicación del Proyecto</h1>
          <p className="text-muted-foreground max-w-2xl">
            Análisis y predicción de las elecciones presidenciales de Colombia 2026 
            utilizando técnicas de Machine Learning y procesamiento de datos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <SectionCard title="Objetivo del Proyecto" icon={Target}>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  Este proyecto tiene como objetivo desarrollar un modelo predictivo para 
                  las elecciones presidenciales de Colombia 2026, combinando múltiples 
                  fuentes de datos:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Análisis de sentimiento en redes sociales (YouTube, X/Twitter)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Agregación de encuestas con ponderación por calidad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Datos históricos de la Registraduría Nacional</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>Modelo de Deep Learning (LSTM/Transformer) para predicción</span>
                  </li>
                </ul>
              </div>
            </SectionCard>

            <SectionCard title="Metodología" icon={Workflow}>
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">1</span>
                    Ingesta de Datos
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Recolección automatizada de datos de la API de X, YouTube, y scraping 
                    de la Registraduría para datos electorales históricos.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">2</span>
                    Procesamiento y Limpieza
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Normalización de nombres, partidos y fechas. Eliminación de duplicados 
                    y tratamiento de valores faltantes.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">3</span>
                    Feature Engineering
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Creación de variables como tendencia de encuestas, volatilidad, 
                    sentimiento agregado y variables temporales.
                  </p>
                </div>

                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">4</span>
                    Modelo Predictivo
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Modelo LSTM/Transformer entrenado con datos históricos y features 
                    derivadas para predecir intención de voto y resultados.
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Consideraciones Importantes" icon={AlertTriangle}>
              <div className="space-y-3 text-sm">
                <div className="rounded-lg border border-border bg-destructive/10 p-3">
                  <p className="font-medium text-destructive-foreground mb-1">Sesgo Urbano en Encuestas</p>
                  <p className="text-muted-foreground">
                    Las encuestas colombianas tienden a sobrerrepresentar áreas urbanas 
                    (Bogotá, Medellín), subestimando el voto rural.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-destructive/10 p-3">
                  <p className="font-medium text-destructive-foreground mb-1">Votante Indeciso</p>
                  <p className="text-muted-foreground">
                    Los colombianos suelen decidir tarde. Las encuestas 2-3 semanas 
                    antes pueden fallar significativamente.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-destructive/10 p-3">
                  <p className="font-medium text-destructive-foreground mb-1">{"\"Shy Voter\" Effect"}</p>
                  <p className="text-muted-foreground">
                    En elecciones polarizadas, algunos votantes ocultan sus preferencias 
                    reales en las encuestas.
                  </p>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <SectionCard title="Fuentes de Datos" icon={Database}>
              <div className="space-y-3">
                {dataSources.map((source, idx) => (
                  <div key={idx} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{source.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {source.type}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{source.description}</p>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Candidatos Principales" icon={Vote}>
              <div className="space-y-2">
                {["Iván Cepeda", "Abelardo de la Espriella", "Paloma Valencia", "José Manuel Restrepo"].map((candidate, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-lg border border-border p-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                      {candidate.charAt(0)}
                    </div>
                    <span className="text-sm">{candidate}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Métricas del Proyecto" icon={BarChart3}>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border p-3 text-center">
                  <p className="text-2xl font-bold text-primary">1,272</p>
                  <p className="text-xs text-muted-foreground">Comentarios</p>
                </div>
                <div className="rounded-lg border border-border p-3 text-center">
                  <p className="text-2xl font-bold text-primary">5+</p>
                  <p className="text-xs text-muted-foreground">Encuestadoras</p>
                </div>
                <div className="rounded-lg border border-border p-3 text-center">
                  <p className="text-2xl font-bold text-primary">16</p>
                  <p className="text-xs text-muted-foreground">Años de datos</p>
                </div>
                <div className="rounded-lg border border-border p-3 text-center">
                  <p className="text-2xl font-bold text-primary">32</p>
                  <p className="text-xs text-muted-foreground">Departamentos</p>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  )
}
