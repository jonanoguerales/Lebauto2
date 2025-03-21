"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Car as CarIcon,
  MapPin,
  Palette,
  ChevronDown,
  ChevronRight,
  X,
  Search,
  Fuel,
  Gauge,
  Calendar1,
  DollarSign,
} from "lucide-react";
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
import { useDebouncedCallback } from "use-debounce";

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

      if (newUrl !== window.location.pathname + window.location.search) {
        router.replace(newUrl, { scroll: false });
      }
    };
    const timeoutId = setTimeout(updateUrl, 500);
    return () => clearTimeout(timeoutId);
  }, [filters, router]);

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
  
  const debouncedValidateMinPrice = useDebouncedCallback((value: string) => {
    const numValue = Number(value);
    if (Number(maxPrice) && numValue > Number(maxPrice)) {
      toast({
        title: "Error",
        description:
        "El precio mínimo no puede ser mayor que el precio máximo.",
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
        description:
          "El precio máximo no puede ser menor que el precio mínimo.",
        variant: "destructive",
      });
      setFilter("maxPrice", Number(minPrice));
      setMaxPrice(minPrice);
    } else {
      setFilter("maxPrice", numValue || 1000000);
    }
  }, 500);

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
          <AccordionItem value="marca">
            <AccordionTrigger className="py-3">
              <div className="flex items-center gap-2">
                <CarIcon className="h-5 w-5" />
                <span>Marca y modelo</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="p-3">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Buscar marca o modelo..."
                    className="pl-10 pr-4"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                      aria-label="Borrar búsqueda"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="space-y-4 max-h-96 overflow-auto custom-scrollbar">
                  {displayedBrands.map((brand) => {
                    const autoExpand =
                      searchTerm !== "" &&
                      modelsByBrand[brand].some((model) =>
                        model.toLowerCase().includes(lowerSearch)
                      );
                    const isExpanded =
                      autoExpand || expandedBrands[brand] || false;
                    return (
                      <div key={brand} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleBrandClick(brand)}
                            className="flex items-center space-x-2 font-medium hover:text-primary"
                          >
                            {isExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                            <span>{brand}</span>
                          </button>
                        </div>
                        {isExpanded && (
                          <div className="ml-6 space-y-2 border-l-2 pl-4">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`all-models-${brand}`}
                                checked={selectAllModelsState[brand] || false}
                                onCheckedChange={(checked) =>
                                  handleSelectAllModels(brand, checked === true)
                                }
                              />
                              <Label
                                htmlFor={`all-models-${brand}`}
                                className="font-medium"
                              >
                                Todos los modelos
                              </Label>
                            </div>
                            {modelsByBrand[brand]?.map((model) => (
                              <div
                                key={`${brand}-${model}`}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`model-${brand}-${model}`}
                                  checked={
                                    filters.model?.includes(model) || false
                                  }
                                  onCheckedChange={(checked) =>
                                    handleModelChange(
                                      model,
                                      brand,
                                      checked === true
                                    )
                                  }
                                />
                                <Label htmlFor={`model-${brand}-${model}`}>
                                  {model}
                                </Label>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {filteredBrands.length > 6 && (
                  <Button
                    variant="link"
                    className="mt-4 w-full text-center"
                    onClick={() => setShowAllBrands(!showAllBrands)}
                  >
                    {showAllBrands ? "Ver menos" : "Ver todas las marcas"}
                  </Button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
          {/* Precio */}
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
                      value={maxPrice} // estado local
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

          {/* Año */}
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

          {/* Kilómetros */}
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

          {/* Combustible */}
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

          {/* Color */}
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

          {/* Ubicación */}
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
