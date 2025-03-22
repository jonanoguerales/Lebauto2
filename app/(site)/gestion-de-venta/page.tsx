import type { Metadata } from "next"
import SellCarForm from "@/components/SellCarForm"
import { ArrowLeft, CheckCircle, Clock, Banknote, FileText, Star, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Vender mi coche | Tasación gratuita | Concesionario",
  description:
    "Vende tu coche de forma rápida, segura y al mejor precio. Tasación gratuita sin compromiso. Gestionamos todo el proceso por ti, pago inmediato y seguro.",
  keywords: [
    "vender coche",
    "tasación coche",
    "valoración vehículo",
    "venta de coches",
    "compra de coches usados",
    "vender coche usado",
    "vender coche segunda mano",
    "mejor precio coche usado",
    "vender coche rápido",
    "compra venta automóviles",
  ],
  openGraph: {
    title: "Vende tu coche al mejor precio | Tasación gratuita sin compromiso",
    description:
      "Gestionamos todo el proceso de venta de tu vehículo. Valoración gratuita, pago inmediato y sin complicaciones.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vende tu coche al mejor precio | Tasación gratuita",
    description:
      "Gestionamos todo el proceso de venta de tu vehículo. Valoración gratuita, pago inmediato y sin complicaciones.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/vender-mi-coche",
  },
}

export default function SellCarPage() {
  const steps = [
    {
      icon: CheckCircle,
      title: "Valoración gratuita",
      description: "Valoramos tu vehículo sin compromiso y te ofrecemos el mejor precio del mercado.",
    },
    {
      icon: FileText,
      title: "Documentación",
      description: "Nos encargamos de toda la gestión documental para que no tengas que preocuparte.",
    },
    {
      icon: Clock,
      title: "Proceso rápido",
      description: "Completamos todo el proceso en tiempo récord para tu comodidad.",
    },
    {
      icon: Banknote,
      title: "Pago seguro",
      description: "Recibes el pago de forma inmediata y segura, sin esperas ni complicaciones.",
    },
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "Mejor valoración garantizada",
      description: "Ofrecemos hasta un 10% más que la competencia por tu vehículo.",
    },
    {
      icon: Shield,
      title: "Seguridad y confianza",
      description: "Más de 15 años de experiencia y miles de clientes satisfechos.",
    },
    {
      icon: Clock,
      title: "Proceso en 24-48h",
      description: "Desde la valoración hasta el pago en menos de 48 horas.",
    },
  ]

  return (
    <main className="min-h-screen bg-background scroll-smooth">
      <section className="relative mt-16 py-24 bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
        <div className="container mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a inicio
          </Link>

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Vende tu coche <span className="text-yellow-300">sin complicaciones</span>
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Gestionamos todo el proceso de venta de tu vehículo para que tú solo tengas que preocuparte de recibir el
              dinero.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold text-base" asChild>
                <a href="#formulario">Solicitar valoración gratuita</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary hover:bg-white/90 font-semibold text-base"
                asChild
              >
                <a href="tel:+34912345678">Llamar ahora</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-12 -right-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <benefit.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">¿Cómo funciona?</h2>
            <p className="text-lg text-gray-600">
              Nuestro proceso está diseñado para ser rápido, transparente y sin complicaciones para ti.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all"
              >
                <div className="absolute -top-5 -left-5 bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                  {index + 1}
                </div>
                <div className="bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-6">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="formulario" className="py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 mb-8">
                  <h2 className="text-3xl font-bold mb-6">Solicita una valoración gratuita</h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Rellena el formulario y nos pondremos en contacto contigo para valorar tu vehículo sin ningún
                    compromiso.
                  </p>
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">Sin compromiso</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    Lo que dicen nuestros clientes
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <p className="italic mb-2">
                      "Proceso rápido y sin complicaciones. Vendí mi coche en menos de una semana y al mejor precio."
                    </p>
                    <p className="font-medium">Carlos Martínez</p>
                    <p className="text-sm text-gray-600">Vendió un Audi A4 2018</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-1">
                <SellCarForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Preguntas frecuentes</h2>

            <div className="space-y-6">
              {[
                {
                  question: "¿Cuánto tiempo tarda el proceso de venta?",
                  answer:
                    "El proceso completo suele durar entre 24 y 48 horas desde la valoración inicial hasta el pago. Nos esforzamos por hacer el proceso lo más rápido y cómodo posible.",
                },
                {
                  question: "¿Qué documentación necesito para vender mi coche?",
                  answer:
                    "Necesitarás el permiso de circulación, la ficha técnica (ITV), el libro de mantenimiento si lo tienes, y tu DNI. Nosotros nos encargamos de gestionar toda la documentación adicional.",
                },
                {
                  question: "¿Cómo se realiza el pago?",
                  answer:
                    "Ofrecemos varias opciones de pago: transferencia bancaria inmediata, cheque bancario o efectivo (hasta los límites legales establecidos). Tú eliges la que más te convenga.",
                },
                {
                  question: "¿Compráis coches con averías o muy antiguos?",
                  answer:
                    "Sí, compramos vehículos en cualquier estado. La valoración dependerá de factores como la marca, modelo, año, kilometraje y estado general, pero siempre ofrecemos un precio justo.",
                },
                {
                  question: "¿Tengo que llevar el coche a vuestras instalaciones?",
                  answer:
                    "No es necesario para la valoración inicial. Podemos hacer una primera valoración online o telefónica. Para la inspección final y formalización de la venta, sí sería necesario.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">¿Listo para vender tu coche?</h2>
            <p className="text-xl mb-8">
              Obtén una valoración gratuita sin compromiso y vende tu coche al mejor precio posible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold text-base" asChild>
                <a href="#formulario">Solicitar valoración</a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary hover:bg-white/90 font-semibold text-base"
                asChild
              >
                <a href="tel:+34912345678">Llamar ahora</a>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Servicio de compra de vehículos usados",
            provider: {
              "@type": "AutoDealer",
              name: "Concesionario de Coches de Segunda Mano",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Avenida de los Coches, 123",
                addressLocality: "Madrid",
                postalCode: "28001",
                addressCountry: "ES",
              },
              telephone: "+34912345678",
              priceRange: "€€",
            },
            description:
              "Servicio de compra de vehículos usados con tasación gratuita, gestión de documentación y pago inmediato.",
            offers: {
              "@type": "Offer",
              description: "Tasación gratuita sin compromiso",
            },
          }),
        }}
      />
    </main>
  )
}

