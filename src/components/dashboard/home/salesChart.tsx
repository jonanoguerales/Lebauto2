"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Ene", ventas: 12 },
  { month: "Feb", ventas: 18 },
  { month: "Mar", ventas: 15 },
  { month: "Abr", ventas: 22 },
  { month: "May", ventas: 28 },
  { month: "Jun", ventas: 24 },
  { month: "Jul", ventas: 30 },
  { month: "Ago", ventas: 26 },
  { month: "Sep", ventas: 32 },
  { month: "Oct", ventas: 24 },
  { month: "Nov", ventas: 20 },
  { month: "Dic", ventas: 28 },
];

export function SalesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ventas Mensuales</CardTitle>
        <CardDescription>
          Número de vehículos vendidos por mes durante el último año
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => [`${value} vehículos`, "Ventas"]}
              labelFormatter={(label) => `Mes: ${label}`}
            />
            <Bar
              dataKey="ventas"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
