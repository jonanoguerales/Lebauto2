import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

export default function CategoriesSection() {
  return (
    <section
      className="bg-white py-20"
      role="region"
      aria-labelledby="categories-title"
    >
      <div className="container mx-auto">
        <h2
          id="categories-title"
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center"
        >
          Nuestras Categorías
        </h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <div className="flex justify-end gap-2">
            <CarouselPrevious className="relative left-0 top-0" />
            <CarouselNext className="relative left-0 top-0" />
          </div>
          <CarouselContent className="-ml-4 py-8">
            <CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/4 lg:basis-1/6">
              <Link href="/coches-segunda-mano">
                <div className="relative bg-gray-900 rounded-xl p-6 shadow-lg hover:bg-gray-700 transition-colors h-32">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Eléctricos
                  </h3>
                  <Image
                    src="/seccion-categorias/electrico-img.png"
                    width={120}
                    height={120}
                    alt="Muestra catálogo de vehículos eléctricos"
                    className="absolute left-[4px] bottom-[-25px]"
                  />
                </div>
              </Link>
            </CarouselItem>
            <CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/4 lg:basis-1/6">
              <Link
                href="/coches-segunda-mano"
                aria-label="Ver coches de la categoría Ocasión"
              >
                <div className="relative bg-gray-900 rounded-xl p-6 shadow-lg hover:bg-gray-700 transition-colors h-32">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Ocasión
                  </h3>
                  <Image
                    src="/seccion-categorias/ocasion-img.png"
                    width={130}
                    height={120}
                    alt="Muestra catálogo de vehículos de ocasión"
                    className="absolute left-[-10px] bottom-[-25px]"
                    priority
                  />
                </div>
              </Link>
            </CarouselItem>
            <CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/4 lg:basis-1/6">
              <Link
                href="/coches-segunda-mano"
                aria-label="Ver coches de la categoría Km0"
              >
                <div className="relative bg-gray-900 rounded-xl p-6 shadow-lg hover:bg-gray-700 transition-colors h-32">
                  <h3 className="text-xl font-semibold mb-2 text-white">Km0</h3>
                  <Image
                    src="/seccion-categorias/km0-img.png"
                    width={140}
                    height={120}
                    alt="Muestra catálogo de vehículos Km0"
                    className="absolute left-[-10px] bottom-[-30px]"
                    priority
                  />
                </div>
              </Link>
            </CarouselItem>
            <CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/4 lg:basis-1/6">
              <Link
                href="/coches-segunda-mano"
                aria-label="Ver coches de la categoría Furgonetas"
              >
                <div className="relative bg-gray-900 rounded-xl p-6 shadow-lg hover:bg-gray-700 transition-colors h-32">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Furgonetas
                  </h3>
                  <Image
                    src="/seccion-categorias/furgoneta-img.png"
                    width={120}
                    height={120}
                    alt="Muestra catálogo de furgonetas"
                    className="absolute left-0 bottom-[-25px]"
                    priority
                  />
                </div>
              </Link>
            </CarouselItem>
            <CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/4 lg:basis-1/6">
              <Link
                href="/coches-segunda-mano"
                aria-label="Ver coches de la categoría Caravanas"
              >
                <div className="relative bg-gray-900 rounded-xl p-6 shadow-lg hover:bg-gray-700 transition-colors h-32">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Caravanas
                  </h3>
                  <Image
                    src="/seccion-categorias/caravana-img.png"
                    width={120}
                    height={120}
                    alt="Muestra catálogo de Caravanas"
                    className="absolute left-[10px] bottom-[-25px]"
                    priority
                  />
                </div>
              </Link>
            </CarouselItem>
            <CarouselItem className="pl-4 sm:basis-1/2 md:basis-1/4 lg:basis-1/6">
              <Link
                href="/coches-segunda-mano"
                aria-label="Ver coches de la categoría Cargadores"
              >
                <div className="relative bg-gray-900 rounded-xl p-6 shadow-lg hover:bg-gray-700 transition-colors h-32">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    Cargadores
                  </h3>
                  <Image
                    src="/seccion-categorias/cargador-img.png"
                    width={70}
                    height={60}
                    alt="Muestra catálogo de cargadores eléctricos"
                    className="absolute left-0 bottom-[-25px]"
                    priority
                  />
                </div>
              </Link>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
