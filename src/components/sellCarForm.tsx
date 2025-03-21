"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/useToast"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { submitSellCarForm } from "@/lib/actions"
import type { SellCarFormData } from "@/lib/actions"

export default function SellCarForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<SellCarFormData>({
    name: "",
    email: "",
    phone: "",
    brand: "",
    model: "",
    year: "",
    kilometers: "",
    fuel: "",
    comments: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await submitSellCarForm(formData)

      if (result.success) {
        toast({
          title: "Solicitud enviada",
          description: result.message,
        })

        setFormData({
          name: "",
          email: "",
          phone: "",
          brand: "",
          model: "",
          year: "",
          kilometers: "",
          fuel: "",
          comments: "",
        })
      } else {
        toast({
          title: "Error al enviar",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error al enviar",
        description: "Ha ocurrido un error. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const fuelTypes = ["Gasolina", "Diésel", "Híbrido", "Eléctrico", "GLP", "Otro"]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString())

  return (
    <Card className="shadow-lg border-0">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="sell-car-form-title">
          <div className="space-y-4">
            <h3  id="sell-car-form-title" className="text-lg font-semibold">Datos personales</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="123 456 789"
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Datos del vehículo</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Ej: Audi, BMW, Mercedes..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Modelo</Label>
                <Input
                  id="model"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="Ej: A4, Serie 3, Clase C..."
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">Año</Label>
                <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona año" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="kilometers">Kilómetros</Label>
                <Input
                  id="kilometers"
                  name="kilometers"
                  type="number"
                  value={formData.kilometers}
                  onChange={handleChange}
                  placeholder="Ej: 120000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fuel">Combustible</Label>
                <Select value={formData.fuel} onValueChange={(value) => handleSelectChange("fuel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo de combustible" />
                  </SelectTrigger>
                  <SelectContent>
                    {fuelTypes.map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>
                        {fuel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Comentarios adicionales</Label>
              <Textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                placeholder="Cuéntanos más sobre tu vehículo (estado, equipamiento, etc.)"
                rows={4}
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Solicitar valoración gratuita"
            )}
          </Button>

          <p className="text-sm text-center text-gray-500">
            Al enviar este formulario, aceptas nuestra política de privacidad y el tratamiento de tus datos.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

