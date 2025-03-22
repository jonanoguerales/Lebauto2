"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"
import { VehiclesTable } from "@/components/dashboard/vehicles/VehiclesTable"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { VehicleFormDialog } from "@/components/dashboard/vehicles/VehicleFormDialog"
import { ImageManagerDialog } from "@/components/dashboard/vehicles/ImageManagerDialog"
import { FeaturesManagerDialog } from "@/components/dashboard/vehicles/FeaturesManagerDialog"
import { fetchCars, createCar, updateCar, deleteCar } from "@/supabase/supabase"
import { useToast } from "@/hooks/useToast"
import { Car } from "@/lib/definitions"

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Car[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
  const [isFeaturesDialogOpen, setIsFeaturesDialogOpen] = useState(false)
  const [editingVehicle, setEditingVehicle] = useState<Car | null>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<Car | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const loadVehicles = async () => {
      setIsLoading(true)
      try {
        const cars = await fetchCars()
        setVehicles(cars)
      } catch (error) {
        console.error("Error loading vehicles:", error)
        toast({
          title: "Error",
          description: "No se pudieron cargar los vehículos. Inténtalo de nuevo.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadVehicles()
  }, [toast])

  const handleAddNew = () => {
    setEditingVehicle(null)
    setIsFormDialogOpen(true)
  }

  const handleEdit = (vehicle: Car) => {
    setEditingVehicle(vehicle)
    setIsFormDialogOpen(true)
  }

  const handleManageImages = (vehicle: Car) => {
    setSelectedVehicle(vehicle)
    setIsImageDialogOpen(true)
  }

  const handleManageFeatures = (vehicle: Car) => {
    setSelectedVehicle(vehicle)
    setIsFeaturesDialogOpen(true)
  }

  const handleSaveVehicle = async (vehicle: Car) => {
    try {
      if (editingVehicle) {
        const updatedVehicle = await updateCar(vehicle.id, vehicle)
        if (updatedVehicle) {
          setVehicles((prev) => prev.map((v) => (v.id === vehicle.id ? updatedVehicle : v)))
          toast({
            title: "Vehículo actualizado",
            description: "El vehículo ha sido actualizado correctamente.",
          })
        } else {
          toast({
            title: "Error",
            description: "No se pudo actualizar el vehículo. Inténtalo de nuevo.",
            variant: "destructive",
          })
        }
      } else {
        const newVehicle = await createCar(vehicle)
        if (newVehicle) {
          setVehicles((prev) => [...prev, newVehicle])
          toast({
            title: "Vehículo añadido",
            description: "El vehículo ha sido añadido correctamente.",
          })
        } else {
          toast({
            title: "Error",
            description: "No se pudo añadir el vehículo. Inténtalo de nuevo.",
            variant: "destructive",
          })
        }
      }
      setIsFormDialogOpen(false)
    } catch (error) {
      console.error("Error saving vehicle:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al guardar el vehículo. Verifica los datos e inténtalo de nuevo.",
        variant: "destructive",
      })
    }
  }

  const handleSaveImages = async (images: string[]) => {
    if (!selectedVehicle) return

    try {
      const vehicleToUpdate = { ...selectedVehicle, images: [...images] }

      const updatedVehicle = await updateCar(selectedVehicle.id, {
        images: [...images],
      })

      if (updatedVehicle) {
        setVehicles((prev) =>
          prev.map((v) =>
            v.id === selectedVehicle.id
              ? {
                  ...v,
                  images: updatedVehicle.images || [],
                }
              : v,
          ),
        )

        toast({
          title: "Imágenes actualizadas",
          description: "Las imágenes del vehículo han sido actualizadas correctamente.",
        })
      } else {
        toast({
          title: "Error",
          description: "No se pudieron actualizar las imágenes. Inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving images:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al guardar las imágenes.",
        variant: "destructive",
      })
    }
  }

  const handleSaveFeatures = async (features: string[]) => {
    if (!selectedVehicle) return

    try {
      const vehicleToUpdate = { ...selectedVehicle, features: [...features] }

      const updatedVehicle = await updateCar(selectedVehicle.id, { features })

      if (updatedVehicle) {
        setVehicles((prev) =>
          prev.map((v) => (v.id === selectedVehicle.id ? { ...v, features: updatedVehicle.features || [] } : v)),
        )

        toast({
          title: "Características actualizadas",
          description: "Las características del vehículo han sido actualizadas correctamente.",
        })
      } else {
        toast({
          title: "Error",
          description: "No se pudieron actualizar las características. Inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving features:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al guardar las características.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const success = await deleteCar(id)
      if (success) {
        setVehicles((prev) => prev.filter((v) => v.id !== id))
        toast({
          title: "Vehículo eliminado",
          description: "El vehículo ha sido eliminado correctamente.",
        })
      } else {
        toast({
          title: "Error",
          description: "No se pudo eliminar el vehículo. Inténtalo de nuevo.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting vehicle:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error al eliminar el vehículo.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Gestión de Vehículos"
        description="Administra tu inventario de vehículos"
        action={
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Añadir vehículo
          </Button>
        }
      />

      {isLoading ? (
        <div className="text-center py-8">
          <p>Cargando vehículos...</p>
        </div>
      ) : (
        <VehiclesTable
          vehicles={vehicles}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onManageImages={handleManageImages}
          onManageFeatures={handleManageFeatures}
        />
      )}

      <VehicleFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        vehicle={editingVehicle}
        onSave={handleSaveVehicle}
      />

      {selectedVehicle && (
        <>
          <ImageManagerDialog
            open={isImageDialogOpen}
            onOpenChange={setIsImageDialogOpen}
            vehicle={selectedVehicle}
            onSave={handleSaveImages}
          />

          <FeaturesManagerDialog
            open={isFeaturesDialogOpen}
            onOpenChange={setIsFeaturesDialogOpen}
            vehicle={selectedVehicle}
            onSave={handleSaveFeatures}
          />
        </>
      )}
    </div>
  )
}

