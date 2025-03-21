"use client";

import type React from "react";

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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Trash2, Upload, X } from "lucide-react";
import Image from "next/image";
import { uploadImage, deleteImage } from "@/supabase/supabase";
import { useToast } from "@/hooks/useToast";

interface Car {
  id: string;
  brand: string;
  model: string;
  images?: string[];
}

interface ImageManagerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Car;
  onSave: (images: string[]) => void;
}

export function ImageManagerDialog({
  open,
  onOpenChange,
  vehicle,
  onSave,
}: ImageManagerDialogProps) {
  const [images, setImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (open && vehicle) {
      setImages(vehicle.images || []);
      setSelectedImages(new Set());
    }
  }, [open, vehicle]);

  const handleImageSelect = (imageUrl: string) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageUrl)) {
      newSelected.delete(imageUrl);
    } else {
      newSelected.add(imageUrl);
    }
    setSelectedImages(newSelected);
  };

  const handleDeleteSelected = async () => {
    if (selectedImages.size === 0) return;

    const imagesToDelete = Array.from(selectedImages);
    const remainingImages = images.filter((img) => !selectedImages.has(img));

    setImages(remainingImages);
    setSelectedImages(new Set());

    for (const imageUrl of imagesToDelete) {
      try {
        await deleteImage(imageUrl);
      } catch (error) {
        console.error("Error deleting image:", error);
        toast({
          title: "Error al eliminar imagen",
          description:
            "No se pudo eliminar la imagen correctamente. Verifica los permisos de almacenamiento.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const newImages: string[] = [...images];
    const totalFiles = files.length;
    let processedFiles = 0;
    let successCount = 0;
    let errorCount = 0;

    for (let i = 0; i < files.length; i++) {
      try {
        const file = files[i];
        if (!vehicle.id) {
          console.error("Vehicle ID is undefined");
          errorCount++;
          continue;
        }

        const imageUrl = await uploadImage(file, `cars/${vehicle.id}`);

        if (imageUrl) {
          newImages.push(imageUrl);
          successCount++;
        } else {
          errorCount++;
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        errorCount++;
      } finally {
        processedFiles++;
        setUploadProgress(Math.round((processedFiles / totalFiles) * 100));
      }
    }

    setImages(newImages);
    setIsUploading(false);
    e.target.value = "";

    if (successCount > 0) {
      toast({
        title: `${successCount} imágenes subidas`,
        description:
          errorCount > 0
            ? `No se pudieron subir ${errorCount} imágenes.`
            : "Todas las imágenes se subieron correctamente.",
      });
    } else if (errorCount > 0) {
      toast({
        title: "Error al subir imágenes",
        description:
          "No se ha podido subir ninguna imagen. Verifica los permisos en Supabase o contacta al administrador.",
        variant: "destructive",
      });
    }
  };

  const handleSave = () => {
    onSave([...images]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gestionar imágenes</DialogTitle>
          <DialogDescription>
            Añade, elimina o reordena las imágenes del vehículo{" "}
            {vehicle.brand || ""} {vehicle.model || ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <Label htmlFor="image-upload">Añadir imágenes</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  disabled={isUploading}
                  className="max-w-sm"
                />
                {selectedImages.size > 0 && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteSelected}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar seleccionadas ({selectedImages.size})
                  </Button>
                )}
              </div>
            </div>
          </div>

          {isUploading && (
            <div className="w-full bg-secondary rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <p className="text-sm text-muted-foreground mt-1">
                Subiendo imágenes: {uploadProgress}%
              </p>
            </div>
          )}

          {images.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed rounded-lg">
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-semibold">No hay imágenes</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Sube imágenes para mostrar este vehículo
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((imageUrl, index) => (
                <div
                  key={index}
                  className={`relative group border rounded-md overflow-hidden aspect-square ${
                    selectedImages.has(imageUrl) ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => handleImageSelect(imageUrl)}
                >
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={`Imagen ${index + 1} de ${vehicle.brand || ""} ${
                      vehicle.model || ""
                    }`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    {selectedImages.has(imageUrl) ? (
                      <X className="h-8 w-8 text-white" />
                    ) : (
                      <div className="h-8 w-8 border-2 border-white rounded-md" />
                    )}
                  </div>
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Principal
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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
