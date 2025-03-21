"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/useToast";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    surnames: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Formulario enviado",
        description: "Nos pondremos en contacto contigo lo antes posible.",
      });
      setFormData({ name: "", surnames: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Error al enviar",
        description: "Ha ocurrido un error. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <CardContent className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6" aria-labelledby="contact-form-title">
          <h3 id="contact-form-title" className="text-lg font-semibold">Formulario de contacto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup id="name" label="Nombre" value={formData.name} onChange={handleChange} required />
            <InputGroup id="surnames" label="Apellidos" value={formData.surnames} onChange={handleChange} required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputGroup id="email" label="Email" type="email" value={formData.email} onChange={handleChange} required />
            <InputGroup id="phone" label="Teléfono" type="tel" value={formData.phone} onChange={handleChange} />
          </div>
          <TextareaGroup id="message" label="Mensaje" value={formData.message} onChange={handleChange} required />
          <Button type="submit" className="w-full h-12 text-base" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function InputGroup({ id, label, type = "text", value, onChange, required = false }: any) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} value={value} onChange={onChange} placeholder={`Introduce tu ${label.toLowerCase()}`} required={required} />
    </div>
  );
}

function TextareaGroup({ id, label, value, onChange, required = false }: any) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} name={id} value={value} onChange={onChange} placeholder={`Escribe tu ${label.toLowerCase()} aquí...`} rows={6} required={required} />
    </div>
  );
}