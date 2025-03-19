"use client";

import { formatPrice } from "@/utils/utils";
import type { Car } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, Calendar } from "lucide-react";

interface CarContactProps {
  car: Car;
}

export default function CarContact({ car }: CarContactProps) {
  return (
    <div className="space-y-6" role="complementary" aria-labelledby="car-contact-title">
      <Card>
        <CardContent className="p-6">
          <PriceDetails car={car} />
          <div className="flex gap-2 pt-4">
            <Button className="flex-1">
              <Phone className="mr-2 h-4 w-4" /> Llamar
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="mr-2 h-4 w-4" /> Email
            </Button>
          </div>
        </CardContent>
      </Card>

      <ContactForm car={car} />
      <AppointmentCard />
    </div>
  );
}

function PriceDetails({ car }: { car: Car }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-muted-foreground">Precio al contado</p>
        <p className="text-3xl font-bold">{formatPrice(car.price)} €</p>
        {car.ivaDeductible && <p className="text-sm text-green-600">IVA deducible incluido</p>}
      </div>
      <div className="pt-4 border-t">
        <p className="text-sm text-muted-foreground">Financiación desde</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-primary">{formatPrice(car?.monthlyPrice || 0)} €</p>
          <p className="text-sm text-muted-foreground">/mes*</p>
        </div>
        <p className="text-sm text-muted-foreground mt-1">*Sin entrada · 120 meses · TAE 11,1%</p>
      </div>
      <div className="pt-4 border-t">
        <p className="text-sm text-muted-foreground">Garantía</p>
        <p className="font-medium">3 años</p>
      </div>
    </div>
  );
}

function ContactForm({ car }: { car: Car }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Solicitar información</h3>
        <form className="space-y-4">
          <InputField id="name" label="Nombre" placeholder="Tu nombre" />
          <InputField id="email" label="Email" type="email" placeholder="tu@email.com" />
          <InputField id="phone" label="Teléfono" type="tel" placeholder="123 456 789" />
          <div className="space-y-2">
            <Label htmlFor="message">Mensaje</Label>
            <Textarea
              id="message"
              placeholder="Estoy interesado en este vehículo..."
              defaultValue={`Hola, estoy interesado en el ${car.brand} ${car.model} ${car.variant || ""}. ¿Podrían darme más información?`}
              rows={3}
            />
          </div>
          <Button className="w-full">Enviar</Button>
        </form>
      </CardContent>
    </Card>
  );
}

function InputField({ id, label, type = "text", placeholder }: { id: string; label: string; type?: string; placeholder: string }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  );
}

function AppointmentCard() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Concertar cita</h3>
        <p className="text-sm text-muted-foreground mb-4">Reserva una cita para ver este vehículo en nuestro concesionario.</p>
        <Button variant="outline" className="w-full">
          <Calendar className="mr-2 h-4 w-4" /> Reservar cita
        </Button>
      </CardContent>
    </Card>
  );
}
