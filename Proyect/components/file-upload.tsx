"use client"

import { useCallback, useState } from "react"
import { Upload, FileText, X, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number // in MB
}

export function FileUpload({ 
  onFileSelect, 
  accept = ".csv",
  maxSize = 10 
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validateFile = (file: File): boolean => {
    setError(null)
    
    const extension = file.name.split(".").pop()?.toLowerCase()
    if (accept.includes("csv") && extension !== "csv") {
      setError("Solo se permiten archivos CSV")
      return false
    }

    if (file.size > maxSize * 1024 * 1024) {
      setError(`El archivo debe ser menor a ${maxSize}MB`)
      return false
    }

    return true
  }

  const handleFile = (file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file)
      onFileSelect(file)
    }
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const removeFile = () => {
    setSelectedFile(null)
    setError(null)
  }

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors",
          isDragging 
            ? "border-primary bg-primary/5" 
            : "border-border hover:border-primary/50",
          error && "border-destructive bg-destructive/5"
        )}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
        
        <div className={cn(
          "mb-4 flex h-16 w-16 items-center justify-center rounded-full",
          isDragging ? "bg-primary/10" : "bg-secondary"
        )}>
          <Upload className={cn(
            "h-8 w-8",
            isDragging ? "text-primary" : "text-muted-foreground"
          )} />
        </div>
        
        <p className="mb-1 text-center font-medium">
          Arrastra tu archivo CSV aquí
        </p>
        <p className="text-center text-sm text-muted-foreground">
          o haz clic para seleccionar (máx. {maxSize}MB)
        </p>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <X className="h-4 w-4" />
          {error}
        </div>
      )}

      {selectedFile && !error && (
        <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
              <FileText className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-accent" />
            <Button variant="ghost" size="icon" onClick={removeFile}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
