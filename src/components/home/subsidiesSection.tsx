import { FileCheck, FileText, FileSpreadsheet, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SubsidiesSection() {
  const subsidies = [
    {
      icon: FileCheck,
      title: "Plan MOVES III",
      description: "Hasta 7.000€ para particulares y 9.000€ para empresas en la compra de vehículos eléctricos.",
      color: "bg-blue-50 text-blue-700",
      iconColor: "text-blue-600",
    },
    {
      icon: FileText,
      title: "Ayudas locales",
      description: "Bonificaciones en el impuesto de circulación y estacionamiento gratuito en zonas reguladas.",
      color: "bg-green-50 text-green-700",
      iconColor: "text-green-600",
    },
    {
      icon: FileSpreadsheet,
      title: "Deducciones fiscales",
      description:
        "Hasta un 15% de deducción en el IRPF para autónomos y empresas por la compra de vehículos eléctricos.",
      color: "bg-purple-50 text-purple-700",
      iconColor: "text-purple-600",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Ayudas y subvenciones</h2>
          <p className="text-lg text-muted-foreground">
            Te ayudamos a aprovechar todas las ayudas disponibles para la compra de tu vehículo eléctrico
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {subsidies.map((subsidy, index) => (
            <div key={index} className={`p-8 rounded-lg ${subsidy.color} border`}>
              <div className={`p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6 bg-white`}>
                <subsidy.icon className={`h-6 w-6 ${subsidy.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{subsidy.title}</h3>
              <p>{subsidy.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-semibold mb-4 text-center">¿Necesitas ayuda con la tramitación?</h3>
          <p className="text-muted-foreground mb-6 text-center">
            Nuestro equipo de expertos te guiará en todo el proceso de solicitud de ayudas y subvenciones, asegurándonos
            de que obtengas el máximo beneficio posible.
          </p>
          <div className="flex justify-center">
            <Button className="group" asChild>
              <Link href="/contacto">
                Más información sobre ayudas
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

