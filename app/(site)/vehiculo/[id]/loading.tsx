import { CarDetailSkeleton } from "@/components/cars/carSkeleton";

export default function CarLoading() {
  return (
    <main className="min-h-screen bg-background" role="status" aria-live="polite">
      <div className="container mx-auto px-4 py-8">
        <CarDetailSkeleton />
      </div>
    </main>
  );
}
