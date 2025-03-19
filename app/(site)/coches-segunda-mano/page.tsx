import type { Metadata } from "next";
import { cars } from "@/lib/placeholder-data";
import CatalogClient from "@/components/cars/catalogClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Coches de segunda mano - Concesionario",
  description: "Explora nuestra amplia selección de vehículos de segunda mano, de ocasión y km 0.",
};

async function getFilteredCars(searchParams: any) {
  let filteredCars = cars;

  const filters = ["brand", "model", "fuel", "color", "location"];
  filters.forEach((key) => {
    const paramValue = searchParams[key];
    if (typeof paramValue === "string") {
      const values = paramValue.split(",").map(v => v.trim());
      filteredCars = filteredCars.filter(car => values.includes(String(car[key as keyof typeof car] || "")));
    }
  });

  if (typeof searchParams.minPrice === "string") {
    filteredCars = filteredCars.filter(car => car.price >= Number(searchParams.minPrice));
  }
  if (typeof searchParams.maxPrice === "string") {
    filteredCars = filteredCars.filter(car => car.price <= Number(searchParams.maxPrice));
  }
  if (typeof searchParams.minYear === "string") {
    filteredCars = filteredCars.filter(car => car.year >= Number(searchParams.minYear));
  }
  if (typeof searchParams.maxYear === "string") {
    filteredCars = filteredCars.filter(car => car.year <= Number(searchParams.maxYear));
  }
  if (typeof searchParams.minKm === "string") {
    filteredCars = filteredCars.filter(car => car.mileage >= Number(searchParams.minKm));
  }
  if (typeof searchParams.maxKm === "string") {
    filteredCars = filteredCars.filter(car => car.mileage <= Number(searchParams.maxKm));
  }

  return { allCars: cars, filteredCars };
}

export default async function CatalogPage({ searchParams }: { searchParams: any}) {
  const params = await Promise.resolve(searchParams);
  const { allCars, filteredCars } = await getFilteredCars(params);

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
