import BrandGrid from "@/components/home/BrandGrid";
import ContactButtons from "@/components/ContactButtons";
import CategoriesSection from "@/components/home/CategoriesSection";
import HeroSection from "@/components/home/HeroSection";
import SearchSection from "@/components/home/SearchSection";
import SellYourCarSection from "@/components/home/SellYourCarSection";
import Link from "next/link";
import type { Metadata } from "next";
import ElectricVehiclesSection from "@/components/home/ElectricVehiclesSection";
import ElectricChargersSection from "@/components/home/ElectricShargersSection";
import WhyElectricSection from "@/components/home/WhyElectricSection";
import SavingsCalculator from "@/components/home/SavingsCalculator";
import SubsidiesSection from "@/components/home/SubsidiesSection";

export const metadata: Metadata = {
  title:
    "Lebauto | Concesionario de Coches Eléctricos y de Segunda Mano | Vehículos Sostenibles",
  description:
    "Compra tu coche de segunda mano, ocasión, eléctricos o Km 0 en Lebauto. Vehículos revisados, con garantía y financiación. Ofrecemos soluciones de carga, financiación especializada y asesoramiento en ayudas y subvenciones para la movilidad sostenible.",
  keywords: [
    "coches segunda mano",
    "coches km0",
    "concesionario coches",
    "Lebauto",
    "coches eléctricos",
    "vehículos segunda mano",
    "cargadores eléctricos",
    "concesionario sostenible",
    "km0",
    "financiación vehículos eléctricos",
    "ayudas movilidad eléctrica",
  ],
  openGraph: {
    title:
      "Lebauto | Concesionario de Coches Eléctricos y de Segunda Mano | Vehículos Sostenibles",
    description:
      "Compra tu coche de segunda mano, ocasión, eléctricos o Km 0 en Lebauto. Vehículos revisados, con garantía y financiación. Ofrecemos soluciones de carga, financiación especializada y asesoramiento en ayudas y subvenciones para la movilidad sostenible.",
    type: "website",
    locale: "es_ES",
    url: "https://lebauto.vercel.app",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SearchSection />
      <CategoriesSection />
      <ElectricVehiclesSection />
      <SellYourCarSection />
      <section className="py-20 bg-muted/40">
        <div className="container mx-auto flex flex-col items-center gap-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Encuentra tu marca favorita
          </h2>
          <BrandGrid />
          <Link
            href="/coches-segunda-mano"
            className="bg-black text-white font-semibold px-8 py-3 text-base md:text-lg rounded-lg hover:bg-gray-300 transition-colors hover:text-black w-max"
          >
            Ver todas las marcas
          </Link>
        </div>
      </section>
      <ElectricChargersSection />
      <WhyElectricSection />
      <SavingsCalculator />
      <SubsidiesSection />
      <ContactButtons />

      {/* Datos estructurados para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Lebauto",
            description:
              "Concesionario de Coches Eléctricos y de Segunda Mano. Especialistas en vehículos eléctricos de segunda mano, km0 y nuevos. Ofrecemos soluciones de carga, financiación especializada y asesoramiento en ayudas y subvenciones para la movilidad sostenible.",
            url: "https://lebauto.vercel.app",
            telephone: "+34912345678",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Avenida de los Coches, 123",
              addressLocality: "Madrid",
              postalCode: "28001",
              addressCountry: "ES",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "40.4168",
              longitude: "-3.7038",
            },
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ],
                opens: "09:00",
                closes: "20:00",
              },
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: "Saturday",
                opens: "10:00",
                closes: "14:00",
              },
            ],
            sameAs: [
              "https://www.facebook.com/lebauto",
              "https://www.instagram.com/lebauto",
              "https://twitter.com/lebauto",
            ],
          }),
        }}
      />
    </>
  );
}
