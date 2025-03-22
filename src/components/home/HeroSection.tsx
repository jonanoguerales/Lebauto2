import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[60vh] flex items-center overflow-hidden"
      role="banner"
    >
      <Image
        src="/imgHome.avif"
        alt="Luxury Car"
        fill
        priority
        className="object-cover flex-1"
      />

      <div className="absolute inset-0 flex-1 bg-gradient-to-b from-black/80 via-black/50 to-black" />

      <div className="relative z-10 container mx-auto py-16 md:py-24 flex-1">
        <div className="max-w-2xl flex flex-col space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Concesionario de vehículos de ocasión
          </h1>
          <p className="text-lg md:text-xl text-gray-300">
            Los mejores coches de segunda mano con garantía y al mejor precio
          </p>
          <Link
            href="/coches-segunda-mano"
            className="bg-white text-black font-semibold px-8 py-2 text-base md:text-lg rounded-[0.5rem] hover:opacity-80 w-max"
            aria-label="Ver catálogo de coches de segunda mano"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}
