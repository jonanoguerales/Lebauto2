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