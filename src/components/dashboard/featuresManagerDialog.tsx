"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PlusCircle, Search } from "lucide-react"
import { fetchFeatures, createFeature } from "@/utils/supabase/supabase"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Feature } from "@/lib/definitions"

interface FeaturesManagerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  vehicle: Car
  onSave: (features: string[]) => void
}

export function FeaturesManagerDialog({ open, onOpenChange, vehicle, onSave }: FeaturesManagerDialogProps) {
  const [allFeatures, setAllFeatures] = useState<Feature[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(vehicle.features || [])
  const [searchTerm, setSearchTerm] = useState("")
  const [newFeatureName, setNewFeatureName] = useState("")
  // Asegurarse de que el valor de newFeatureCategory siempre tenga un valor por defecto
  const [newFeatureCategory, setNewFeatureCategory] = useState("General")
  const [isAddingFeature, setIsAddingFeature] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar todas las características disponibles
  useEffect(() => {
    const loadFeatures = async () => {
      setIsLoading(true)
      const features = await fetchFeatures()
      setAllFeatures(features)
      setIsLoading(false)
    }

    if (open) {
      loadFeatures()
    }
  }, [open])

  // Filtrar características por término de búsqueda
  const filteredFeatures = allFeatures.filter(
    (feature) =>
      feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (feature.category && feature.category.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Agrupar características por categoría
  const featuresByCategory = filteredFeatures.reduce(
    (acc, feature) => {
      const category = feature.category || "General"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(feature)
      return acc
    },
    {} as Record<string, Feature[]>,
  )

  // Ordenar categorías
  const sortedCategories = Object.keys(featuresByCategory).sort()

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) => {
      if (prev.includes(featureId)) {
        return prev.filter((id) => id !== featureId)
      } else {
        return [...prev, featureId]
      }
    })
  }

  const handleAddNewFeature = async () => {
    if (!newFeatureName.trim()) return

    const newFeature = await createFeature({
      name: newFeatureName.trim(),
      category: newFeatureCategory,
    })

    if (newFeature) {
      setAllFeatures((prev) => [...prev, newFeature])
      setSelectedFeatures((prev) => [...prev, newFeature.id])
      setNewFeatureName("")
      setIsAddingFeature(false)
    }
  }

  const handleSave = () => {
    onSave(selectedFeatures)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestionar características</DialogTitle>
          <DialogDescription>
            Selecciona las características del vehículo {vehicle.brand} {vehicle.model}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar características..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={() => setIsAddingFeature(true)} variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Nueva característica
            </Button>
          </div>

          {isAddingFeature && (
            <div className="border p-4 rounded-md space-y-4">
              <h3 className="font-medium">Añadir nueva característica</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="new-feature-name">Nombre</Label>
                  <Input
                    id="new-feature-name"
                    value={newFeatureName}
                    onChange={(e) => setNewFeatureName(e.target.value)}
                    placeholder="Ej: Climatizador bizona"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-feature-category">Categoría</Label>
                  {/* Asegurarse de que el Select siempre tenga un valor definido */}
                  <Select value={newFeatureCategory || "General"} onValueChange={setNewFeatureCategory}>
                    <SelectTrigger id="new-feature-category">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="Confort">Confort</SelectItem>
                      <SelectItem value="Seguridad">Seguridad</SelectItem>
                      <SelectItem value="Tecnología">Tecnología</SelectItem>
                      <SelectItem value="Exterior">Exterior</SelectItem>
                      <SelectItem value="Interior">Interior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingFeature(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleAddNewFeature}>Añadir</Button>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8">
              <p>Cargando características...</p>
            </div>
          ) : filteredFeatures.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed rounded-lg">
              <h3 className="mt-2 text-sm font-semibold">No se encontraron características</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Intenta con otra búsqueda o añade una nueva característica
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedCategories.map((category) => (
                <div key={category} className="space-y-2">
                  <h3 className="font-medium text-lg">{category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {featuresByCategory[category].map((feature) => (
                      <div key={feature.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`feature-${feature.id}`}
                          checked={selectedFeatures.includes(feature.id)}
                          onCheckedChange={() => handleFeatureToggle(feature.id)}
                        />
                        <label
                          htmlFor={`feature-${feature.id}`}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {feature.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 p-4 bg-muted rounded-md">
            <h3 className="font-medium mb-2">Características seleccionadas: {selectedFeatures.length}</h3>
            <div className="flex flex-wrap gap-2">
              {selectedFeatures.map((featureId) => {
                const feature = allFeatures.find((f) => f.id === featureId)
                return feature ? (
                  <div key={featureId} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm">
                    {feature.name}
                  </div>
                ) : null
              })}
              {selectedFeatures.length === 0 && (
                <p className="text-sm text-muted-foreground">No hay características seleccionadas</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

