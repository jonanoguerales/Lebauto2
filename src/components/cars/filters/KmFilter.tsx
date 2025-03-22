"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gauge } from "lucide-react";

interface KmFilterProps {
  config: {
    minKm: string;
    setMinKm: (value: string) => void;
    maxKm: string;
    setMaxKm: (value: string) => void;
    debouncedValidateMinKm: (value: string) => void;
    debouncedValidateMaxKm: (value: string) => void;
  };
}
export function KmFilter({ config }: KmFilterProps) {
  const {
    minKm,
    setMinKm,
    maxKm,
    setMaxKm,
    debouncedValidateMinKm,
    debouncedValidateMaxKm,
  } = config;
  return (
    <AccordionItem value="km">
      <AccordionTrigger className="py-3">
        <div className="flex items-center gap-2">
          <Gauge className="h-5 w-5" />
          <span>Kilómetros</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4 p-1">
            <div>
              <Label htmlFor="min-km">Desde</Label>
              <Input
                id="min-km"
                type="number"
                value={minKm}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  setMinKm(e.target.value);
                  debouncedValidateMinKm(e.target.value);
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="max-km">Hasta</Label>
              <Input
                id="max-km"
                type="number"
                value={maxKm}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  setMaxKm(e.target.value);
                  debouncedValidateMaxKm(e.target.value);
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
