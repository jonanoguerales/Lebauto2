"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FeatureFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (newFeature: { name: string }) => void;
}

export function FeatureFormDialog({
  open,
  onOpenChange,
  onSave,
}: FeatureFormDialogProps) {
  const [featureName, setFeatureName] = useState("");

  const handleSave = () => {
    if (featureName.trim() === "") return;
    onSave({ name: featureName.trim() });
    setFeatureName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Añadir Característica</DialogTitle>
          <DialogDescription>
            Ingresa el nombre de la nueva característica.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <Label htmlFor="feature-name">Nombre</Label>
          <Input
            id="feature-name"
            value={featureName}
            onChange={(e) => setFeatureName(e.target.value)}
            placeholder="Ej: Climatizador"
          />
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
