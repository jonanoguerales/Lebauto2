"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";

interface PriceFilterProps {
  config: {
    minPrice: string;
    setMinPrice: (value: string) => void;
    maxPrice: string;
    setMaxPrice: (value: string) => void;
    debouncedValidateMinPrice: (value: string) => void;
    debouncedValidateMaxPrice: (value: string) => void;
  };
}
export function PriceFilter( { config }: PriceFilterProps) {
  const { minPrice, setMinPrice, maxPrice, setMaxPrice, debouncedValidateMinPrice, debouncedValidateMaxPrice } = config;
  return (
    <AccordionItem value="precio">
      <AccordionTrigger className="py-3">
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          <span>Precio</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4 p-1">
            <div>
              <Label htmlFor="min-price">Mínimo</Label>
              <Input
                id="min-price"
                type="number"
                value={minPrice}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  setMinPrice(e.target.value);
                  debouncedValidateMinPrice(e.target.value);
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="max-price">Máximo</Label>
              <Input
                id="max-price"
                type="number"
                value={maxPrice}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  debouncedValidateMaxPrice(e.target.value);
                }}
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
