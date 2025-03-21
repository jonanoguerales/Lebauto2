import { Car } from "@/lib/definitions";

// Función para convertir de camelCase a snake_case (para enviar a la BD)
export function mapCarToDB(car: Partial<Car>): any {
    return {
      id: car.id,
      brand: car.brand,
      model: car.model,
      variant: car.variant,
      condition: car.condition,
      price: car.price,
      location: car.location,
      year: car.year,
      mileage: car.mileage,
      body_type: car.bodyType,
      fuel: car.fuel,
      transmission: car.transmission,
      environmental_tag: car.environmentalTag,
      drivetrain: car.drivetrain,
      power: car.power,
      engine_displacement: car.engineDisplacement,
      color: car.color,
      doors: car.doors,
      electric_range: car.electricRange,
      battery_capacity: car.batteryCapacity,
      charging_time: car.chargingTime,
      fast_charge: car.fastCharge,
      charging_port: car.chargingPort,
      iva_deductible: car.ivaDeductible,
      monthly_price: car.monthlyPrice,
      finance_price: car.financePrice,
      description: car.description,
      slug: car.slug,
      // Las imágenes y características se manejan en tablas separadas.
    };
  }
  
  // Función para convertir de snake_case (datos de BD) a camelCase (tu interfaz)
  export function mapCarFromDB(car: any): Car {
    return {
      id: car.id,
      brand: car.brand,
      model: car.model,
      variant: car.variant,
      condition: car.condition,
      price: car.price,
      location: car.location,
      year: car.year,
      mileage: car.mileage,
      bodyType: car.body_type,
      fuel: car.fuel,
      transmission: car.transmission,
      environmentalTag: car.environmental_tag,
      drivetrain: car.drivetrain,
      power: car.power,
      engineDisplacement: car.engine_displacement,
      color: car.color,
      doors: car.doors,
      electricRange: car.electric_range,
      batteryCapacity: car.battery_capacity,
      chargingTime: car.charging_time,
      fastCharge: car.fast_charge,
      chargingPort: car.charging_port,
      ivaDeductible: car.iva_deductible,
      monthlyPrice: car.monthly_price,
      financePrice: car.finance_price,
      description: car.description,
      images: car.images, // Se rellenará en los métodos que consulten la tabla de imágenes.
      features: car.features, // Se rellenará en los métodos que consulten la tabla de características.
      slug: car.slug,
    };
  }
  