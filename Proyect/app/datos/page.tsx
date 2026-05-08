"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { LoginModal } from "@/components/login-modal"
import { SectionCard } from "@/components/section-card"
import { DataTable } from "@/components/data-table"
import { StatsCard } from "@/components/stats-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  MessageSquare,
  BarChart3,
  FileSpreadsheet,
  Calendar,
  Users,
  ThumbsUp,
  Home,
  ChevronRight,
  Loader2,
} from "lucide-react"

const youtubeData = [
  { id: 1, date: "1/05/2026", text: "FIRMES POR LA PATRIA", username: "@marthafernandez940", likes: 11, views: 933, video_title: "Elecciones Colombia 2026: ¿empate técnico?" },
  { id: 2, date: "1/05/2026", text: "Nunca he votado, estas elecciones si voy a votar", username: "@Alen.R-Kick", likes: 8, views: 933, video_title: "Elecciones Colombia 2026: ¿empate técnico?" },
  { id: 3, date: "1/05/2026", text: "ABELARDO PRESIDENTE EN PRIMERA VUELTA", username: "@dariobuitrago2454", likes: 6, views: 933, video_title: "Elecciones Colombia 2026: ¿empate técnico?" },
  { id: 4, date: "1/05/2026", text: "Esas encuestas distraen al ciudadano", username: "@franciscojose", likes: 2, views: 933, video_title: "Encuestas presidenciales 2026" },
  { id: 5, date: "1/05/2026", text: "Cepeda no será presidente", username: "@mcms5985", likes: 2, views: 6127, video_title: "Encuestas presidenciales 2026" },
  { id: 6, date: "1/05/2026", text: "Apoyo total a otro Gobierno Progresista", username: "@wilsonmeneses1603", likes: 0, views: 6127, video_title: "Encuestas presidenciales 2026" },
  { id: 7, date: "1/05/2026", text: "Ya están advertidos tanto Petro como Cepeda", username: "@a652ww", likes: 19, views: 36151, video_title: "Elecciones 2026, bajo supervisión de EE.UU." },
  { id: 8, date: "1/05/2026", text: "Que estados unidos nos apoye donde obliga la guerrilla", username: "@yiveclaro3987", likes: 10, views: 36151, video_title: "Elecciones 2026, bajo supervisión de EE.UU." },
]

const historicalData = [
  { year: 2022, winner: "Gustavo Petro", party: "Pacto Histórico", votes: 11281013, percentage: 50.44 },
  { year: 2018, winner: "Iván Duque", party: "Centro Democrático", votes: 10373080, percentage: 53.98 },
  { year: 2014, winner: "Juan Manuel Santos", party: "Unidad Nacional", votes: 7839342, percentage: 50.95 },
  { year: 2010, winner: "Juan Manuel Santos", party: "Partido de la U", votes: 9028943, percentage: 69.13 },
  { year: 2006, winner: "Álvaro Uribe", party: "Primero Colombia", votes: 7397835, percentage: 62.35 },
]

function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split("\n")
  const headers = lines[0].split(",").map((h) => h.trim())
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim())
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]))
  })
}

