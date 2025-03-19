"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const navbarClasses = `fixed top-0 w-screen z-50 py-6 transition-all duration-300 ${
    isHome
      ? scrolled || menuOpen
        ? "bg-white shadow-md transition-shadow text-black"
        : "bg-transparent text-white"
      : scrolled || menuOpen
      ? "bg-white shadow-md transition-shadow text-black"
      : "bg-white text-black"
  }`;

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Lebauto
        </Link>
        <div className="hidden md:flex gap-8">
          <Link href="/" className="hover:opacity-80">
            Inicio
          </Link>
          <Link
            href="/coches-segunda-mano"
            className={`hover:opacity-80 border-b-4 ${
              pathname == "/coches-segunda-mano"
                ? "text-gray-800 font-semibold border-gray-800"
                : "border-transparent"
            }`}
          >
            Coches de ocasión
          </Link>
          <Link
            href="/gestion-de-venta"
            className={`hover:opacity-80 border-b-4 ${
              pathname == "/gestion-de-venta"
                ? "text-gray-800 font-semibold border-gray-800"
                : "border-transparent"
            }`}
          >
            Gentión de venta
          </Link>
          <Link
            href="/contacto"
            className={`hover:opacity-80 border-b-4 ${
              pathname == "/contacto"
                ? "text-gray-800 font-semibold border-gray-800"
                : "border-transparent"
            }`}
          >
            Contacto
          </Link>
        </div>
        <button
          className="md:hidden flex items-center justify-center p-2"
          onClick={toggleMenu}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {menuOpen && (
        <div
          className={`md:hidden flex flex-col gap-4 px-8 py-4
                      ${
                        isHome && !scrolled && !menuOpen
                          ? "bg-transparent text-white"
                          : "bg-white text-black"
                      }
          `}
        >
          <Link
            href="/"
            className={`hover:opacity-80 border-b-4 ${
              pathname == "/"
                ? "text-gray-800 font-semibold border-gray-800"
                : "border-transparent"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Inicio
          </Link>
          <Link
            href="/coches-segunda-mano"
            className={`hover:opacity-80 border-b-4 ${
              pathname == "/coches-segunda-mano"
                ? "text-gray-800 font-semibold border-gray-800"
                : "border-transparent"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Coches de ocasión
          </Link>
          <Link
            href="/gestion-de-venta"
            className={`hover:opacity-80 border-b-4 ${
              pathname == "/gestion-de-venta"
                ? "text-gray-800 font-semibold border-gray-800"
                : "border-transparent"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Gentión de venta
          </Link>
          <Link
            href="/contacto"
            className={`hover:opacity-80 border-b-4 ${
              pathname == "/contacto"
                ? "text-gray-800 font-semibold border-gray-800"
                : "border-transparent"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Contacto
          </Link>
        </div>
      )}
    </nav>
  );
}
