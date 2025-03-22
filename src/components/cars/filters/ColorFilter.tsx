"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FiltersData } from "@/lib/definitions";
import { Palette } from "lucide-react";


interface ColorFilterProps {
    uniqueColors: string[];
    filters: FiltersData;
    handleColorChange: (color: string, checked: boolean) => void;
}
export function ColorFilter({ uniqueColors, filters, handleColorChange }: ColorFilterProps) {

  return (
    <AccordionItem value="color">
    <AccordionTrigger className="py-3">
      <div className="flex items-center gap-2">
        <Palette className="h-5 w-5" />
        <span>Color</span>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2 py-2">
        {uniqueColors.map((color) => (
          <div key={color} className="flex items-center space-x-2">
            <Checkbox
              id={`color-${color}`}
              checked={filters.color?.includes(color) || false}
              onCheckedChange={(checked) =>
                handleColorChange(color, checked === true)
              }
            />
            <Label htmlFor={`color-${color}`}>{color}</Label>
          </div>
        ))}
      </div>
    </AccordionContent>
  </AccordionItem>
  );
}
