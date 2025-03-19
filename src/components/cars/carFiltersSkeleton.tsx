"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CarFiltersSkeleton() {
  return (
    <div className="space-y-6 p-6 overflow-hidden">
      <div className="flex justify-between items-center">
        <div className="h-6 w-32 bg-gray-200 rounded" />
        <div className="h-4 w-4 bg-gray-200 rounded-full" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-1/3 bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </div>
      <Accordion type="multiple" defaultValue={["marca", "precio"]}>
        <AccordionItem value="marca">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded" />
              <div className="h-5 w-24 bg-gray-200 rounded" />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-3 space-y-4">
              <div className="h-10 w-full bg-gray-200 rounded" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 w-full bg-gray-200 rounded" />
              ))}
              <div className="h-8 w-full bg-gray-200 rounded" />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="precio">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded" />
              <div className="h-5 w-24 bg-gray-200 rounded" />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="py-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 w-full bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
              </div>
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="año">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded" />
              <div className="h-5 w-24 bg-gray-200 rounded" />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="py-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 w-full bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
              </div>
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="km">
          <AccordionTrigger className="py-3">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-200 rounded" />
              <div className="h-5 w-24 bg-gray-200 rounded" />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="py-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="h-10 w-full bg-gray-200 rounded" />
                <div className="h-10 w-full bg-gray-200 rounded" />
              </div>
              <div className="h-10 w-full bg-gray-200 rounded" />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
