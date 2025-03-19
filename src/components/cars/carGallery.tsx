"use client";

import { JSX, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarGalleryProps {
  images: string[];
}

export default function CarGallery({ images }: CarGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const totalImages = images.length;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % totalImages);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + totalImages) % totalImages);

  return (
    <div className="mb-8" role="region" aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="sr-only">Galería de imágenes del vehículo</h2>
      <div className="relative h-[200px] xxs:h-[250px] xs:h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden">
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt={`Imagen ${currentImage + 1} de ${totalImages} del vehículo`}
          fill
          className="object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 flex items-center justify-between p-4">
          <GalleryButton onClick={prevImage} icon={<ChevronLeft className="h-6 w-6" />} label="Imagen anterior" />
          <GalleryButton onClick={nextImage} icon={<ChevronRight className="h-6 w-6" />} label="Imagen siguiente" />
        </div>

        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
          {currentImage + 1} / {totalImages}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 mt-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`relative h-20 rounded-md overflow-hidden ${currentImage === index ? "ring-2 ring-primary" : ""}`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`Miniatura ${index + 1} del vehículo`}
              fill
              className="object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

function GalleryButton({ onClick, icon, label }: { onClick: () => void; icon: JSX.Element; label: string }) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} className="bg-black/30 hover:bg-black/50 text-white rounded-full" aria-label={label}>
      {icon}
    </Button>
  );
}
