"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "SUV", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Berlina", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Cabrio", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Coupe", value: 5, color: "hsl(var(--chart-4))" },
  { name: "Otros", value: 5, color: "hsl(var(--chart-5))" },
];

export function VehicleDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribución por Tipo</CardTitle>
        <CardDescription>
          Distribución de vehículos por categoría
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value} vehículos`, "Cantidad"]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
