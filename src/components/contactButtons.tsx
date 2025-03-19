"use client";

import { Phone, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { JSX } from "react";

export default function ContactButtons() {
  return (
    <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-50">
      <TooltipProvider delayDuration={0}>
        <ContactButton
          icon={<Phone className="h-5 w-5" />}
          tooltip="Llamar ahora"
          onClick={() => (window.location.href = "tel:+34600000000")}
        />
        <ContactButton
          icon={<MessageSquare className="h-5 w-5" />}
          tooltip="Contactar por WhatsApp"
          onClick={() => window.open("https://wa.me/34600000000", "_blank")}
        />
      </TooltipProvider>
    </div>
  );
}

function ContactButton({ icon, tooltip, onClick }: { icon: JSX.Element; tooltip: string; onClick: () => void }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          className="bg-gray-900 hover:bg-gray-700 text-white rounded-full h-12 w-12"
          onClick={onClick}
          aria-label={tooltip}
        >
          {icon}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
