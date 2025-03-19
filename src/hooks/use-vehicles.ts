"use client"

import { useState, useEffect } from "react"

// Define the Vehicle type
interface Vehicle {
  id: string
  brand: string
  model: string
  year: number
  price: number
  status: string
  color: string
  fuelType: string
  transmission: string
  mileage: number
}

// Datos iniciales para demostración
const initialVehicles: Vehicle[] = [
  {
    id: "1",
    brand: "BMW",
    model: "X5",
    year: 2023,
    price: 85000,
    status: "Disponible",
    color: "Negro",
    fuelType: "Diésel",
    transmission: "Automática",
    mileage: 0,
  },
  {
    id: "2",
    brand: "Mercedes",
    model: "Clase C",
    year: 2022,
    price: 65000,
    status: "Vendido",
    color: "Blanco",
    fuelType: "Gasolina",
    transmission: "Automática",
    mileage: 15000,
  },
  {
    id: "3",
    brand: "Audi",
    model: "Q7",
    year: 2023,
    price: 78000,
    status: "Reservado",
    color: "Gris",
    fuelType: "Híbrido",
    transmission: "Automática",
    mileage: 5000,
  },
  {
    id: "4",
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 55000,
    status: "Disponible",
    color: "Rojo",
    fuelType: "Eléctrico",
    transmission: "Automática",
    mileage: 2000,
  },
  {
    id: "5",
    brand: "Porsche",
    model: "911",
    year: 2022,
    price: 120000,
    status: "Vendido",
    color: "Amarillo",
    fuelType: "Gasolina",
    transmission: "Automática",
    mileage: 8000,
  },
  {
    id: "6",
    brand: "Volkswagen",
    model: "Golf",
    year: 2021,
    price: 28000,
    status: "Disponible",
    color: "Azul",
    fuelType: "Gasolina",
    transmission: "Manual",
    mileage: 25000,
  },
  {
    id: "7",
    brand: "Toyota",
    model: "RAV4",
    year: 2022,
    price: 38000,
    status: "Disponible",
    color: "Verde",
    fuelType: "Híbrido",
    transmission: "Automática",
    mileage: 18000,
  },
  {
    id: "8",
    brand: "Ford",
    model: "Mustang",
    year: 2023,
    price: 65000,
    status: "Reservado",
    color: "Negro",
    fuelType: "Gasolina",
    transmission: "Manual",
    mileage: 1000,
  },
]

export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])

  // Simular carga de datos
  useEffect(() => {
    // En una aplicación real, aquí se cargarían los datos desde una API
    setVehicles(initialVehicles)
  }, [])

  const addVehicle = (vehicle: Vehicle) => {
    setVehicles((prev) => [...prev, vehicle])
  }

  const updateVehicle = (updatedVehicle: Vehicle) => {
    setVehicles((prev) => prev.map((vehicle) => (vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle)))
  }

  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id))
  }

  return {
    vehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
  }
}

