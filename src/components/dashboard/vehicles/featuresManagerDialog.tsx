"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Search } from "lucide-react";
import { fetchFeatures, createFeature } from "@/supabase/supabase";
import { Car, Feature } from "@/lib/definitions";
import { useToast } from "@/hooks/useToast";

interface FeaturesManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Car;
  onSave: (features: string[]) => void;
}

export function FeaturesManagerDialog({
  open,
  onOpenChange,
  vehicle,
  onSave,
}: FeaturesManagerDialogProps) {
  const [allFeatures, setAllFeatures] = useState<Feature[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newFeatureName, setNewFeatureName] = useState("");
  const [isAddingFeature, setIsAddingFeature] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      const loadFeatures = async () => {
        setIsLoading(true);
        try {
          const features = await fetchFeatures();
          setAllFeatures(features);
          setSelectedFeatures(vehicle.features || []);
        } catch (error) {
          console.error("Error loading features:", error);
          toast({
            title: "Error",
            description:
              "No se pudieron cargar las características. Inténtalo de nuevo.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };

      loadFeatures();
    }
  }, [open, vehicle, toast]);

  const filteredFeatures = allFeatures.filter((feature) =>
    feature.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures((prev) => {
      if (prev.includes(featureId)) {
        return prev.filter((id) => id !== featureId);
      } else {
        return [...prev, featureId];
      }
    });
  };

  const handleAddNewFeature = async () => {
    if (!newFeatureName.trim()) return;

    try {
      const newFeature = await createFeature({
        name: newFeatureName.trim(),
      });

      if (newFeature) {
        setAllFeatures((prev) => [...prev, newFeature]);
        setSelectedFeatures((prev) => [...prev, newFeature.id]);
        setNewFeatureName("");
        setIsAddingFeature(false);
        toast({
          title: "Característica añadida",
          description: "La característica ha sido añadida correctamente.",
        });
      } else {
        toast({
          title: "Error",
          description:
            "No se pudo añadir la característica. Inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error adding feature:", error);
      toast({
        title: "Error",
        description:
          "Ocurrió un error al añadir la característica. Verifica los permisos en Supabase.",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    onSave(selectedFeatures);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestionar características</DialogTitle>
          <DialogDescription>
            Selecciona las características del vehículo {vehicle.brand}{" "}
            {vehicle.model}
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
              <div className="space-y-2">
                <Label htmlFor="new-feature-name">Nombre</Label>
                <Input
                  id="new-feature-name"
                  value={newFeatureName}
                  onChange={(e) => setNewFeatureName(e.target.value)}
                  placeholder="Ej: Climatizador bizona"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingFeature(false)}
                >
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
              <h3 className="mt-2 text-sm font-semibold">
                No se encontraron características
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Intenta con otra búsqueda o añade una nueva característica
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium text-lg">Características</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {filteredFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className="flex items-center space-x-2"
                    >
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
            </div>
          )}

          <div className="mt-4 p-4 bg-muted rounded-md">
            <h3 className="font-medium mb-2">
              Características seleccionadas: {selectedFeatures.length}
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedFeatures.map((featureId) => {
                const feature = allFeatures.find((f) => f.id === featureId);
                return feature ? (
                  <div
                    key={featureId}
                    className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                  >
                    {feature.name}
                  </div>
                ) : null;
              })}
              {selectedFeatures.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No hay características seleccionadas
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
