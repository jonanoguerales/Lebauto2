import { Sidebar } from "@/components/dashboard/Sidebar";
import "@/global.css";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-background p-6 max-md:mt-20">
        {children}
      </main>
    </div>
  );
}
