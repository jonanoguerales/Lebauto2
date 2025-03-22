import type { Metadata } from "next";
import CatalogClient from "@/components/cars/CatalogClient";
import { fetchFilteredCars } from "@/supabase/fetchFilteredCars";
import { fetchCars } from "@/supabase/supabase";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Coches de segunda mano - Concesionario",
  description:
    "Explora nuestra amplia selección de vehículos de segunda mano, de ocasión y km 0.",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const params = await Promise.resolve(searchParams);
  const filteredCars = await fetchFilteredCars(params);
  const allCars = await fetchCars();

/*   if (!filteredCars) {
    return <div>Cargando vehículos...</div>;
  } */
  return (
    <CatalogClient
      allCars={allCars}
      initialCars={filteredCars}
      brand={typeof params.brand === "string" ? params.brand : ""}
      model={typeof params.model === "string" ? params.model : ""}
      fuel={typeof params.fuel === "string" ? params.fuel : ""}
      color={typeof params.color === "string" ? params.color : ""}
      location={typeof params.location === "string" ? params.location : ""}
      minPrice={typeof params.minPrice === "string" ? params.minPrice : ""}
      maxPrice={typeof params.maxPrice === "string" ? params.maxPrice : ""}
      minYear={typeof params.minYear === "string" ? params.minYear : ""}
      maxYear={typeof params.maxYear === "string" ? params.maxYear : ""}
      minKm={typeof params.minKm === "string" ? params.minKm : ""}
      maxKm={typeof params.maxKm === "string" ? params.maxKm : ""}
    />
  );
}
