import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/home/StatsCards";
import { SalesChart } from "@/components/dashboard/home/SalesChart";
import { VehicleDistributionChart } from "@/components/dashboard/home/VehicleDistributionChart";
import { RecentVehicles } from "@/components/dashboard/home/RecentVehicles";

export default function Home() {
  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Dashboard"
        description="Resumen general de la gestión de vehículos"
      />
      <StatsCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SalesChart />
        <VehicleDistributionChart />
      </div>

      <RecentVehicles />
    </div>
  );
}
