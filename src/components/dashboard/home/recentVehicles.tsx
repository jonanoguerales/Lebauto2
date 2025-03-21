import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/utils/utils"
import Link from "next/link"

const recentVehicles = [
  {
    id: "1",
    brand: "BMW",
    model: "X5",
    year: 2023,
    price: 85000,
    status: "Disponible",
    addedAt: "2023-12-15",
  },
  {
    id: "2",
    brand: "Mercedes",
    model: "Clase C",
    year: 2022,
    price: 65000,
    status: "Vendido",
    addedAt: "2023-11-28",
  },
  {
    id: "3",
    brand: "Audi",
    model: "Q7",
    year: 2023,
    price: 78000,
    status: "Reservado",
    addedAt: "2023-12-10",
  },
  {
    id: "4",
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 55000,
    status: "Disponible",
    addedAt: "2023-12-05",
  },
  {
    id: "5",
    brand: "Porsche",
    model: "911",
    year: 2022,
    price: 120000,
    status: "Vendido",
    addedAt: "2023-11-20",
  },
]

export function RecentVehicles() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehículos Recientes</CardTitle>
        <CardDescription>Los últimos vehículos añadidos al inventario</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentVehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div>
                <Link href={`/vehiculos/${vehicle.id}`} className="font-medium hover:underline">
                  {vehicle.brand} {vehicle.model} ({vehicle.year})
                </Link>
                <div className="text-sm text-muted-foreground">
                  Añadido el {new Date(vehicle.addedAt).toLocaleDateString()}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-medium">{formatCurrency(vehicle.price)}</div>
                </div>
                <Badge
                  variant={
                    vehicle.status === "Disponible"
                      ? "default"
                      : vehicle.status === "Vendido"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {vehicle.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

