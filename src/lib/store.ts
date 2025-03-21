"use client"

import { create } from "zustand"
import type { Car, FiltersData, FilterStateStore } from "./definitions"

type ViewType = "list" | "grid"

interface ViewState {
  view: ViewType
  setView: (view: ViewType) => void
}

export const useViewStore = create<ViewState>((set) => ({
  view: "list",
  setView: (view) => set({ view }),
}))

export const useFilterStore = create<FilterStateStore>((set, get) => ({
  filters: {},
  filteredCars: [],
  allCars: [],
  isLoading: false,

  setFilter: (key : keyof FiltersData, value) => {
    set((state) => {
      const newFilters = { ...state.filters };

      if (
        key === "brand" ||
        key === "model" ||
        key === "fuel" ||
        key === "location" ||
        key === "color"
      ) {
        if (!newFilters[key]) {
          newFilters[key] = [];
        }
        const arr = newFilters[key] as string[];
        if (!arr.includes(value as string)) {
          arr.push(value as string);
        }
      } else {
        newFilters[key] = value as number;
      }

      return { filters: newFilters, isLoading: true };
    });

    setTimeout(() => get().applyFilters(), 0);
  },

  removeFilter: (key, value) => {
    set((state) => {
      const newFilters = { ...state.filters };

      if (
        key === "brand" ||
        key === "model" ||
        key === "fuel" ||
        key === "location" ||
        key === "color"
      ) {
        if (value !== undefined) {
          const arr = newFilters[key] as string[];
          newFilters[key] = arr.filter((v) => v !== value);
          if ((newFilters[key] as string[]).length === 0) {
            delete newFilters[key];
          }
        } else {
          delete newFilters[key];
        }
      } else {
        delete newFilters[key];
      }

      return { filters: newFilters, isLoading: true };
    });

    setTimeout(() => get().applyFilters(), 0);
  },

  clearFilters: () => {
    set({
      filters: {},
      isLoading: true,
    });

    setTimeout(() => {
      const { allCars } = get();
      set({
        filteredCars: [...allCars],
        isLoading: false,
      });
    }, 0);
  },

  setFilteredCars: (cars) => {
    set({ filteredCars: cars, isLoading: false });
  },

  setAllCars: (cars) => {
    set({ allCars: cars, filteredCars: cars });
  },

  setIsLoading: (isLoading) => {
    set({ isLoading });
  },

  applyFilters: () => {
    const { allCars, filters } = get();
    set({ isLoading: true });
  
    setTimeout(() => {
      try {
        if (Object.keys(filters).length === 0) {
          set({ filteredCars: [...allCars], isLoading: false });
          return;
        }
  
        let filtered = [...allCars];

        if ((filters.brand && filters.brand.length > 0) || 
            (filters.model && filters.model.length > 0)) {
          let brandFiltered: Car[] = [];
          if (filters.brand && filters.brand.length > 0) {
            const brandSet = new Set(filters.brand);
            brandFiltered = filtered.filter((car) => brandSet.has(car.brand));
          }
  
          let modelFiltered: Car[] = [];
          if (filters.model && filters.model.length > 0) {
            const modelSet = new Set(filters.model);
            modelFiltered = filtered.filter((car) => modelSet.has(car.model));
          }
  
          const unionSet = new Set([...brandFiltered, ...modelFiltered]);
          filtered = [...unionSet];
        }
  
        if (filters.fuel && filters.fuel.length > 0) {
          const fuelSet = new Set(filters.fuel);
          filtered = filtered.filter((car) => fuelSet.has(car.fuel));
        }
  
        if (filters.location && filters.location.length > 0) {
          const locSet = new Set(filters.location);
          filtered = filtered.filter(
            (car) => car.location && locSet.has(car.location)
          );
        }
  
        if (filters.color && filters.color.length > 0) {
          const colorSet = new Set(filters.color);
          filtered = filtered.filter((car) => colorSet.has(car.color));
        }
  
        if (filters.minPrice !== undefined) {
          filtered = filtered.filter(
            (car) => (car.price || 0) >= (filters.minPrice || 0)
          );
        }
        if (filters.maxPrice !== undefined) {
          filtered = filtered.filter(
            (car) => (car.price || 0) <= (filters.maxPrice || 0)
          );
        }

        if (filters.minYear !== undefined) {
          filtered = filtered.filter(
            (car) => (car.year || 0) >= (filters.minYear || 0)
          );
        }
        if (filters.maxYear !== undefined) {
          filtered = filtered.filter(
            (car) => (car.year || 0) <= (filters.maxYear || 0)
          );
        }
  
        if (filters.minKm !== undefined) {
          filtered = filtered.filter(
            (car) => (car.mileage || 0) >= (filters.minKm || 0)
          );
        }
        if (filters.maxKm !== undefined) {
          filtered = filtered.filter(
            (car) => (car.mileage || 0) <= (filters.maxKm || 0)
          );
        }
  
        set({ filteredCars: filtered, isLoading: false });
  
      } catch (error) {
        console.error("Error applying filters:", error);
        set({ filteredCars: [...allCars], isLoading: false });
      }
    }, 0);
  },
  
  getActiveFiltersCount: () => {
    const { filters } = get();
    let count = 0;
    for (const key in filters) {
      const typedKey = key as keyof FiltersData;
      const value = filters[typedKey];
      if (Array.isArray(value)) {
        count += value.length;
      } else if (value !== undefined && value !== null) {
        count += 1; 
      }
    }
    return count;
  },
  
}));


