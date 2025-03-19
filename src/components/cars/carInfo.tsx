"use client";

import type { Car } from "@/lib/definitions";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CarInfoProps {
  car: Car;
}

export default function CarInfo({ car }: CarInfoProps) {
  return (
    <div className="mb-8" role="region" aria-labelledby="car-info-title">
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-2">
          <Badge>{car.condition}</Badge>
          {car.ivaDeductible && <Badge variant="outline">IVA Deducible</Badge>}
        </div>

        <h1 id="car-info-title" className="text-3xl font-bold mb-2">
          {car.brand} {car.model}
        </h1>
        <p className="text-xl text-muted-foreground mb-4">{car.variant}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <InfoItem label="Combustible" value={car.fuel} />
          <InfoItem label="Año" value={car.year.toString()} />
          <InfoItem label="Potencia" value={`${car.power} CV`} />
          <InfoItem label="Kilómetros" value={`${car.mileage.toLocaleString()} km`} />
          <InfoItem label="Transmisión" value={car.transmission || "Desconocida"} />
          <InfoItem label="Color" value={car.color} />
          <InfoItem label="Puertas" value={car.doors?.toString() || "Desconocido"} />
          <InfoItem label="Ubicación" value={car.location || "Desconocida"} />
        </div>
      </div>

      <Tabs defaultValue="descripcion">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="descripcion">Descripción</TabsTrigger>
          <TabsTrigger value="detalles">Detalles técnicos</TabsTrigger>
        </TabsList>
        <TabsContent value="descripcion" className="p-4 bg-muted/30 rounded-md mt-2">
          <p>{car.description}</p>
        </TabsContent>
        <TabsContent value="detalles" className="p-4 bg-muted/30 rounded-md mt-2">
          <TechnicalDetails car={car} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-muted-foreground">{label}:</span>{" "}
      <span className="font-medium">{value}</span>
    </div>
  );
}

function TechnicalDetails({ car }: { car: Car }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 className="font-semibold mb-2">Motor</h3>
        <ul className="space-y-1 text-sm">
          <li><InfoItem label="Combustible" value={car.fuel} /></li>
          <li><InfoItem label="Potencia" value={`${car.power} CV`} /></li>
          <li><InfoItem label="Transmisión" value={car.transmission || "Desconocido"} /></li>
          <li><InfoItem label="Consumo combinado" value="5.2 l/100km" /></li>
          <li><InfoItem label="Emisiones CO2" value="118 g/km" /></li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Dimensiones</h3>
        <ul className="space-y-1 text-sm">
          <li><InfoItem label="Longitud" value="4.050 mm" /></li>
          <li><InfoItem label="Anchura" value="1.800 mm" /></li>
          <li><InfoItem label="Altura" value="1.550 mm" /></li>
          <li><InfoItem label="Maletero" value="380 litros" /></li>
          <li><InfoItem label="Peso" value="1.165 kg" /></li>
        </ul>
      </div>
    </div>
  );
}
