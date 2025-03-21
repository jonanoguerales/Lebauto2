"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/utils/utils"
import { LayoutDashboard, Car, Menu, X, ListTodo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import AuthButton from "./AuthButton"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Vehículos",
    href: "/dashboard/vehiculos",
    icon: Car,
  },
  {
    title: "Características",
    href: "/dashboard/caracteristicas",
    icon: ListTodo,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed top-0 left-0 z-40 w-full bg-background md:hidden flex items-center justify-between p-4 border-b">
        <div className="font-bold text-xl">Lebauto</div>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-30 bg-background transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:w-64 md:h-screen md:border-r",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full pt-16 md:pt-0">
          <div className="p-6 border-b hidden md:block">
            <h2 className="font-bold text-2xl">Lebauto</h2>
          </div>

          <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted",
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
          </div>
            <AuthButton />
        </div>
      </div>
    </>
  )
}

