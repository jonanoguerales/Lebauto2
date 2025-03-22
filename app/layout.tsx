import "@/global.css";
import type { Metadata } from "next";
import { inter } from "@/utils/fonts";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL("https://lebauto.vercel.app"),
  title: "Lebauto | Concesionario de coches de segunda mano",
  description: "Compra y vende coches nuevos y usados en Lebauto, tu concesionario de confianza.",
  keywords: [
    "coches nuevos",
    "coches usados",
    "concesionario online",
    "segunda mano",
    "vehículos ocasión",
    "km0"
  ],
  openGraph: {
    title: "Lebauto | Concesionario de coches de segunda mano",
    description: "Explora una amplia gama de coches nuevos, de segunda mano en Lebauto, km0.",
    images: "/imgHome.avif"
  },
  icons: {
    icon: "/logo.webp"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen overflow-x-hidden bg-background text-foreground`}>
        <main className="flex-1 w-screen" role="main">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
