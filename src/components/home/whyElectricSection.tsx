import { Battery, Leaf, Wallet, Wrench, ShieldCheck, Zap } from "lucide-react"

export default function WhyElectricSection() {
  const benefits = [
    {
      icon: Battery,
      title: "Mayor autonomía",
      description: "Los vehículos eléctricos modernos ofrecen autonomías de hasta 600 km con una sola carga.",
    },
    {
      icon: Leaf,
      title: "0 emisiones",
      description: "Contribuye al medio ambiente con un vehículo que no emite gases contaminantes.",
    },
    {
      icon: Wallet,
      title: "Ahorro económico",
      description: "Reduce hasta un 70% los costes de combustible y mantenimiento frente a vehículos convencionales.",
    },
    {
      icon: Wrench,
      title: "Menos mantenimiento",
      description: "Olvídate de cambios de aceite y reduce las visitas al taller con un motor más simple y duradero.",
    },
    {
      icon: ShieldCheck,
      title: "Mayor seguridad",
      description: "Los vehículos eléctricos suelen obtener las mejores calificaciones en pruebas de seguridad.",
    },
    {
      icon: Zap,
      title: "Mejor rendimiento",
      description: "Disfruta de una aceleración instantánea y una conducción más suave y silenciosa.",
    },
  ]

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué elegir un vehículo eléctrico?</h2>
          <p className="text-lg text-white/80">
            Descubre todas las ventajas que te ofrece la movilidad eléctrica y por qué cada vez más conductores dan el
            paso.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-lg p-6 hover:bg-white/20 transition-colors"
            >
              <div className="bg-white/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <benefit.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-white/80">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

