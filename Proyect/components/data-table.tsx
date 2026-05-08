"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface DataTableProps {
  data: Record<string, unknown>[]
  columns: {
    key: string
    label: string
    type?: "text" | "number" | "badge" | "date"
  }[]
  maxRows?: number
}

export function DataTable({ data, columns, maxRows = 10 }: DataTableProps) {
  const displayData = data.slice(0, maxRows)

  const renderCell = (value: unknown, type?: string) => {
    if (value === null || value === undefined) {
      return <span className="text-muted-foreground">-</span>
    }

    switch (type) {
      case "badge":
        return <Badge variant="secondary">{String(value)}</Badge>
      case "number":
        return (
          <span className="font-mono text-sm">
            {typeof value === "number" ? value.toLocaleString() : value}
          </span>
        )
      case "date":
        return (
          <span className="text-muted-foreground text-sm">
            {String(value)}
          </span>
        )
      default:
        return <span className="truncate max-w-[200px] block">{String(value)}</span>
    }
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/50">
              {columns.map((col) => (
                <TableHead key={col.key} className="font-semibold">
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-secondary/30">
                {columns.map((col) => (
                  <TableCell key={col.key}>
                    {renderCell(row[col.key], col.type)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {data.length > maxRows && (
        <div className="border-t border-border bg-secondary/30 px-4 py-2 text-sm text-muted-foreground">
          Mostrando {maxRows} de {data.length} filas
        </div>
      )}
    </div>
  )
}
