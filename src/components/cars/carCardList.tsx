import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/utils/utils";
import type { Car } from "@/lib/definitions";

interface CarCardListProps {
  car: Car;
}

export default function CarCardList({ car }: CarCardListProps) {
  const mainImage = car.images?.[0] || "/placeholder.svg";

  return (
    <Link
      href={`/coches-segunda-mano/${car.slug}`}
      className="block bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow animate-fade-in"
      aria-label={`Ver detalles del ${car.brand} ${car.model}`}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-[300px]">
          <div className="absolute top-2 right-2 z-10">
            <Image src="/logo.webp" width={32} height={32} alt="Logo empresa" className="rounded-full" />
          </div>
          <Image
            src={mainImage}
            alt={`Imagen del ${car.brand} ${car.model}`}
            fill
            className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            loading="lazy"
          />
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
            1/{car.images?.length || 0}
          </div>
        </div>

        <div className="p-6 flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-semibold mb-2">{car.brand} {car.model}</h3>
              <p className="text-muted-foreground">{car.variant}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 md:justify-items-center gap-4 mt-4">
            <InfoItem label="Combustible" value={car.fuel} />
            <InfoItem label="Año" value={car.year.toString()} />
            <InfoItem label="Potencia" value={`${car.power} CV`} />
            <InfoItem label="Ubicación" value={car.location || "Desconocida"} />
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary">En stock</Badge>
            <Badge variant="secondary">{car.condition}</Badge>
            {car.ivaDeductible && <Badge variant="outline">IVA Deducible</Badge>}
          </div>
        </div>

        <div className="p-6 border-t md:border-l md:border-t-0 bg-muted/10 flex flex-col justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Precio financiado</p>
            <p className="text-2xl font-bold text-primary">{formatPrice(car.financePrice || 0)} €</p>
            <p className="text-sm text-muted-foreground">{formatPrice(car.monthlyPrice || 0)} €/mes*</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Precio al contado</p>
            <p className="text-xl font-semibold">{formatPrice(car.price)} €</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}