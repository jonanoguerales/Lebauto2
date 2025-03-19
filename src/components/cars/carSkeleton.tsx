"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function CarCardSkeleton() {
  return (
    <div className="bg-card rounded-lg border shadow-sm animate-pulse">
      <div className="relative">
        <Skeleton className="h-48 w-full rounded-t-lg" />
      </div>
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-4" />

        <div className="grid grid-cols-2 gap-2 mb-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-3 w-20 mb-1" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        <div className="border-t pt-4">
          <div className="flex justify-between items-baseline mb-2">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  );
}

export function CarDetailSkeleton() {
  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-8 animate-pulse">
      <div>
        <Skeleton className="h-[400px] md:h-[500px] w-full rounded-lg mb-2" />
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-md" />
          ))}
        </div>
      </div>

      <div>
        <Skeleton className="h-[300px] w-full rounded-lg mb-6" />
        <Skeleton className="h-[400px] w-full rounded-lg mb-6" />
        <Skeleton className="h-[150px] w-full rounded-lg" />
      </div>
    </div>
  );
}
