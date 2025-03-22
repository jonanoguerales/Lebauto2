"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useViewStore, useFilterStore } from "@/lib/store";
import CarCardGrid from "./CarCardGrid";
import CarCardList from "./CarCardList";
import { CarCardSkeleton } from "./CarSkeleton";
import type { Car } from "@/lib/definitions";

interface CarListProps {
  cars?: Car[];
}

function CarList({ cars: carsProp }: CarListProps) {
  const { view } = useViewStore();
  const { filteredCars, isLoading } = useFilterStore();
  const cars = useMemo(
    () => carsProp ?? filteredCars,
    [carsProp, filteredCars]
  );

  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => setShowSkeleton(true), 300);
      return () => clearTimeout(timer);
    }
    setShowSkeleton(false);
  }, [isLoading]);

  if (showSkeleton) {
    return <LoadingSkeleton />;
  }

  if (cars.length === 0) {
    return <NoResults />;
  }

  return view === "grid" ? (
    <CarGrid cars={cars} />
  ) : (
    <CarListView cars={cars} />
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <CarCardSkeleton key={i} />
      ))}
    </div>
  );
}

function NoResults() {
  return (
    <div className="text-center py-12">
      <h3 className="text-xl font-medium mb-2">No se encontraron vehículos</h3>
      <p className="text-muted-foreground">
        Intenta cambiar los filtros de búsqueda para ver más resultados.
      </p>
    </div>
  );
}

function CarGrid({ cars }: { cars: Car[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCardGrid key={car.id} car={car} />
      ))}
    </div>
  );
}

function CarListView({ cars }: { cars: Car[] }) {
  return (
    <div className="space-y-4">
      {cars.map((car) => (
        <CarCardList key={car.id} car={car} />
      ))}
    </div>
  );
}

export default React.memo(CarList);
