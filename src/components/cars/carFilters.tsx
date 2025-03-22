"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin, Palette, X, Fuel, Gauge, Calendar1 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFilterStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/useToast";
import { BrandModelFilter } from "./filters/BrandModelFilter";
import { PriceFilter } from "./filters/PriceFilter";
import { usePriceDebounce } from "@/hooks/usePriceDebounce";
import { useYearDebounce } from "@/hooks/useYearDebounce";
import { useKmDebounce } from "@/hooks/useKmDebounce";
import { YearFilter } from "./filters/YearFilter";
import { KmFilter } from "./filters/KmFilter";
import { FuelFilter } from "./filters/FuelFilter";
import { ColorFilter } from "./filters/ColorFilter";
import { LocationFilter } from "./filters/LocationFilter";

export default function CarFilters({
  isOpen = false,
  toggleMenu,
}: {
  isOpen?: boolean;
  toggleMenu?: () => void;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();

  const {
    filters,
    setFilter,
    filteredCars,
    removeFilter,
    clearFilters,
    allCars,
  } = useFilterStore();

  const [minPrice, setMinPrice] = useState<string>(
    filters.minPrice?.toString() || "0"
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    filters.maxPrice?.toString() || "100000"
  );
  const [minYear, setMinYear] = useState<string>(
    filters.minYear?.toString() || "1990"
  );
  const [maxYear, setMaxYear] = useState<string>(
    filters.maxYear?.toString() || new Date().getFullYear().toString()
  );
  const [minKm, setMinKm] = useState<string>(filters.minKm?.toString() || "0");
  const [maxKm, setMaxKm] = useState<string>(
    filters.maxKm?.toString() || "500000"
  );

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedBrands, setExpandedBrands] = useState<Record<string, boolean>>(
    {}
  );
  const [selectAllModelsState, setSelectAllModelsState] = useState<
    Record<string, boolean>
  >({});

  const lowerSearch = searchTerm.toLowerCase();

  const uniqueBrands = useMemo(
    () => Array.from(new Set(allCars.map((car) => car.brand))),
    [allCars]
  );
  const modelsByBrand = useMemo(() => {
    const res: Record<string, string[]> = {};
    uniqueBrands.forEach((brand) => {
      res[brand] = Array.from(
        new Set(
          allCars.filter((car) => car.brand === brand).map((car) => car.model)
        )
      );
    });
    return res;
  }, [allCars, uniqueBrands]);

  const filteredBrands = useMemo(() => {
    return uniqueBrands.filter((brand) => {
      const brandMatches = brand.toLowerCase().includes(lowerSearch);
      const modelMatches = modelsByBrand[brand].some((model) =>
        model.toLowerCase().includes(lowerSearch)
      );
      return searchTerm === "" || brandMatches || modelMatches;
    });
  }, [uniqueBrands, lowerSearch, searchTerm, modelsByBrand]);

  const [showAllBrands, setShowAllBrands] = useState<boolean>(false);
  const displayedBrands = useMemo(
    () => (showAllBrands ? filteredBrands : filteredBrands.slice(0, 6)),
    [filteredBrands, showAllBrands]
  );

  const uniqueColors = useMemo(
    () => Array.from(new Set(allCars.map((car) => car.color))),
    [allCars]
  );
  const uniqueFuels = useMemo(
    () => Array.from(new Set(allCars.map((car) => car.fuel))),
    [allCars]
  );
  const uniqueLocations = useMemo(
    () =>
      Array.from(
        new Set(
          allCars.filter((car) => car.location).map((car) => car.location!)
        )
      ),
    [allCars]
  );

  useEffect(() => {
    const updateUrl = () => {
      const params = new URLSearchParams();
      if (filters.brand && filters.brand.length > 0)
        params.set("brand", filters.brand.join(","));
      if (filters.model && filters.model.length > 0)
        params.set("model", filters.model.join(","));
      if (filters.color && filters.color.length > 0)
        params.set("color", filters.color.join(","));
      if (filters.fuel && filters.fuel.length > 0)
        params.set("fuel", filters.fuel.join(","));
      if (filters.location && filters.location.length > 0)
        params.set("location", filters.location.join(","));
      if (filters.minPrice !== undefined)
        params.set("minPrice", filters.minPrice.toString());
      if (filters.maxPrice !== undefined)
        params.set("maxPrice", filters.maxPrice.toString());
      if (filters.minYear !== undefined)
        params.set("minYear", filters.minYear.toString());
      if (filters.maxYear !== undefined)
        params.set("maxYear", filters.maxYear.toString());
      if (filters.minKm !== undefined)
        params.set("minKm", filters.minKm.toString());
      if (filters.maxKm !== undefined)
        params.set("maxKm", filters.maxKm.toString());

      const newUrl = params.toString()
        ? `/coches-segunda-mano?${params.toString()}`
        : "/coches-segunda-mano";

      router.replace(newUrl, { scroll: false });
    };

    updateUrl();
  }, [filters]);

  useEffect(() => {
    const newState: Record<string, boolean> = {};
    if (filters.brand) {
      filters.brand.forEach((brand) => {
        const modelsForBrand = modelsByBrand[brand] || [];
        const modelsSelected =
          filters.model?.filter((m) => modelsForBrand.includes(m)) || [];
        newState[brand] = modelsSelected.length === 0;
      });
    }
    setSelectAllModelsState(newState);
  }, [filters.brand, filters.model, modelsByBrand]);

  const handleBrandClick = (brand: string) => {
    setExpandedBrands((prev) => ({ ...prev, [brand]: !prev[brand] }));
  };

  const handleSelectAllModels = (brand: string, checked: boolean) => {
    setSelectAllModelsState((prev) => ({ ...prev, [brand]: checked }));
    if (checked) {
      modelsByBrand[brand].forEach((model) => {
        if (filters.model?.includes(model)) removeFilter("model", model);
      });
      if (!filters.brand?.includes(brand)) {
        setFilter("brand", brand);
      }
    } else {
      removeFilter("brand", brand);
      modelsByBrand[brand].forEach((model) => {
        if (filters.model?.includes(model)) removeFilter("model", model);
      });
      setSelectAllModelsState((prev) => ({ ...prev, [brand]: false }));
    }
  };

  const handleModelChange = (
    model: string,
    brand: string,
    checked: boolean
  ) => {
    if (checked) {
      if (filters.brand?.includes(brand)) {
        removeFilter("brand", brand);
      }
      setFilter("model", model);
      setSelectAllModelsState((prev) => ({ ...prev, [brand]: false }));
    } else {
      removeFilter("model", model);
      const modelsLeft =
        filters.model?.filter((m) => modelsByBrand[brand].includes(m)) || [];
      if (modelsLeft.length === 0) {
        setSelectAllModelsState((prev) => ({ ...prev, [brand]: false }));
      }
    }
  };

  const handleColorChange = (color: string, checked: boolean) => {
    if (checked) setFilter("color", color);
    else removeFilter("color", color);
  };

  const handleFuelChange = (fuel: string, checked: boolean) => {
    if (checked) setFilter("fuel", fuel);
    else removeFilter("fuel", fuel);
  };

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) setFilter("location", location);
    else removeFilter("location", location);
  };

  const handleClearFilters = () => {
    clearFilters();
    setMinPrice("0");
    setMaxPrice("100000");
    setMinYear("1990");
    setMaxYear(new Date().getFullYear().toString());
    setMinKm("0");
    setMaxKm("500000");
    setSearchTerm("");
    setExpandedBrands({});
    setSelectAllModelsState({});
    router.push("/coches-segunda-mano");
  };

  const handleRemoveFilter = (type: string, value: string) => {
    if (type === "brand") {
      removeFilter("brand", value);
      setSelectAllModelsState((prev) => ({ ...prev, [value]: false }));
      const modelsToRemove = modelsByBrand[value] || [];
      modelsToRemove.forEach((model) => {
        if (filters.model?.includes(model)) removeFilter("model", model);
      });
    } else if (type === "model") {
      removeFilter("model", value);
      const brand = uniqueBrands.find((b) => modelsByBrand[b]?.includes(value));
      if (brand) {
        const remaining =
          filters.model?.filter((m) => modelsByBrand[brand].includes(m)) || [];
        if (remaining.length === 0 && filters.brand?.includes(brand)) {
          removeFilter("brand", brand);
          setSelectAllModelsState((prev) => ({ ...prev, [brand]: false }));
        }
      }
    } else if (type === "color") {
      removeFilter("color", value);
    } else if (type === "fuel") {
      removeFilter("fuel", value);
    } else if (type === "location") {
      removeFilter("location", value);
    } else if (type === "price") {
      removeFilter("minPrice");
      removeFilter("maxPrice");
      setMinPrice("0");
      setMaxPrice("100000");
    } else if (type === "year") {
      removeFilter("minYear");
      removeFilter("maxYear");
      setMinYear("1990");
      setMaxYear(new Date().getFullYear().toString());
    } else if (type === "km") {
      removeFilter("minKm");
      removeFilter("maxKm");
      setMinKm("0");
      setMaxKm("500000");
    }
  };

  const getActiveFilters = (): { type: string; value: string }[] => {
    const active: { type: string; value: string }[] = [];
    if (filters.model && filters.model.length > 0) {
      filters.model.forEach((model) =>
        active.push({ type: "model", value: model })
      );
    }
    if (filters.brand) {
      filters.brand.forEach((brand) => {
        const modelsForBrand = modelsByBrand[brand] || [];
        const modelsSelected =
          filters.model?.filter((m) => modelsForBrand.includes(m)) || [];
        if (modelsSelected.length === 0)
          active.push({ type: "brand", value: brand });
      });
    }
    if (filters.color) {
      filters.color.forEach((color) =>
        active.push({ type: "color", value: color })
      );
    }
    if (filters.fuel) {
      filters.fuel.forEach((fuel) =>
        active.push({ type: "fuel", value: fuel })
      );
    }
    if (filters.location) {
      filters.location.forEach((location) =>
        active.push({ type: "location", value: location })
      );
    }
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      active.push({
        type: "price",
        value: `Precio: ${filters.minPrice || 0}€ - ${
          filters.maxPrice || 1000000
        }€`,
      });
    }
    if (filters.minYear !== undefined || filters.maxYear !== undefined) {
      active.push({
        type: "year",
        value: `Año: ${filters.minYear || 1990} - ${
          filters.maxYear || new Date().getFullYear()
        }`,
      });
    }
    if (filters.minKm !== undefined || filters.maxKm !== undefined) {
      active.push({
        type: "km",
        value: `Km: ${filters.minKm || 0} - ${filters.maxKm || 500000}`,
      });
    }
    return active;
  };

  const activeFiltersArray = useMemo(
    () => getActiveFilters(),
    [filters, modelsByBrand, uniqueBrands]
  );

  const { debouncedValidateMinPrice, debouncedValidateMaxPrice } =
    usePriceDebounce({
      minPrice,
      maxPrice,
      setMinPrice,
      setMaxPrice,
      setFilter,
      toast,
    });
  const { debouncedValidateMinYear, debouncedValidateMaxYear } =
    useYearDebounce({
      minYear,
      maxYear,
      setMinYear,
      setMaxYear,
      setFilter,
      toast,
    });
  const { debouncedValidateMinKm, debouncedValidateMaxKm } = useKmDebounce({
    minKm,
    maxKm,
    setMinKm,
    setMaxKm,
    setFilter,
    toast,
  });

  const brandModelConfig = {
    filters,
    searchTerm,
    setSearchTerm,
    displayedBrands,
    modelsByBrand,
    expandedBrands,
    handleBrandClick,
    lowerSearch,
    selectAllModelsState,
    handleSelectAllModels,
    handleModelChange,
    filteredBrands,
    showAllBrands,
    setShowAllBrands,
  };

  const PriceFilterConfig = {
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    debouncedValidateMinPrice,
    debouncedValidateMaxPrice,
  };

  const YearFilterConfig = {
    minYear,
    setMinYear,
    maxYear,
    setMaxYear,
    debouncedValidateMinYear,
    debouncedValidateMaxYear,
    currentYear,
  };

  const KmFilterConfig = {
    minKm,
    setMinKm,
    maxKm,
    setMaxKm,
    debouncedValidateMinKm,
    debouncedValidateMaxKm,
  };

  return (
    <div className="space-y-6 p-6 flex flex-col justify-between h-full">
      <div className="flex flex-col h-full overflow-x-hidden overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Filtros</h2>
          {isOpen && (
            <button
              className="lg:hidden flex items-center justify-center "
              onClick={toggleMenu}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        {activeFiltersArray.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Tu búsqueda</h3>
              <Button
                variant="link"
                className="text-sm h-auto p-0"
                onClick={handleClearFilters}
              >
                Eliminar filtros
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {activeFiltersArray.map((filter, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {filter.value}
                  <button
                    onClick={() =>
                      handleRemoveFilter(filter.type, filter.value)
                    }
                    className="ml-1 rounded-full hover:bg-muted p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
        <Accordion type="multiple" defaultValue={["marca"]}>
          <BrandModelFilter config={brandModelConfig} />

          <PriceFilter config={PriceFilterConfig} />

          <YearFilter config={YearFilterConfig} />

          <KmFilter config={KmFilterConfig} />

          <FuelFilter
            filters={filters}
            handleFuelChange={handleFuelChange}
            uniqueFuels={uniqueFuels}
          />

          <ColorFilter
            uniqueColors={uniqueColors}
            filters={filters}
            handleColorChange={handleColorChange}
          />

          <LocationFilter
            uniqueLocations={uniqueLocations}
            filters={filters}
            handleLocationChange={handleLocationChange}
          />
        </Accordion>
      </div>
      <div>
        <Button onClick={toggleMenu} className="lg:hidden w-full bg-gray-900">
          Ver resultados ({filteredCars.length})
        </Button>
      </div>
    </div>
  );
}
