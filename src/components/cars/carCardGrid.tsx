import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/utils/utils";
import type { Car } from "@/lib/definitions";

interface CarCardGridProps {
  car: Car;
}

export default function CarCardGrid({ car }: CarCardGridProps) {
  const mainImage = car.images?.[0] || "/placeholder.svg";

  return (
    <Link
      href={`/coches-segunda-mano/${car.slug}`}
      className="block bg-card rounded-lg border shadow-sm hover:shadow-md transition-shadow animate-fade-in"
      aria-label={`Ver detalles del ${car.brand} ${car.model}`}
    >
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <Image src="/logo.webp" width={32} height={32} alt="Logo empresa" className="rounded-full" />
        </div>
        <div className="relative h-48">
          <Image
            src={mainImage}
            alt={`Imagen del ${car.brand} ${car.model}`}
            fill
            className="object-cover rounded-t-lg"
            loading="lazy"
          />
          <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
            1/{car.images?.length || 0}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{car.brand} {car.model}</h3>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{car.variant}</p>

        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <InfoItem label="Combustible" value={car.fuel} />
          <InfoItem label="Año" value={car.year.toString()} />
          <InfoItem label="Potencia" value={`${car.power} CV`} />
          <InfoItem label="Ubicación" value={car.location || "Desconocida"} />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary">En stock</Badge>
          <Badge variant="secondary">{car.condition}</Badge>
          {car.ivaDeductible && <Badge variant="outline">IVA Deducible</Badge>}
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-baseline mb-2">
            <p className="text-xl font-bold text-primary">{formatPrice(car.price)} €</p>
            <p className="text-sm text-muted-foreground">{formatPrice(car.monthlyPrice || 0)} €/mes*</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
