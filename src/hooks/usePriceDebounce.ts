import { FilterKey } from "@/lib/definitions";
import { useDebouncedCallback } from "use-debounce";

interface UsePriceDebounceParams {
  minPrice: string;
  maxPrice: string;
  setMinPrice: (val: string) => void;
  setMaxPrice: (val: string) => void;
  setFilter: (key: FilterKey, value: string | number) => void;
  toast: any; 
}

export function usePriceDebounce({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  setFilter,
  toast,
}: UsePriceDebounceParams) {

  const debouncedValidateMinPrice = useDebouncedCallback((value: string) => {
    const numValue = Number(value);
    if (Number(maxPrice) && numValue > Number(maxPrice)) {
      toast({
        title: "Error",
        description: "El precio mínimo no puede ser mayor que el precio máximo.",
        variant: "destructive",
      });
      setFilter("minPrice", Number(maxPrice));
      setMinPrice(maxPrice);
    } else {
      setFilter("minPrice", numValue || 0);
    }
  }, 500);

  const debouncedValidateMaxPrice = useDebouncedCallback((value: string) => {
    const numValue = Number(value);
    if (Number(minPrice) && numValue < Number(minPrice)) {
      toast({
        title: "Error",
        description: "El precio máximo no puede ser menor que el precio mínimo.",
        variant: "destructive",
      });
      setFilter("maxPrice", Number(minPrice));
      setMaxPrice(minPrice);
    } else {
      setFilter("maxPrice", numValue || 1000000);
    }
  }, 500);

  return { debouncedValidateMinPrice, debouncedValidateMaxPrice };
}
