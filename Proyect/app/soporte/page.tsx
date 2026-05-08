"use client"

import { useState } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { LoginModal } from "@/components/login-modal"
import { SectionCard } from "@/components/section-card"
import {
  HeadphonesIcon,
  Home,
  ChevronRight,
  ChevronDown,
  Mail,
  Phone,
  CalendarDays,
  MessageCircle,
  HelpCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "¿Qué datos utiliza el modelo para hacer predicciones?",
    answer:
      "El modelo combina encuestas electorales, comentarios de redes sociales (YouTube, X/Twitter), datos históricos de la Registraduría Nacional y métricas de sentimiento en tiempo real.",
  },
  {
    question: "¿Con qué frecuencia se actualiza la información?",
    answer:
      "Los datos de redes sociales se actualizan diariamente. Las encuestas se incorporan dentro de las 24 horas posteriores a su publicación oficial.",
  },
  {
    question: "¿Cómo interpreto los porcentajes de intención de voto?",
    answer:
      "Los porcentajes representan la probabilidad estimada de intención de voto según el modelo. Cada valor incluye un margen de confianza que indica el nivel de incertidumbre del pronóstico.",
  },
  {
    question: "¿El modelo garantiza exactitud en los resultados?",
    answer:
      "No. El modelo es una herramienta analítica con un 87.3% de precisión histórica, pero las predicciones electorales siempre están sujetas a variaciones. No deben usarse como resultado definitivo.",
  },
  {
    question: "¿Cómo puedo aportar datos o reportar errores?",
    answer:
      "Puedes contactarnos a través de los canales de atención disponibles en esta página: correo electrónico, WhatsApp o agendando una cita con el equipo.",
  },
  {
    question: "¿Los datos personales de los ciudadanos están protegidos?",
    answer:
      "Sí. El proyecto cumple con el marco ético definido en el documento marco_etico_v4 y no almacena ni procesa datos personales identificables de los ciudadanos.",
  },
]

export default function SoportePage() {
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showCitaModal, setShowCitaModal] = useState(false)
  const [citaForm, setCitaForm] = useState({ nombre: "", email: "", fecha: "", mensaje: "" })
  const [citaEnviada, setCitaEnviada] = useState(false)

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  const handleRegister = (name: string, email: string, password: string) => {
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  const handleCita = (e: React.FormEvent) => {
    e.preventDefault()
    setCitaEnviada(true)
    setTimeout(() => {
      setShowCitaModal(false)
      setCitaEnviada(false)
      setCitaForm({ nombre: "", email: "", fecha: "", mensaje: "" })
    }, 2500)
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

      {/* Modal Agendar Cita */}
      {showCitaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-xl">
            {citaEnviada ? (
              <div className="text-center py-6">
                <CalendarDays className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-1">¡Solicitud enviada!</h3>
                <p className="text-sm text-muted-foreground">
                  Nos pondremos en contacto contigo para confirmar la cita.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Agendar una cita</h3>
                  <button
                    onClick={() => setShowCitaModal(false)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <form onSubmit={handleCita} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium block mb-1">Nombre completo</label>
                    <input
                      required
                      type="text"
                      value={citaForm.nombre}
                      onChange={(e) => setCitaForm({ ...citaForm, nombre: e.target.value })}
                      className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Correo electrónico</label>
                    <input
                      required
                      type="email"
                      value={citaForm.email}
                      onChange={(e) => setCitaForm({ ...citaForm, email: e.target.value })}
                      className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="tu@correo.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Fecha preferida</label>
                    <input
                      required
                      type="date"
                      value={citaForm.fecha}
                      onChange={(e) => setCitaForm({ ...citaForm, fecha: e.target.value })}
                      className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium block mb-1">Motivo o consulta</label>
                    <textarea
                      value={citaForm.mensaje}
                      onChange={(e) => setCitaForm({ ...citaForm, mensaje: e.target.value })}
                      className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      rows={3}
                      placeholder="Describe brevemente el motivo de la cita..."
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    <CalendarDays className="h-4 w-4" />
                    Enviar solicitud
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
          <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
            <Home className="h-3.5 w-3.5" />
            Inicio
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Soporte</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm mb-4">
            <HeadphonesIcon className="h-4 w-4 text-primary" />
            <span>Centro de Ayuda</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Soporte y Ayuda</h1>
          <p className="text-muted-foreground max-w-2xl">
            Encuentra respuestas a las preguntas más frecuentes o comunícate con
            nuestro equipo a través de los canales disponibles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FAQ */}
          <div className="lg:col-span-2">
            <SectionCard title="Preguntas Frecuentes" icon={HelpCircle}>
              <div className="space-y-2">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="rounded-lg border border-border overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left text-sm font-medium hover:bg-secondary/50 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`h-4 w-4 shrink-0 ml-2 transition-transform ${openFaq === idx ? "rotate-180" : ""}`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-border bg-secondary/20 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Canales de Atención */}
          <div>
            <SectionCard title="Canales de Atención" icon={Phone}>
              <div className="space-y-3">
                {/* Agendar cita */}
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <CalendarDays className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Agendar una cita</p>
                      <p className="text-xs text-muted-foreground">Atención personalizada</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="w-full gap-2"
                    onClick={() => setShowCitaModal(true)}
                  >
                    <CalendarDays className="h-4 w-4" />
                    Agendar cita
                  </Button>
                </div>

                {/* Correo electrónico */}
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Correo electrónico</p>
                      <p className="text-xs text-muted-foreground">soporte@electoralanalytics.co</p>
                    </div>
                  </div>
                  <a href="mailto:soporte@electoralanalytics.co">
                    <Button size="sm" variant="outline" className="w-full gap-2">
                      <Mail className="h-4 w-4" />
                      Enviar correo
                    </Button>
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">WhatsApp</p>
                      <p className="text-xs text-muted-foreground">+57 300 000 0000</p>
                    </div>
                  </div>
                  <a
                    href="https://wa.me/573000000000"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="sm" variant="outline" className="w-full gap-2 text-green-400 border-green-500/30 hover:bg-green-500/10">
                      <MessageCircle className="h-4 w-4" />
                      Escribir por WhatsApp
                    </Button>
                  </a>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4 text-center">
                Horario de atención: Lunes a viernes, 8:00 am – 5:00 pm
              </p>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  )
}
