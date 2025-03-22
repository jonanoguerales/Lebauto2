"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CarCardGrid from "@/components/cars/CarCardGrid";
import { fetchElectricVehicles } from "@/supabase/supabase";
import type { Car } from "@/lib/definitions";
import { CarCardSkeleton } from "@/components/cars/CarSkeleton";

export default function ElectricVehiclesSection() {
  const [electricVehicles, setElectricVehicles] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadElectricVehicles = async () => {
      setIsLoading(true);
      try {
        const vehicles = await fetchElectricVehicles(4);
        setElectricVehicles(vehicles);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadElectricVehicles();
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Vehículos eléctricos</h2>
            <p className="text-muted-foreground mt-2">
              Descubre nuestra selección de vehículos 100% eléctricos
            </p>
          </div>
          <Button variant="outline" className="group" asChild>
            <Link href="/coches-segunda-mano?fuel=Eléctrico">
              Ver todos los vehículos eléctricos
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <CarCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {electricVehicles.map((vehicle) => (
              <CarCardGrid key={vehicle.id} car={vehicle} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
