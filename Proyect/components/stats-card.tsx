import { cn } from "@/lib/utils"
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  icon?: LucideIcon
  description?: string
  className?: string
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon,
  description,
  className 
}: StatsCardProps) {
  const getTrendIcon = () => {
    if (change === undefined) return null
    if (change > 0) return <TrendingUp className="h-4 w-4 text-accent" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-destructive" />
    return <Minus className="h-4 w-4 text-muted-foreground" />
  }

  const getTrendColor = () => {
    if (change === undefined) return ""
    if (change > 0) return "text-accent"
    if (change < 0) return "text-destructive"
    return "text-muted-foreground"
  }

  return (
    <div className={cn(
      "rounded-xl border border-border bg-card p-5",
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        )}
      </div>
      
      {(change !== undefined || description) && (
        <div className="mt-3 flex items-center gap-2">
          {change !== undefined && (
            <>
              {getTrendIcon()}
              <span className={cn("text-sm font-medium", getTrendColor())}>
                {change > 0 ? "+" : ""}{change}%
              </span>
            </>
          )}
          {description && (
            <span className="text-sm text-muted-foreground">{description}</span>
          )}
        </div>
      )}
    </div>
  )
}