export default function DatosPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [csvData, setCsvData] = useState<Record<string, string>[]>([])
  const [csvLoading, setCsvLoading] = useState(true)

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  const handleRegister = (name: string, email: string, password: string) => {
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  useEffect(() => {
    fetch("/data/datos_electorales_limpios.csv")
      .then((res) => res.text())
      .then((text) => {
        setCsvData(parseCSV(text))
        setCsvLoading(false)
      })
      .catch(() => setCsvLoading(false))
  }, [])

  const youtubeColumns = [
    { key: "date", label: "Fecha", type: "date" as const },
    { key: "username", label: "Usuario", type: "text" as const },
    { key: "text", label: "Comentario", type: "text" as const },
    { key: "likes", label: "Likes", type: "number" as const },
    { key: "views", label: "Views", type: "number" as const },
  ]

  const electoralColumns = [
    { key: "fecha", label: "Fecha", type: "date" as const },
    { key: "candidato", label: "Candidato", type: "text" as const },
    { key: "encuestadora", label: "Encuestadora", type: "badge" as const },
    { key: "intencion_voto", label: "Intención %", type: "number" as const },
    { key: "tamano_muestra", label: "Muestra", type: "number" as const },
    { key: "margen_error", label: "Margen Error", type: "number" as const },
    { key: "calidad", label: "Calidad", type: "badge" as const },
    { key: "departamento", label: "Departamento", type: "text" as const },
    { key: "sentimiento_redes", label: "Sentimiento", type: "number" as const },
    { key: "menciones_youtube", label: "YT", type: "number" as const },
    { key: "menciones_twitter", label: "Twitter", type: "number" as const },
  ]

  const historicalColumns = [
    { key: "year", label: "Año", type: "number" as const },
    { key: "winner", label: "Ganador", type: "text" as const },
    { key: "party", label: "Partido", type: "badge" as const },
    { key: "votes", label: "Votos", type: "number" as const },
    { key: "percentage", label: "%", type: "number" as const },
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
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="h-3.5 w-3.5" />
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Datos</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm mb-4">
            <Database className="h-4 w-4 text-primary" />
            <span>Datasets</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Visualización de Datos</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explora los diferentes datasets utilizados en el análisis electoral:
            comentarios de redes sociales, datos electorales limpios y resultados históricos.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Comentarios YouTube"
            value="1,272"
            icon={MessageSquare}
          />
          <StatsCard
            title="Registros Electorales"
            value={csvLoading ? "..." : String(csvData.length)}
            icon={BarChart3}
          />
          <StatsCard
            title="Elecciones Históricas"
            value="5"
            icon={Calendar}
          />
          <StatsCard
            title="Candidatos Rastreados"
            value="4"
            icon={Users}
          />
        </div>

        {/* Data Tabs */}
        <Tabs defaultValue="electoral" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="electoral" className="gap-2">
              <FileSpreadsheet className="h-4 w-4" />
              Datos Electorales Limpios
            </TabsTrigger>
            <TabsTrigger value="youtube" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Redes Sociales
            </TabsTrigger>
            <TabsTrigger value="historical" className="gap-2">
              <Calendar className="h-4 w-4" />
              Histórico
            </TabsTrigger>
          </TabsList>

          {/* Tab: Datos Electorales Limpios (CSV) */}
          <TabsContent value="electoral">
            <SectionCard
              title="Datos Electorales Limpios"
              description="datos_electorales_limpios.csv — encuestas, sentimiento y menciones por candidato"
              icon={FileSpreadsheet}
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Archivo: datos_electorales_limpios.csv</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {csvLoading ? "Cargando..." : `${csvData.length} registros`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">3 encuestadoras — Invamer, CNC, AtlasIntel</span>
                  </div>
                </div>

                {csvLoading ? (
                  <div className="flex items-center justify-center py-12 text-muted-foreground gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Cargando datos del CSV...</span>
                  </div>
                ) : csvData.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground text-sm">
                    No se encontró el archivo. Asegúrate de que{" "}
                    <code className="bg-secondary px-1 rounded">public/data/datos_electorales_limpios.csv</code> existe.
                  </div>
                ) : (
                  <DataTable
                    data={csvData}
                    columns={electoralColumns}
                    maxRows={csvData.length}
                  />
                )}
              </div>
            </SectionCard>
          </TabsContent>

          {/* Tab: Redes Sociales */}
          <TabsContent value="youtube">
            <SectionCard
              title="Comentarios de YouTube"
              description="Datos de comentarios sobre elecciones Colombia 2026"
              icon={MessageSquare}
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Formato: CSV</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">1,272 registros</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Mayo 2026</span>
                  </div>
                </div>
                <DataTable
                  data={youtubeData}
                  columns={youtubeColumns}
                  maxRows={8}
                />
              </div>
            </SectionCard>
          </TabsContent>

          {/* Tab: Histórico */}
          <TabsContent value="historical">
            <SectionCard
              title="Resultados Históricos"
              description="Elecciones presidenciales 2006-2022"
              icon={Calendar}
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Fuente: Registraduría Nacional</span>
                  </div>
                </div>
                <DataTable
                  data={historicalData}
                  columns={historicalColumns}
                  maxRows={10}
                />
              </div>
            </SectionCard>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
