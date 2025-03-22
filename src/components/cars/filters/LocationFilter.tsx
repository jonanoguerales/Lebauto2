"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FiltersData } from "@/lib/definitions";

import { MapPin } from "lucide-react";

interface LocationFilterProps {
    uniqueLocations: string[];
    filters: FiltersData;
    handleLocationChange: (location: string, checked: boolean) => void;
}
export function LocationFilter({ uniqueLocations, filters, handleLocationChange }: LocationFilterProps) {

  return (
    <AccordionItem value="ubicacion" className="mb-4">
    <AccordionTrigger className="py-3">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5" />
        <span>Ubicación</span>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2 py-2">
        {uniqueLocations.map((location) => (
          <div key={location} className="flex items-center space-x-2">
            <Checkbox
              id={`location-${location}`}
              checked={filters.location?.includes(location) || false}
              onCheckedChange={(checked) =>
                handleLocationChange(location, checked === true)
              }
            />
            <Label htmlFor={`location-${location}`}>{location}</Label>
          </div>
        ))}
      </div>
    </AccordionContent>
  </AccordionItem>
  );
}
