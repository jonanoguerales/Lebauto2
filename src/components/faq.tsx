"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

const faqItems = [
  {
    question: "¿Cuál es el horario de apertura del concesionario?",
    answer: "Nuestro concesionario está abierto de lunes a viernes de 9:00 a 20:00 horas, los sábados de 10:00 a 14:00 horas. Los domingos permanecemos cerrados.",
  },
  {
    question: "¿Necesito cita previa para ver un vehículo?",
    answer: "No es obligatorio, pero te recomendamos solicitar cita previa para garantizar una atención personalizada y que el vehículo que te interesa esté disponible para su visualización. Puedes solicitar cita a través de nuestro formulario de contacto o llamando por teléfono.",
  },
  {
    question: "¿Ofrecéis financiación para la compra de vehículos?",
    answer: "Sí, ofrecemos diversas opciones de financiación adaptadas a tus necesidades. Trabajamos con varias entidades financieras para ofrecerte las mejores condiciones. Nuestros asesores te informarán detalladamente sobre todas las opciones disponibles.",
  },
  {
    question: "¿Cuánto tiempo de garantía tienen los vehículos de segunda mano?",
    answer: "Todos nuestros vehículos de segunda mano incluyen una garantía mínima de 12 meses, ampliable a 24 meses. La garantía cubre las piezas y mano de obra en caso de avería mecánica o eléctrica.",
  },
  {
    question: "¿Realizáis tasación de vehículos para compra o cambio?",
    answer: "Sí, ofrecemos un servicio gratuito de tasación de tu vehículo actual. Puedes traerlo a nuestras instalaciones o utilizar nuestro formulario de tasación online para obtener una valoración aproximada. El valor de tasación puede aplicarse como parte del pago de tu nuevo vehículo.",
  },
  {
    question: "¿Puedo probar el vehículo antes de comprarlo?",
    answer: "Por supuesto, animamos a todos nuestros clientes a realizar una prueba de conducción del vehículo que les interesa. Solo necesitarás presentar tu carnet de conducir válido y concertar una cita con nuestro equipo de ventas.",
  },
  {
    question: "¿Ofrecéis servicio post-venta y mantenimiento?",
    answer: "Sí, contamos con un taller propio donde realizamos todo tipo de mantenimientos y reparaciones. Nuestros técnicos están especializados en todas las marcas que comercializamos y utilizamos recambios originales o de calidad equivalente.",
  },
];

export default function Faq() {
  return (
    <Card className="shadow-sm border" role="region" aria-labelledby="faq-title">
      <h2 id="faq-title" className="sr-only">Preguntas Frecuentes</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <FaqItem key={index} index={index} question={item.question} answer={item.answer} />
        ))}
      </Accordion>
    </Card>
  );
}

function FaqItem({ index, question, answer }: { index: number; question: string; answer: string }) {
  return (
    <AccordionItem value={`item-${index}`}>
      <AccordionTrigger className="text-left px-6 py-4">{question}</AccordionTrigger>
      <AccordionContent className="px-6 pb-4">{answer}</AccordionContent>
    </AccordionItem>
  );
}