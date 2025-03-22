"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { fetchFeatures, createFeature, updateFeature, deleteFeature } from "@/supabase/supabase";
import { useToast } from "@/hooks/useToast";
import { Feature } from "@/lib/definitions";
import { FeaturesTable } from "@/components/dashboard/features/FeatureTable";
import { FeatureFormDialog } from "@/components/dashboard/features/FeatureFormDialog";

export default function FeaturesPage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadFeatures = async () => {
      setIsLoading(true);
      try {
        const fetched = await fetchFeatures();
        setFeatures(fetched);
      } catch (error) {
        console.error("Error al cargar características:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar las características. Inténtalo de nuevo.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadFeatures();
  }, [toast]);

  const handleAddNew = () => {
    setIsFormDialogOpen(true);
  };

  const handleSaveFeature = async (newFeatureData: { name: string }) => {
    try {
      const created = await createFeature(newFeatureData);
      if (created) {
        setFeatures((prev) => [...prev, created]);
        toast({
          title: "Característica añadida",
          description: "La característica ha sido añadida correctamente.",
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudo añadir la característica. Inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error añadiendo característica:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al añadir la característica.",
        variant: "destructive",
      });
    }
  };

  const handleEditFeature = async (id: string, newName: string) => {
    try {
      const updated = await updateFeature(id, { name: newName });
      if (updated) {
        setFeatures((prev) =>
          prev.map((f) => (f.id === id ? { ...f, name: newName } : f))
        );
        toast({
          title: "Característica actualizada",
          description: "La característica ha sido actualizada correctamente.",
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudo actualizar la característica. Inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error actualizando característica:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al actualizar la característica.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteFeature = async (id: string) => {
    try {
      const success = await deleteFeature(id);
      if (success) {
        setFeatures((prev) => prev.filter((f) => f.id !== id));
        toast({
          title: "Característica eliminada",
          description: "La característica ha sido eliminada correctamente.",
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudo eliminar la característica. Inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error eliminando característica:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al eliminar la característica.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Gestión de Características"
        description="Administra las características disponibles"
        action={
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Añadir Característica
          </Button>
        }
      />

      {isLoading ? (
        <div className="text-center py-8">
          <p>Cargando características...</p>
        </div>
      ) : (
        <FeaturesTable
          features={features}
          onEdit={handleEditFeature}
          onDelete={handleDeleteFeature}
        />
      )}

      <FeatureFormDialog
        open={isFormDialogOpen}
        onOpenChange={setIsFormDialogOpen}
        onSave={handleSaveFeature}
      />
    </div>
  );
}
