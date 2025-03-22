"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar1 } from "lucide-react";
interface YearFilterProps {
  config: {
    minYear: string;
    setMinYear: (value: string) => void;
    maxYear: string;
    setMaxYear: (value: string) => void;
    debouncedValidateMinYear: (value: string) => void;
    debouncedValidateMaxYear: (value: string) => void;
    currentYear: number;
  };
}
export function YearFilter({ config }: YearFilterProps) {
  const {
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    debouncedValidateMinYear,
    debouncedValidateMaxYear,
    currentYear,
  } = config;
  return (
    <AccordionItem value="año">
      <AccordionTrigger className="py-3">
        <div className="flex items-center gap-2">
          <Calendar1 className="h-5 w-5" />
          <span>Año</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4 p-1">
            <div>
              <Label htmlFor="min-year">Desde</Label>
              <Input
                id="min-year"
                type="number"
                max={currentYear}
                value={minYear}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  setMinYear(e.target.value);
                  debouncedValidateMinYear(e.target.value);
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="max-year">Hasta</Label>
              <Input
                id="max-year"
                type="number"
                value={maxYear}
                onFocus={(e) => e.target.select()}
                onChange={(e) => {
                  setMaxYear(e.target.value);
                  debouncedValidateMaxYear(e.target.value);
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
