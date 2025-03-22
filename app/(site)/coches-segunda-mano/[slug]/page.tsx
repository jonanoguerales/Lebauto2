import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CarGallery from "@/components/cars/CarGallery";
import CarInfo from "@/components/cars/CarInfo";
import CarFeatures from "@/components/cars/CarFeatures";
import CarContact from "@/components/cars/CarContact";
import { CarCardSkeleton } from "@/components/cars/CarSkeleton";
import { Suspense } from "react";
import { fetchCarDetailsBySlug } from "@/supabase/supabase";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const paramsResolved = await Promise.resolve(params);
  const { slug } = paramsResolved;
  const car = await fetchCarDetailsBySlug(slug);

  if (!car) {
    return {
      title: "Vehículo no encontrado",
      description:
        "Este vehículo no se encuentra disponible en nuestra base de datos.",
    };
  }
  return {
    title: `${car.brand} ${car.model} - Lebauto`,
    description: `Descubre el ${car.brand} ${car.model} del año ${
      car.year
    } con ${car.mileage.toLocaleString()} km, disponible por ${car.price.toLocaleString()}€.`,
    openGraph: {
      images: car.images?.[0] || "/placeholder.svg",
    },
  };
}

export default async function CarPage({
  params,
}: {
  params: any;
}) {
  const paramsResolved = await Promise.resolve(params);
  const { slug } = paramsResolved;
  const car = await fetchCarDetailsBySlug(slug);
  if (!car) notFound();

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 mt-16">
        <Suspense fallback={<CarCardSkeleton />}>
          <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
            <div>
              <CarGallery images={car.images} />
              <CarInfo car={car} />
              <CarFeatures features={car.features} />
            </div>
            <div className="lg:sticky lg:top-24 h-fit">
              <CarContact car={car} />
            </div>
          </div>
        </Suspense>
      </div>
    </main>
  );
}
