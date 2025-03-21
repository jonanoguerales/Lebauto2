"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Calculator, Fuel, Wrench, Euro } from "lucide-react"

export default function SavingsCalculator() {
  const [kmPerYear, setKmPerYear] = useState(15000)
  const [fuelConsumption, setFuelConsumption] = useState(7)
  const [fuelPrice, setFuelPrice] = useState(1.8)
  const [electricityPrice, setElectricityPrice] = useState(0.15)
  const [electricConsumption, setElectricConsumption] = useState(18)
  const [yearsOfUse, setYearsOfUse] = useState(5)

  const [fuelCost, setFuelCost] = useState(0)
  const [electricityCost, setElectricityCost] = useState(0)
  const [maintenanceSavings, setMaintenanceSavings] = useState(0)
  const [totalSavings, setTotalSavings] = useState(0)

  useEffect(() => {
    // Cálculo del coste de combustible (litros por km * precio por litro * km por año * años)
    const fuelCostCalc = (fuelConsumption / 100) * fuelPrice * kmPerYear * yearsOfUse
    setFuelCost(fuelCostCalc)

    // Cálculo del coste de electricidad (kWh por km * precio por kWh * km por año * años)
    const electricityCostCalc = (electricConsumption / 100) * electricityPrice * kmPerYear * yearsOfUse
    setElectricityCost(electricityCostCalc)

    // Estimación de ahorro en mantenimiento (aproximadamente 50% menos)
    const maintenanceCost = kmPerYear * yearsOfUse * 0.03 // 3 céntimos por km para vehículo combustión
    const electricMaintenanceCost = maintenanceCost * 0.5 // 50% menos para eléctrico
    setMaintenanceSavings(maintenanceCost - electricMaintenanceCost)

    // Cálculo del ahorro total
    setTotalSavings(fuelCostCalc - electricityCostCalc + (maintenanceCost - electricMaintenanceCost))
  }, [kmPerYear, fuelConsumption, fuelPrice, electricityPrice, electricConsumption, yearsOfUse])

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Calculadora de ahorro</h2>
            <p className="text-lg text-muted-foreground">
              Descubre cuánto puedes ahorrar al cambiar a un vehículo eléctrico
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="km-per-year">Kilómetros anuales: {kmPerYear.toLocaleString()}</Label>
                </div>
                <Slider
                  id="km-per-year"
                  min={5000}
                  max={50000}
                  step={1000}
                  value={[kmPerYear]}
                  onValueChange={(value) => setKmPerYear(value[0])}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label htmlFor="years-of-use">Años de uso: {yearsOfUse}</Label>
                </div>
                <Slider
                  id="years-of-use"
                  min={1}
                  max={10}
                  step={1}
                  value={[yearsOfUse]}
                  onValueChange={(value) => setYearsOfUse(value[0])}
                />
              </div>

              <Tabs defaultValue="combustion" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="combustion">Vehículo combustión</TabsTrigger>
                  <TabsTrigger value="electric">Vehículo eléctrico</TabsTrigger>
                </TabsList>
                <TabsContent value="combustion" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuel-consumption">Consumo (l/100km)</Label>
                    <Input
                      id="fuel-consumption"
                      type="number"
                      min={3}
                      max={20}
                      step={0.1}
                      value={fuelConsumption}
                      onChange={(e) => setFuelConsumption(Number.parseFloat(e.target.value) || 7)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fuel-price">Precio combustible (€/l)</Label>
                    <Input
                      id="fuel-price"
                      type="number"
                      min={0.5}
                      max={3}
                      step={0.01}
                      value={fuelPrice}
                      onChange={(e) => setFuelPrice(Number.parseFloat(e.target.value) || 1.8)}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="electric" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="electric-consumption">Consumo (kWh/100km)</Label>
                    <Input
                      id="electric-consumption"
                      type="number"
                      min={10}
                      max={30}
                      step={0.1}
                      value={electricConsumption}
                      onChange={(e) => setElectricConsumption(Number.parseFloat(e.target.value) || 18)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="electricity-price">Precio electricidad (€/kWh)</Label>
                    <Input
                      id="electricity-price"
                      type="number"
                      min={0.05}
                      max={0.5}
                      step={0.01}
                      value={electricityPrice}
                      onChange={(e) => setElectricityPrice(Number.parseFloat(e.target.value) || 0.15)}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <Card className="bg-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 text-center">Tu ahorro estimado</h3>

                  <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div className="flex items-center gap-3">
                        <div className="bg-amber-100 p-2 rounded-full">
                          <Fuel className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">Ahorro en combustible</p>
                          <p className="text-sm text-muted-foreground">En {yearsOfUse} años</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold text-green-600">
                        {Math.round(fuelCost - electricityCost).toLocaleString()} €
                      </p>
                    </div>

                    <div className="flex justify-between items-center pb-4 border-b">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Wrench className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">Ahorro en mantenimiento</p>
                          <p className="text-sm text-muted-foreground">En {yearsOfUse} años</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold text-green-600">
                        {Math.round(maintenanceSavings).toLocaleString()} €
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Euro className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Ahorro total</p>
                          <p className="text-sm text-muted-foreground">En {yearsOfUse} años</p>
                        </div>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{Math.round(totalSavings).toLocaleString()} €</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t">
                    <p className="text-center text-sm text-muted-foreground mb-4">
                      Estos cálculos son estimaciones basadas en los datos proporcionados. El ahorro real puede variar.
                    </p>
                    <Button className="w-full" asChild>
                      <Link href="/contacto">Solicitar asesoramiento personalizado</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

