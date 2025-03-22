import { FilterKey } from "@/lib/definitions";
import { useDebouncedCallback } from "use-debounce";

interface useKmDebounceParams {
    minKm: string;
    maxKm: string;
    setMinKm: (val: string) => void;
    setMaxKm: (val: string) => void;
    setFilter: (key: FilterKey, value: string | number) => void;
    toast: any;
}

export function useKmDebounce({ minKm, maxKm, setMinKm, setMaxKm, setFilter, toast }: useKmDebounceParams) {

  const debouncedValidateMaxKm = useDebouncedCallback((value: string) => {
    const numValue = Number(value);
    if (Number(minKm) && numValue < Number(minKm)) {
      toast({
        title: "Error",
        description:
          "Los kilómetros máximos no pueden ser menores que los kilómetros mínimos.",
        variant: "destructive",
      });
      setFilter("maxKm", Number(minKm));
      setMaxKm(minKm);
    } else {
      setFilter("maxKm", numValue || 500000);
    }
  }, 500);

  const debouncedValidateMinKm = useDebouncedCallback((value: string) => {
    const numValue = Number(value);
    if (Number(maxKm) && numValue > Number(maxKm)) {
      toast({
        title: "Error",
        description:
          "Los kilómetros mínimos no pueden ser mayores que los kilómetros máximos.",
        variant: "destructive",
      });
      setFilter("minKm", Number(maxKm));
      setMinKm(maxKm);
    } else {
      setFilter("minKm", numValue || 0);
    }
  }, 500);

  return { debouncedValidateMaxKm, debouncedValidateMinKm };
}
