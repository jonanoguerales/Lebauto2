import { FilterKey } from "@/lib/definitions";
import { useDebouncedCallback } from "use-debounce";

interface YearDebounceProps {
        minYear: string;
        maxYear: string;
        setMinYear: (val: string) => void;
        setMaxYear: (val: string) => void;
        setFilter: (key: FilterKey, value: string | number) => void;
        toast: any;
        
}

export function useYearDebounce({ minYear, maxYear, setMinYear, setMaxYear, setFilter, toast }: YearDebounceProps) {

    const debouncedValidateMaxYear = useDebouncedCallback((value: string) => {
        const numValue = Number(value);
        if (Number(minYear) && numValue < Number(minYear)) {
          toast({
            title: "Error",
            description: "El año máximo no puede ser menor que el año mínimo.",
            variant: "destructive",
          });
          setFilter("maxYear", Number(minYear));
          setMaxYear(minYear);
        } else {
          setFilter("maxYear", numValue || new Date().getFullYear());
        }
      }, 500);
    
      const debouncedValidateMinYear = useDebouncedCallback((value: string) => {
        const numValue = Number(value);
        if (Number(maxYear) && numValue > Number(maxYear)) {
          toast({
            title: "Error",
            description: "El año mínimo no puede ser mayor que el año máximo.",
            variant: "destructive",
          });
          setFilter("minYear", Number(maxYear));
          setMinYear(maxYear);
        } else {
          setFilter("minYear", numValue || 1990);
        }
      }, 500);
    
      return { debouncedValidateMaxYear, debouncedValidateMinYear };
}