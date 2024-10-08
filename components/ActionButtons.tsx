"use client"

import { Button } from "@/components/ui/button"
import { Plus, Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ActionButtons() {
  const { toast } = useToast()

  return (
    <div className="flex justify-between mb-4">
      <Button onClick={() => toast({ title: "Add New Vaccine", description: "This feature is not implemented yet." })}>
        <Plus className="mr-2 h-4 w-4" /> Add New Vaccine
      </Button>
      <Button onClick={() => toast({ title: "Export to CSV", description: "This feature is not implemented yet." })} variant="outline">
        <Download className="mr-2 h-4 w-4" /> Export to CSV
      </Button>
    </div>
  )
}