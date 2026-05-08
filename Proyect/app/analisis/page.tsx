"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { LoginModal } from "@/components/login-modal"
import { SectionCard } from "@/components/section-card"
import { StatsCard } from "@/components/stats-card"
import { 
  BarChart3, 
  TrendingUp,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Minus,
  PieChart,
  Activity
} from "lucide-react"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Cell,
  Pie,
  PieChart as RePieChart
} from "recharts"

const candidateData = [
  { name: "Iván Cepeda", mentions: 450, positive: 180, negative: 150, neutral: 120, color: "#7c3aed" },
  { name: "Abelardo", mentions: 380, positive: 200, negative: 80, neutral: 100, color: "#22c55e" },
  { name: "Paloma Valencia", mentions: 220, positive: 90, negative: 70, neutral: 60, color: "#f59e0b" },
  { name: "J.M. Restrepo", mentions: 120, positive: 50, negative: 30, neutral: 40, color: "#ec4899" },
]

const timeSeriesData = [
  { date: "Ene", cepeda: 25, abelardo: 20, paloma: 18 },
  { date: "Feb", cepeda: 26, abelardo: 22, paloma: 19 },
  { date: "Mar", cepeda: 27, abelardo: 23, paloma: 21 },
  { date: "Abr", cepeda: 28, abelardo: 25, paloma: 22 },
  { date: "May", cepeda: 29, abelardo: 26, paloma: 22 },
]

const sentimentData = [
  { name: "Positivo", value: 520, color: "#22c55e" },
  { name: "Negativo", value: 330, color: "#ef4444" },
  { name: "Neutral", value: 422, color: "#6b7280" },
]

const engagementData = [
  { video: "Elecciones 2026...", comments: 89, likes: 933, engagement: 8.2 },
  { video: "Encuestas Abril", comments: 156, likes: 6127, engagement: 12.4 },
  { video: "Supervisión EE.UU.", comments: 245, likes: 36151, engagement: 15.8 },
  { video: "Debate Candidatos", comments: 312, likes: 28450, engagement: 18.2 },
]

export default function AnalisisPage() {
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
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm mb-4">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span>Analytics</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Análisis de Datos</h1>
          <p className="text-muted-foreground max-w-2xl">
            Visualización de tendencias, análisis de sentimiento y métricas 
            de engagement de la conversación electoral.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Sentimiento Promedio"
            value="54.2%"
            change={3.5}
            icon={ThumbsUp}
            description="Positivo"
          />
          <StatsCard
            title="Menciones Totales"
            value="1,170"
            change={12.8}
            icon={MessageSquare}
            description="Última semana"
          />
          <StatsCard
            title="Engagement Rate"
            value="13.6%"
            change={-2.1}
            icon={Activity}
            description="Promedio"
          />
          <StatsCard
            title="Tendencia Principal"
            value="Cepeda"
            icon={TrendingUp}
            description="Líder en menciones"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Mentions by Candidate */}
          <SectionCard 
            title="Menciones por Candidato" 
            description="Total de menciones en redes sociales"
            icon={BarChart3}
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={candidateData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={100} 
                    stroke="var(--muted-foreground)" 
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--card)", 
                      border: "1px solid var(--border)",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="mentions" radius={[0, 4, 4, 0]}>
                    {candidateData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          {/* Sentiment Distribution */}
          <SectionCard 
            title="Distribución de Sentimiento" 
            description="Análisis de sentimiento global"
            icon={PieChart}
          >
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--card)", 
                      border: "1px solid var(--border)",
                      borderRadius: "8px"
                    }}
                  />
                  <Legend />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-accent">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="font-bold">520</span>
                </div>
                <p className="text-xs text-muted-foreground">Positivos</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-destructive">
                  <ThumbsDown className="h-4 w-4" />
                  <span className="font-bold">330</span>
                </div>
                <p className="text-xs text-muted-foreground">Negativos</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                  <Minus className="h-4 w-4" />
                  <span className="font-bold">422</span>
                </div>
                <p className="text-xs text-muted-foreground">Neutrales</p>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Trend Over Time */}
        <SectionCard 
          title="Tendencia de Intención de Voto" 
          description="Evolución mensual según agregación de encuestas"
          icon={TrendingUp}
          className="mb-6"
        >
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="date" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[15, 35]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)", 
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="cepeda" 
                  name="Iván Cepeda"
                  stroke="#7c3aed" 
                  strokeWidth={2}
                  dot={{ fill: "#7c3aed" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="abelardo" 
                  name="Abelardo"
                  stroke="#22c55e" 
                  strokeWidth={2}
                  dot={{ fill: "#22c55e" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="paloma" 
                  name="Paloma Valencia"
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ fill: "#f59e0b" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        {/* Sentiment by Candidate */}
        <SectionCard 
          title="Sentimiento por Candidato" 
          description="Desglose de sentimiento positivo, negativo y neutral"
          icon={Activity}
        >
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={candidateData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)", 
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                />
                <Legend />
                <Bar dataKey="positive" name="Positivo" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
                <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#6b7280" radius={[0, 0, 0, 0]} />
                <Bar dataKey="negative" name="Negativo" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </main>
    </div>
  )
}
