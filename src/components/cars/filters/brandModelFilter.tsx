"use client";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { CarIcon, ChevronDown, ChevronRight, Search, X } from "lucide-react";
import { FiltersData } from "@/lib/definitions";

interface BrandModelFilterProps {
  config: {
    filters: FiltersData;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    displayedBrands: string[];
    modelsByBrand: Record<string, string[]>;
    expandedBrands: Record<string, boolean>;
    handleBrandClick: (brand: string) => void;
    lowerSearch: string;
    selectAllModelsState: Record<string, boolean>;
    handleSelectAllModels: (brand: string, checked: boolean) => void;
    handleModelChange: (model: string, brand: string, checked: boolean) => void;
    filteredBrands: string[];
    showAllBrands: boolean;
    setShowAllBrands: (value: boolean) => void;
  };
}

export function BrandModelFilter({ config }: BrandModelFilterProps) {
  const {
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
  } = config;
  return (
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
              const isExpanded = autoExpand || expandedBrands[brand] || false;
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
                            checked={filters.model?.includes(model) || false}
                            onCheckedChange={(checked) =>
                              handleModelChange(model, brand, checked === true)
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
  );
}
