import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "Valoración gratuita de tu vehículo",
  "Gestión completa de la documentación",
  "Pago inmediato y seguro",
  "Sin complicaciones ni intermediarios",
  "Nos encargamos de todo el proceso",
];

export default function SellYourCarSection() {
  return (
    <section className="py-20 bg-white" role="region" aria-labelledby="sell-your-car-title">
      <div className="container mx-auto grid md:grid-cols-2 gap-28 md:gap-12 items-center">
        <div className="order-2 md:order-1">
          <h2 id="sell-your-car-title" className="text-3xl md:text-4xl font-bold mb-6">
            Gestionamos la venta de tu coche
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            ¿Quieres vender tu coche sin complicaciones? Nosotros nos encargamos de todo el proceso, desde la
            valoración hasta la gestión de la documentación, para que tú solo tengas que preocuparte de recibir el dinero.
          </p>

          <ul className="space-y-3 mb-8">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <Button asChild size="lg" className="group" aria-label="Ir a la página de gestión de venta">
            <Link href="/gestion-de-venta">
              Vender mi coche
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="order-1 md:order-2 relative flex justify-center">
          <div className="relative w-full max-w-xs md:max-w-lg h-[250px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
            <Image 
              src="/seccion-gestion-coche.webp" 
              alt="Imagen de la gestión de venta de coches" 
              fill 
              className="object-cover" 
              priority 
            />
          </div>
          <div className="absolute -bottom-[5.5rem] md:-bottom-6 -right-2 md:left-auto md:right-6 bg-primary text-white p-4 rounded-lg shadow-lg text-center w-48 md:w-auto">
            <p className="text-xl font-bold">¡Valoración gratuita!</p>
            <p>Sin compromiso</p>
          </div>
        </div>
      </div>
    </section>
  );
}