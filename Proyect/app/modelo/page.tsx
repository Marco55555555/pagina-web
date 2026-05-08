"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { LoginModal } from "@/components/login-modal"
import { SectionCard } from "@/components/section-card"
import { StatsCard } from "@/components/stats-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  Cpu,
  Zap,
  Target,
  AlertCircle,
  CheckCircle,
  PlayCircle,
  BarChart3,
  TrendingUp,
  Layers,
  Database
} from "lucide-react"
import {
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell
} from "recharts"

const predictionData = [
  { candidate: "Iván Cepeda", prediction: 28.5, confidence: 85, color: "#7c3aed" },
  { candidate: "Abelardo", prediction: 25.8, confidence: 82, color: "#22c55e" },
  { candidate: "Paloma Valencia", prediction: 22.1, confidence: 78, color: "#f59e0b" },
  { candidate: "J.M. Restrepo", prediction: 12.4, confidence: 72, color: "#ec4899" },
  { candidate: "Otros", prediction: 11.2, confidence: 65, color: "#6b7280" },
]

const modelMetrics = [
  { metric: "Accuracy", value: 87.3, benchmark: 75 },
  { metric: "Precision", value: 84.2, benchmark: 70 },
  { metric: "Recall", value: 82.8, benchmark: 70 },
  { metric: "F1 Score", value: 83.5, benchmark: 72 },
  { metric: "AUC-ROC", value: 91.2, benchmark: 80 },
]

const featureImportance = [
  { feature: "Poll Trend (7d)", importance: 0.28 },
  { feature: "Social Sentiment", importance: 0.22 },
  { feature: "Historical Vote", importance: 0.18 },
  { feature: "Poll Volatility", importance: 0.12 },
  { feature: "Days to Election", importance: 0.10 },
  { feature: "Sample Size", importance: 0.06 },
  { feature: "Pollster Quality", importance: 0.04 },
]

export default function ModeloPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isTraining, setIsTraining] = useState(false)

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  const handleRegister = (name: string, email: string, password: string) => {
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  const handleRunModel = () => {
    setIsTraining(true)
    setTimeout(() => setIsTraining(false), 3000)
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
            <Brain className="h-4 w-4 text-primary" />
            <span>Machine Learning</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Modelo Predictivo</h1>
          <p className="text-muted-foreground max-w-2xl">
            Modelo de Deep Learning (LSTM) para predicción de intención de voto 
            basado en encuestas y análisis de sentimiento.
          </p>
        </div>

        {/* Model Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Precisión del Modelo"
            value="87.3%"
            change={2.1}
            icon={Target}
            description="vs. baseline"
          />
          <StatsCard
            title="Epochs Entrenados"
            value="150"
            icon={Cpu}
          />
          <StatsCard
            title="Features Utilizadas"
            value="12"
            icon={Layers}
          />
          <StatsCard
            title="Datos de Entrenamiento"
            value="5,842"
            icon={Database}
            description="registros"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Model Architecture */}
          <SectionCard 
            title="Arquitectura del Modelo" 
            description="Configuración LSTM para series temporales"
            icon={Cpu}
          >
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-secondary/30 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Tipo de Modelo</span>
                  <Badge>LSTM</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Long Short-Term Memory para capturar dependencias temporales
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Input Layer</span>
                  <span>12 features</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">LSTM Layer 1</span>
                  <span>64 units</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">LSTM Layer 2</span>
                  <span>32 units</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Dense Layer</span>
                  <span>16 units</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Output Layer</span>
                  <span>5 classes</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Learning Rate</span>
                  <span>0.001</span>
                </div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Optimizer</span>
                  <span>Adam</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Loss Function</span>
                  <span>CrossEntropy</span>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Model Metrics */}
          <SectionCard 
            title="Métricas de Evaluación" 
            description="Performance del modelo en test set"
            icon={BarChart3}
            className="lg:col-span-2"
          >
            <div className="space-y-4">
              {modelMetrics.map((item) => (
                <div key={item.metric} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{item.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        (baseline: {item.benchmark}%)
                      </span>
                      <span className={item.value >= item.benchmark ? "text-accent" : "text-destructive"}>
                        {item.value}%
                      </span>
                    </div>
                  </div>
                  <div className="relative h-2 rounded-full bg-secondary">
                    <div 
                      className="absolute inset-y-0 left-0 rounded-full bg-primary"
                      style={{ width: `${item.value}%` }}
                    />
                    <div 
                      className="absolute inset-y-0 w-0.5 bg-muted-foreground"
                      style={{ left: `${item.benchmark}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Predictions */}
          <SectionCard 
            title="Predicciones Actuales" 
            description="Estimación de intención de voto"
            icon={TrendingUp}
          >
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={predictionData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} domain={[0, 35]} />
                  <YAxis 
                    dataKey="candidate" 
                    type="category" 
                    width={110} 
                    stroke="var(--muted-foreground)" 
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "var(--card)", 
                      border: "1px solid var(--border)",
                      borderRadius: "8px"
                    }}
                    formatter={(value: number) => [`${value}%`, "Predicción"]}
                  />
                  <Bar dataKey="prediction" radius={[0, 4, 4, 0]}>
                    {predictionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {predictionData.slice(0, 4).map((item) => (
                <div key={item.candidate} className="flex items-center justify-between rounded-lg border border-border p-3">
                  <div className="flex items-center gap-2">
                    <div 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.candidate}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{item.prediction}%</p>
                    <p className="text-xs text-muted-foreground">±{100 - item.confidence}%</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Feature Importance */}
          <SectionCard 
            title="Importancia de Features" 
            description="Variables más relevantes para el modelo"
            icon={Layers}
          >
            <div className="space-y-3">
              {featureImportance.map((item, idx) => (
                <div key={item.feature} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="text-muted-foreground">#{idx + 1}</span>
                      <span>{item.feature}</span>
                    </span>
                    <span className="font-medium">{(item.importance * 100).toFixed(0)}%</span>
                  </div>
                  <Progress value={item.importance * 100} className="h-2" />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Run Model Section */}
        <SectionCard 
          title="Ejecutar Modelo" 
          description="Entrenar o ejecutar predicciones"
          icon={Zap}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {isTraining ? (
                  <AlertCircle className="h-5 w-5 text-primary animate-pulse" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-accent" />
                )}
                <span className="font-medium">
                  {isTraining ? "Modelo entrenando..." : "Modelo listo"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Última ejecución: hace 2 horas • Tiempo estimado: ~3 min
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" disabled={isTraining}>
                <Database className="h-4 w-4 mr-2" />
                Cargar Datos
              </Button>
              <Button onClick={handleRunModel} disabled={isTraining}>
                <PlayCircle className="h-4 w-4 mr-2" />
                {isTraining ? "Ejecutando..." : "Ejecutar Modelo"}
              </Button>
            </div>
          </div>
          
          {isTraining && (
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Progreso del entrenamiento</span>
                <span>67%</span>
              </div>
              <Progress value={67} className="h-2" />
            </div>
          )}
        </SectionCard>
      </main>
    </div>
  )
}
