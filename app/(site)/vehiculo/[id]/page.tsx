import { notFound } from "next/navigation";
import { cars } from "@/lib/placeholder-data";
import CarGallery from "@/components/cars/carGallery";
import CarInfo from "@/components/cars/carInfo";
import CarFeatures from "@/components/cars/carFeatures";
import CarContact from "@/components/cars/carContact";
import { Suspense } from "react";
import { CarCardSkeleton } from "@/components/cars/carSkeleton";
import type { Metadata } from "next";

async function fetchCar(id: string) {
  return cars.find((c) => c.id === id) || null;
}

export async function generateMetadata({ params }: { params: any}): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const { id } = resolvedParams;
  const car = await fetchCar(id);

  if (!car) {
    return {
      title: "Vehículo no encontrado",
      description: "Este vehículo no se encuentra disponible en nuestra base de datos.",
    };
  }

  return {
    title: `${car.brand} ${car.model} ${car.variant} || ""} - Lebauto`,
    description: `Compra este ${car.brand} ${car.model} del año ${car.year} con ${car.mileage.toLocaleString()} km, disponible por solo ${car.price.toLocaleString()}€ en Lebauto.`,
    openGraph: {
      images: car.images?.[0] || "/placeholder.svg",
    },
  };
}

export default async function CarPage({ params }: { params: any }) {
  const resolvedParams = await Promise.resolve(params);
  const { id } = resolvedParams;
  const car = await fetchCar(id);

  if (!car) notFound();

  const adaptedCar = {
    id: car.id,
    brand: car.brand,
    model: car.model,
    price: car.price,
    financePrice: Math.round(car.price * 0.98),
    monthlyPrice: car.monthlyPrice || Math.round(car.price / 72),
    fuel: car.fuel,
    mileage: car.mileage,
    year: car.year,
    power: car.power,
    location: car.location || "Madrid",
    condition: car.condition || "Seminuevo",
    ivaDeductible: car.ivaDeductible || false,
    images: car.images?.length ? car.images : ["/placeholder.svg"],
    kilometers: car.mileage,
    transmission: car.transmission || "Automática",
    color: car.color,
    doors: car.doors || 5,
    bodyType: car.bodyType,
    environmentalTag: car.environmentalTag,
    drivetrain: car.drivetrain,
    electricRange: car.electricRange,
    batteryCapacity: car.batteryCapacity,
    chargingTime: car.chargingTime,
    fastCharge: car.fastCharge,
    chargingPort: car.chargingPort,
    variant: car.variant,
    features: car.features || [
      "Climatizador automático",
      "Navegador GPS",
      "Bluetooth",
      "Sensores de aparcamiento",
      "Cámara trasera",
      "Control de crucero adaptativo",
      "Asientos calefactables",
      "Techo panorámico",
      "Faros LED",
      "Llantas de aleación",
      "Sistema de sonido premium",
      "Asistente de mantenimiento de carril",
    ],
    description:
      car.description ||
      `Este ${car.brand} ${car.model} ${car.variant} || ""} del año ${car.year} es una excelente opción para quienes buscan un vehículo ${car.fuel.toLowerCase()} de alta calidad. Con ${car.mileage.toLocaleString()} kilómetros, este coche ofrece un rendimiento excepcional y un confort superior.`,
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 mt-16">
        <Suspense fallback={<CarCardSkeleton />}>
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            <div>
              <CarGallery images={adaptedCar.images} />
              <CarInfo car={adaptedCar} />
              <CarFeatures features={adaptedCar.features} />
            </div>
            <div className="lg:sticky lg:top-24 h-fit">
              <CarContact car={adaptedCar} />
            </div>
          </div>
        </Suspense>
      </div>
    </main>
  );
}
