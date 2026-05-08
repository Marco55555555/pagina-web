"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { LoginModal } from "@/components/login-modal"
import { SectionCard } from "@/components/section-card"
import { FileUpload } from "@/components/file-upload"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Upload, 
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Database,
  ArrowRight,
  Trash2
} from "lucide-react"

interface UploadedFile {
  name: string
  size: number
  rows: number
  columns: string[]
  status: "processing" | "ready" | "error"
  data?: Record<string, unknown>[]
}

export default function SubirPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [previewData, setPreviewData] = useState<Record<string, unknown>[] | null>(null)
  const [previewColumns, setPreviewColumns] = useState<{ key: string; label: string; type: "text" }[]>([])

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  const handleRegister = (name: string, email: string, password: string) => {
    setIsLoggedIn(true)
    setShowLogin(false)
  }

  const parseCSV = (text: string) => {
    const lines = text.split("\n").filter(line => line.trim())
    if (lines.length < 2) return { headers: [], data: [] }
    
    // Try to detect delimiter
    const firstLine = lines[0]
    const delimiter = firstLine.includes(";") ? ";" : ","
    
    const headers = firstLine.split(delimiter).map(h => h.trim().replace(/"/g, ""))
    const data = lines.slice(1).map(line => {
      const values = line.split(delimiter)
      const row: Record<string, unknown> = {}
      headers.forEach((header, idx) => {
        row[header] = values[idx]?.trim().replace(/"/g, "") || ""
      })
      return row
    })
    
    return { headers, data }
  }

  const handleFileSelect = async (file: File) => {
    const newFile: UploadedFile = {
      name: file.name,
      size: file.size,
      rows: 0,
      columns: [],
      status: "processing"
    }
    
    setUploadedFiles(prev => [...prev, newFile])

    try {
      const text = await file.text()
      const { headers, data } = parseCSV(text)
      
      setUploadedFiles(prev => prev.map(f => 
        f.name === file.name 
          ? { ...f, rows: data.length, columns: headers, status: "ready" as const, data }
          : f
      ))

      // Set preview
      setPreviewData(data.slice(0, 10))
      setPreviewColumns(headers.slice(0, 6).map(h => ({ key: h, label: h, type: "text" as const })))
    } catch {
      setUploadedFiles(prev => prev.map(f => 
        f.name === file.name 
          ? { ...f, status: "error" as const }
          : f
      ))
    }
  }

  const removeFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== fileName))
    if (uploadedFiles.find(f => f.name === fileName)?.data === previewData) {
      setPreviewData(null)
      setPreviewColumns([])
    }
  }

  const showPreview = (file: UploadedFile) => {
    if (file.data) {
      setPreviewData(file.data.slice(0, 10))
      setPreviewColumns(file.columns.slice(0, 6).map(h => ({ key: h, label: h, type: "text" as const })))
    }
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
            <Upload className="h-4 w-4 text-primary" />
            <span>Importar</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Subir Datos CSV</h1>
          <p className="text-muted-foreground max-w-2xl">
            Carga tus propios archivos CSV para análisis. Soportamos datos de 
            encuestas, comentarios de redes sociales y datos electorales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <SectionCard 
              title="Cargar Archivo" 
              description="Arrastra o selecciona un archivo CSV"
              icon={Upload}
            >
              <FileUpload onFileSelect={handleFileSelect} />
              
              <div className="mt-6 space-y-2">
                <h4 className="text-sm font-medium">Formatos soportados:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Encuestas electorales</Badge>
                  <Badge variant="secondary">Comentarios YouTube</Badge>
                  <Badge variant="secondary">Tweets / Posts X</Badge>
                  <Badge variant="secondary">Datos Registraduría</Badge>
                </div>
              </div>
            </SectionCard>

            {/* Preview Section */}
            {previewData && previewData.length > 0 && (
              <SectionCard 
                title="Vista Previa" 
                description="Primeras 10 filas del archivo"
                icon={FileSpreadsheet}
              >
                <DataTable 
                  data={previewData} 
                  columns={previewColumns}
                  maxRows={10}
                />
              </SectionCard>
            )}
          </div>

          {/* Sidebar - Uploaded Files */}
          <div className="space-y-6">
            <SectionCard 
              title="Archivos Cargados" 
              description="Gestiona tus datasets"
              icon={Database}
            >
              {uploadedFiles.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <FileSpreadsheet className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No hay archivos cargados</p>
                  <p className="text-xs">Sube un CSV para comenzar</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {uploadedFiles.map((file) => (
                    <div 
                      key={file.name} 
                      className="rounded-lg border border-border p-3 space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {file.status === "processing" && (
                            <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                          )}
                          {file.status === "ready" && (
                            <CheckCircle className="h-4 w-4 text-accent" />
                          )}
                          {file.status === "error" && (
                            <AlertCircle className="h-4 w-4 text-destructive" />
                          )}
                          <span className="text-sm font-medium truncate max-w-[150px]">
                            {file.name}
                          </span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-6 w-6"
                          onClick={() => removeFile(file.name)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      {file.status === "ready" && (
                        <>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{file.rows} filas</span>
                            <span>{file.columns.length} columnas</span>
                            <span>{(file.size / 1024).toFixed(1)} KB</span>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full"
                            onClick={() => showPreview(file)}
                          >
                            Ver datos <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </>
                      )}
                      
                      {file.status === "error" && (
                        <p className="text-xs text-destructive">
                          Error al procesar el archivo
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            <SectionCard 
              title="Instrucciones" 
              icon={FileSpreadsheet}
            >
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary shrink-0">1</span>
                  <p>Prepara tu archivo CSV con encabezados en la primera fila</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary shrink-0">2</span>
                  <p>Asegúrate de que el delimitador sea coma (,) o punto y coma (;)</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary shrink-0">3</span>
                  <p>Sube el archivo y revisa la vista previa</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs text-primary shrink-0">4</span>
                  <p>Los datos estarán disponibles en las secciones de Análisis y Modelo</p>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  )
}
