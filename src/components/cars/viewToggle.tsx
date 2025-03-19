"use client";

import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useViewStore } from "@/lib/store"

export default function ViewToggle() {
  const { view, setView } = useViewStore()

  return (
    <div className="flex gap-2">
      <Button
        variant={view === "grid" ? "default" : "outline"}
        size="icon"
        onClick={() => setView("grid")}
        aria-label="Vista en cuadrícula"
      >
        <Grid className="h-4 w-4" />
      </Button>
      <Button
        variant={view === "list" ? "default" : "outline"}
        size="icon"
        onClick={() => setView("list")}
        aria-label="Vista en lista"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  )
}

