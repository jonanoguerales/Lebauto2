export interface Car {
  id: string;
  brand: string;
  model: string;
  variant?: string;
  condition: string;
  price: number;
  location?: string; 
  year: number;
  mileage: number; 
  bodyType: string;
  fuel: string; 
  transmission: string; 
  environmentalTag: string;
  drivetrain?: string;
  power?: number;
  engineDisplacement?: number; 
  color: string;
  doors: number;
  electricRange?: number; 
  batteryCapacity?: number; 
  chargingTime?: number; 
  fastCharge?: boolean; 
  chargingPort?: string;
  images: string[]; 
  ivaDeductible?: boolean; 
  monthlyPrice?: number; 
  financePrice?: number;
  features?: string[]; 
  description?: string; 
  slug?: string;
}


export interface CatalogClientProps {
  allCars: Car[]
  initialCars: Car[]
  brand?: string | string[]
  model?: string | string[]
  fuel?: string;
  color?: string;
  location?: string;
  minPrice?: string;
  maxPrice?: string;
  minYear?: string;
  maxYear?: string;
  minKm?: string;
  maxKm?: string;
}

export interface FilterState {
  brands: string[]
  models: string[]
  colors: string[]
  fuels: string[]
  locations: string[]
  minPrice: number
  maxPrice: number
  minYear: number
  maxYear: number
  minKm: number
  maxKm: number
}

export interface CarImage {
  id: string
  car_id: string
  image_url: string
  created_at?: string
}

export interface Feature {
  id: string
  name: string
}

export interface CarFeature {
  car_id: string
  feature_id: string
}
export interface FiltersData {
  brand?: string[];
  model?: string[];
  color?: string[];
  fuel?: string[];
  location?: string[];
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  minKm?: number;
  maxKm?: number;
};

// Claves que son array de string
export type ArrayFilterKey = "brand" | "model" | "fuel" | "location" | "color";

// Claves que son numéricas
export type NumberFilterKey = "minPrice" | "maxPrice" | "minYear" | "maxYear" | "minKm" | "maxKm";

// Union de todas las claves
export type FilterKey = ArrayFilterKey | NumberFilterKey;

export interface FilterStateStore {
  filters: FiltersData;
  filteredCars: Car[];
  allCars: Car[];
  isLoading: boolean;
  getActiveFiltersCount: () => number;
  // setFilter recibe la clave y el valor (string o number)
  setFilter: (key: FilterKey, value: string | number) => void;
  // removeFilter: clave y valor string (en caso de arrays). Si es numérico, se ignora el value.
  removeFilter: (key: FilterKey, value?: string) => void;
  clearFilters: () => void;
  setFilteredCars: (cars: Car[]) => void;
  setAllCars: (cars: Car[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  applyFilters: () => void;
}