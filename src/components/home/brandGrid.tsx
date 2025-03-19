import Image from "next/image";
import Link from "next/link";

const brands = [
  { name: "Tesla", logo: "/logos-coches/tesla-logo.png" },
  { name: "Volkswagen", logo: "/logos-coches/vw-logo.png" },
  { name: "BMW", logo: "/logos-coches/bmw-logo.png" },
  { name: "Audi", logo: "/logos-coches/audi-logo.png" },
  { name: "Jaguar", logo: "/logos-coches/jaguar-logo.png" },
  { name: "Porsche", logo: "/logos-coches/porsche-logo.png" },
  { name: "Renault", logo: "/logos-coches/renault-logo.png" },
  { name: "Peugeot", logo: "/logos-coches/peugeot-logo.png" },
  { name: "Mercedes Benz", logo: "/logos-coches/mercedes-logo.png" },
  { name: "Ford", logo: "/logos-coches/ford-logo.png" },
  { name: "Land Rover", logo: "/logos-coches/land-rover-logo.png" },
  { name: "Toyota", logo: "/logos-coches/toyota-logo.png" },
];

export default function BrandGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-6 xl:p-4" role="region" aria-labelledby="brand-grid-title">
      <h2 id="brand-grid-title" className="sr-only">Marcas de coches disponibles</h2>
      {brands.map((brand, index) => (
        <BrandCard key={brand.name} brand={brand} hidden={index >= 6} />
      ))}
    </div>
  );
}

function BrandCard({ brand, hidden }: { brand: { name: string; logo: string }; hidden: boolean }) {
  return (
    <Link
      href={`/coches-segunda-mano?brand=${brand.name}`}
      className={`bg-gray-300 rounded-lg p-4 flex flex-col items-center gap-3 hover:shadow-md hover:border-gray-600 hover:border-4 border-4 border-transparent transition-shadow 
      ${hidden ? "hidden md:flex" : ""}`}
      aria-label={`Explorar coches de la marca ${brand.name}`}
    >
      <div className="w-20 h-14 xl:w-24 xl:h-16 relative">
        <Image
          src={brand.logo || "/placeholder.svg"}
          alt={`Logo de ${brand.name}`}
          fill
          className="object-contain"
          loading="lazy"
        />
      </div>
      <span className="font-medium">{brand.name}</span>
    </Link>
  );
}