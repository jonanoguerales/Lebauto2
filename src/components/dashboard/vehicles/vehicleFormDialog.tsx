"use client";

import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Car } from "@/lib/definitions";

const vehicleSchema = z.object({
  id: z.string().optional(),
  brand: z.string().min(1, "La marca es obligatoria"),
  model: z.string().min(1, "El modelo es obligatorio"),
  variant: z.string().optional(),
  condition: z.string().min(1, "El estado es obligatorio"),
  price: z.coerce.number().positive("El precio debe ser mayor a 0"),
  location: z.string().optional(),
  year: z.coerce
    .number()
    .int()
    .min(1900, "El año debe ser mayor a 1900")
    .max(new Date().getFullYear() + 1),
  mileage: z.coerce
    .number()
    .nonnegative("El kilometraje no puede ser negativo"),
  body_type: z.string().optional(),
  fuel: z.string().min(1, "El tipo de combustible es obligatorio"),
  transmission: z.string().optional(),
  environmental_tag: z.string().optional(),
  drivetrain: z.string().optional(),
  power: z.coerce.number().optional(),
  engine_displacement: z.coerce.number().optional(),
  color: z.string().min(1, "El color es obligatorio"),
  doors: z.coerce
    .number()
    .int()
    .min(1, "El número de puertas debe ser al menos 1"),
  electric_range: z.coerce.number().optional(),
  battery_capacity: z.coerce.number().optional(),
  charging_time: z.coerce.number().optional(),
  fast_charge: z.boolean().optional(),
  charging_port: z.string().optional(),
  iva_deductible: z.boolean().optional(),
  monthly_price: z.coerce.number().optional(),
  finance_price: z.coerce.number().optional(),
  description: z.string().optional(),
  images: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

interface VehicleFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Car | null;
  onSave: (vehicle: Car) => void;
}

export function VehicleFormDialog({
  open,
  onOpenChange,
  vehicle,
  onSave,
}: VehicleFormDialogProps) {
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      brand: "",
      model: "",
      variant: "",
      condition: "Nuevo",
      price: 0,
      location: "",
      year: new Date().getFullYear(),
      mileage: 0,
      body_type: "",
      fuel: "",
      transmission: "",
      environmental_tag: "",
      drivetrain: "",
      power: 0,
      engine_displacement: 0,
      color: "",
      doors: 5,
      electric_range: 0,
      battery_capacity: 0,
      charging_time: 0,
      fast_charge: false,
      charging_port: "",
      iva_deductible: false,
      monthly_price: 0,
      finance_price: 0,
      description: "",
      images: [],
      features: [],
    },
  });

  useEffect(() => {
    if (vehicle) {
      form.reset({
        id: vehicle.id,
        brand: vehicle.brand || "",
        model: vehicle.model || "",
        variant: vehicle.variant || "",
        condition: vehicle.condition || "Nuevo",
        price: vehicle.price || 0,
        location: vehicle.location || "",
        year: vehicle.year || new Date().getFullYear(),
        mileage: vehicle.mileage || 0,
        body_type: vehicle.bodyType || "",
        fuel: vehicle.fuel || "",
        transmission: vehicle.transmission || "",
        environmental_tag: vehicle.environmentalTag || "",
        drivetrain: vehicle.drivetrain || "",
        power: vehicle.power || 0,
        engine_displacement: vehicle.engineDisplacement || 0,
        color: vehicle.color || "",
        doors: vehicle.doors || 5,
        electric_range: vehicle.electricRange || 0,
        battery_capacity: vehicle.batteryCapacity || 0,
        charging_time: vehicle.chargingTime || 0,
        fast_charge: vehicle.fastCharge || false,
        charging_port: vehicle.chargingPort || "",
        iva_deductible: vehicle.ivaDeductible || false,
        monthly_price: vehicle.monthlyPrice || 0,
        finance_price: vehicle.financePrice || 0,
        description: vehicle.description || "",
        images: vehicle.images || [],
        features: vehicle.features || [],
      });
    } else {
      form.reset({
        brand: "",
        model: "",
        variant: "",
        condition: "Nuevo",
        price: 0,
        location: "",
        year: new Date().getFullYear(),
        mileage: 0,
        body_type: "",
        fuel: "",
        transmission: "",
        environmental_tag: "",
        drivetrain: "",
        power: 0,
        engine_displacement: 0,
        color: "",
        doors: 5,
        electric_range: 0,
        battery_capacity: 0,
        charging_time: 0,
        fast_charge: false,
        charging_port: "",
        iva_deductible: false,
        monthly_price: 0,
        finance_price: 0,
        description: "",
        images: [],
        features: [],
      });
    }
  }, [vehicle, form]);

  const onSubmit = (data: VehicleFormValues) => {
    onSave({
      id: data.id || crypto.randomUUID(),
      brand: data.brand,
      model: data.model,
      variant: data.variant,
      condition: data.condition,
      price: data.price,
      location: data.location,
      year: data.year,
      mileage: data.mileage,
      bodyType: data.body_type || "",
      fuel: data.fuel,
      transmission: data.transmission || "",
      environmentalTag: data.environmental_tag || "",
      drivetrain: data.drivetrain,
      power: data.power,
      engineDisplacement: data.engine_displacement,
      color: data.color,
      doors: data.doors,
      electricRange: data.electric_range,
      batteryCapacity: data.battery_capacity,
      chargingTime: data.charging_time,
      fastCharge: data.fast_charge,
      chargingPort: data.charging_port,
      ivaDeductible: data.iva_deductible,
      monthlyPrice: data.monthly_price,
      financePrice: data.finance_price,
      description: data.description,
      images: data.images,
      features: data.features,
    });
  };

  const showElectricFields =
    form.watch("fuel") === "Eléctrico" ||
    form.watch("fuel") === "Híbrido enchufable";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {vehicle ? "Editar Vehículo" : "Añadir Vehículo"}
          </DialogTitle>
          <DialogDescription>
            {vehicle
              ? "Modifica los detalles del vehículo y guarda los cambios."
              : "Completa los detalles del nuevo vehículo para añadirlo al inventario."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="technical">Técnico</TabsTrigger>
                <TabsTrigger value="pricing">Precios</TabsTrigger>
                <TabsTrigger value="description">Descripción</TabsTrigger>
              </TabsList>

              {/* Pestaña de información general */}
              <TabsContent value="general" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="brand"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Marca</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: BMW" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="model"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Modelo</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: X5" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="variant"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Variante</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: xDrive40i" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un estado" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Nuevo">Nuevo</SelectItem>
                            <SelectItem value="Seminuevo">Seminuevo</SelectItem>
                            <SelectItem value="Ocasión">Ocasión</SelectItem>
                            <SelectItem value="KM0">KM0</SelectItem>
                            <SelectItem value="Vendido">Vendido</SelectItem>
                            <SelectItem value="Reservado">Reservado</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Año</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mileage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Kilometraje</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Negro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="doors"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Puertas</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ubicación</FormLabel>
                        <FormControl>
                          <Input placeholder="Ej: Madrid" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="body_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tipo de carrocería</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="SUV">SUV</SelectItem>
                            <SelectItem value="Berlina">Sedán</SelectItem>
                            <SelectItem value="Cabrio">Hatchback</SelectItem>
                            <SelectItem value="Coupe">Coupé</SelectItem>
                            <SelectItem value="Familiar">Familiar</SelectItem>
                            <SelectItem value="Monovolumen">
                              Monovolumen
                            </SelectItem>
                            <SelectItem value="Pickup">Pickup</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="environmental_tag"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Etiqueta medioambiental</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona una etiqueta" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="0">Sin etiqueta</SelectItem>
                            <SelectItem value="B">B</SelectItem>
                            <SelectItem value="C">C</SelectItem>
                            <SelectItem value="ECO">ECO</SelectItem>
                            <SelectItem value="CERO">CERO</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              {/* Pestaña de información técnica */}
              <TabsContent value="technical" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="fuel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Combustible</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Gasolina">Gasolina</SelectItem>
                            <SelectItem value="Diésel">Diésel</SelectItem>
                            <SelectItem value="Híbrido">Híbrido</SelectItem>
                            <SelectItem value="Híbrido enchufable">
                              Híbrido enchufable
                            </SelectItem>
                            <SelectItem value="Eléctrico">Eléctrico</SelectItem>
                            <SelectItem value="GLP">GLP</SelectItem>
                            <SelectItem value="GNC">GNC</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="transmission"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transmisión</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Manual">Manual</SelectItem>
                            <SelectItem value="Automática">
                              Automática
                            </SelectItem>
                            <SelectItem value="Semiautomática">
                              Semiautomática
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="drivetrain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tracción</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un tipo" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Delantera">Delantera</SelectItem>
                            <SelectItem value="Trasera">Trasera</SelectItem>
                            <SelectItem value="4x4">4x4</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="power"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Potencia (CV)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="engine_displacement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cilindrada (cc)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {showElectricFields && (
                  <div className="border p-4 rounded-md space-y-4">
                    <h3 className="font-medium">
                      Información específica para vehículos eléctricos/híbridos
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="electric_range"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Autonomía eléctrica (km)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="battery_capacity"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Capacidad de batería (kWh)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="charging_time"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tiempo de carga (horas)</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="charging_port"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de conector</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Selecciona un tipo" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Tipo 1">Tipo 1</SelectItem>
                                <SelectItem value="Tipo 2">Tipo 2</SelectItem>
                                <SelectItem value="CCS">CCS</SelectItem>
                                <SelectItem value="CHAdeMO">CHAdeMO</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="fast_charge"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Carga rápida</FormLabel>
                            <FormDescription>
                              El vehículo dispone de capacidad de carga rápida
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </TabsContent>

              {/* Pestaña de precios */}
              <TabsContent value="pricing" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio (€)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="finance_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Precio financiado (€)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="monthly_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cuota mensual (€)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="iva_deductible"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>IVA deducible</FormLabel>
                        <FormDescription>
                          El IVA de este vehículo es deducible para empresas
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </TabsContent>

              {/* Pestaña de descripción */}
              <TabsContent value="description" className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe el vehículo con detalle..."
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
