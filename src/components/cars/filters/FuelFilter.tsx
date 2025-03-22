"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FiltersData } from "@/lib/definitions";

import { Fuel } from "lucide-react";

interface FuelFilterProps {
    uniqueFuels: string[];
    filters: FiltersData;
    handleFuelChange: (fuel: string, checked: boolean) => void;
}
export function FuelFilter({ uniqueFuels, filters, handleFuelChange }: FuelFilterProps) {

  return (
    <AccordionItem value="combustible">
    <AccordionTrigger className="py-3">
      <div className="flex items-center gap-2">
        <Fuel className="h-5 w-5" />
        <span>Combustible</span>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2 py-2">
        {uniqueFuels.map((fuel) => (
          <div key={fuel} className="flex items-center space-x-2">
            <Checkbox
              id={`fuel-${fuel}`}
              checked={filters.fuel?.includes(fuel) || false}
              onCheckedChange={(checked) =>
                handleFuelChange(fuel, checked === true)
              }
            />
            <Label htmlFor={`fuel-${fuel}`}>{fuel}</Label>
          </div>
        ))}
      </div>
    </AccordionContent>
  </AccordionItem>
  );
}
