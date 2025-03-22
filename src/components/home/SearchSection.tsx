"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { cars } from "@/lib/placeholder-data";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function SearchSection() {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const uniqueBrands = useMemo(() => Array.from(new Set(cars.map((car) => car.brand))), []);
  const filteredModels = useMemo(() =>
    selectedBrand && selectedBrand !== "all"
      ? Array.from(new Set(cars.filter((car) => car.brand === selectedBrand).map((car) => car.model)))
      : [],
    [selectedBrand]
  );

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (selectedBrand && selectedBrand !== "all") query.set("brand", selectedBrand);
    if (selectedModel && selectedModel !== "all") query.set("model", selectedModel);
    router.push(`/coches-segunda-mano?${query.toString()}`);
  };

  return (
    <section className="relative z-10 -mt-16 pb-8" role="search">
      <div className="container mx-auto">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select onValueChange={setSelectedBrand}>
              <SelectTrigger className="w-full" aria-label="Seleccionar marca">
                <SelectValue placeholder="Selecciona marca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las marcas</SelectItem>
                {uniqueBrands.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select onValueChange={setSelectedModel}>
              <SelectTrigger className="w-full" aria-label="Seleccionar modelo">
                <SelectValue placeholder="Selecciona modelo" />
              </SelectTrigger>
              <SelectContent>
                {filteredModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button onClick={handleSearch} className="w-full bg-gray-900 hover:bg-gray-700 text-white px-8 text-lg" aria-label="Buscar coches">
              <Search className="mr-2 h-5 w-5" />
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
