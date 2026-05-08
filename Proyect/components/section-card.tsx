import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface SectionCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  children: React.ReactNode
  className?: string
}

export function SectionCard({ 
  title, 
  description, 
  icon: Icon, 
  children,
  className 
}: SectionCardProps) {
  return (
    <div className={cn(
      "rounded-xl border border-border bg-card p-6",
      className
    )}>
      <div className="mb-4 flex items-center gap-3">
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      {children}
    </div>
  )
}
