import ContactForm from "@/components/ContactForm";
import Faq from "@/components/FAQ";
import Map from "@/components/Map";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Contacto | Lebauto Concesionario",
  description:
    "Ponte en contacto con Lebauto para cualquier consulta sobre nuestros coches de segunda mano y ocasión.",
  openGraph: {
    title: "Contacto | Lebauto Concesionario",
    description:
      "Consulta con nuestro equipo sobre cualquier vehículo de nuestro catálogo de segunda mano y ocasión.",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gray-900 text-primary-foreground py-16 mt-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Contacto</h1>
          <p className="text-xl text-center mb-8 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Ponte en contacto con nosotros para
            cualquier consulta o visita nuestro concesionario.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white hover:bg-white hover:text-primary"
              asChild
            >
              <a href="tel:+34912345678">
                <Phone className="mr-2 h-4 w-4" /> Llamar ahora
              </a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="mailto:info@lebauto.com">
                <Mail className="mr-2 h-4 w-4" /> Enviar email
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Envíanos un mensaje</h2>
            <p className="text-lg text-muted-foreground">
              ¿Tienes alguna pregunta o necesitas más información? Completa el
              formulario y nos pondremos en contacto contigo lo antes posible.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col max-md:items-center">
              <h2 className="text-3xl font-bold mb-6">Ven a conocernos</h2>
              <p className="max-md:text-center text-lg text-muted-foreground mb-8">
                Visita nuestro concesionario y descubre nuestra amplia selección
                de vehículos. Nuestro equipo estará encantado de atenderte y
                ayudarte a encontrar el coche perfecto para ti.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Dirección</h3>
                    <p className="text-muted-foreground">
                      Avenida de los Coches, 123
                      <br />
                      28001 Madrid, España
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Teléfono</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+34912345678" className="hover:text-primary">
                        +34 91 234 56 78
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Horario</h3>
                    <p className="text-muted-foreground">
                      Lunes a Viernes: 9:00 - 20:00
                      <br />
                      Sábados: 10:00 - 14:00
                      <br />
                      Domingos: Cerrado
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden shadow-lg border">
              <Map />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Preguntas frecuentes</h2>
              <p className="text-lg text-muted-foreground">
                Encuentra respuestas a las preguntas más comunes sobre nuestros
                servicios y horarios.
              </p>
            </div>
            <Faq />
          </div>
        </div>
      </section>
    </>
  );
}
