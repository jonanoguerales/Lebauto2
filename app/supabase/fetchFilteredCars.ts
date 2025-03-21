import type { Car } from "@/lib/definitions";
import { supabaseClient } from "./supabase";

export async function fetchFilteredCars(searchParams: any): Promise<Car[]> {
  let query = supabaseClient.from("cars").select("*");

  if (typeof searchParams.brand === "string") {
    const brands = searchParams.brand.split(",").map((v: string) => v.trim());
    query = query.in("brand", brands);
  }
  if (typeof searchParams.model === "string") {
    const models = searchParams.model.split(",").map((v: string) => v.trim());
    query = query.in("model", models);
  }
  if (typeof searchParams.fuel === "string") {
    const fuels = searchParams.fuel.split(",").map((v: string) => v.trim());
    query = query.in("fuel", fuels);
  }
  if (typeof searchParams.color === "string") {
    const colors = searchParams.color.split(",").map((v: string) => v.trim());
    query = query.in("color", colors);
  }
  if (typeof searchParams.location === "string") {
    const locations = searchParams.location
      .split(",")
      .map((v: string) => v.trim());
    query = query.in("location", locations);
  }
  if (typeof searchParams.minPrice === "string") {
    query = query.gte("price", Number(searchParams.minPrice));
  }
  if (typeof searchParams.maxPrice === "string") {
    query = query.lte("price", Number(searchParams.maxPrice));
  }
  if (typeof searchParams.minYear === "string") {
    query = query.gte("year", Number(searchParams.minYear));
  }
  if (typeof searchParams.maxYear === "string") {
    query = query.lte("year", Number(searchParams.maxYear));
  }
  if (typeof searchParams.minKm === "string") {
    query = query.gte("mileage", Number(searchParams.minKm));
  }
  if (typeof searchParams.maxKm === "string") {
    query = query.lte("mileage", Number(searchParams.maxKm));
  }

  const { data: cars, error } = await query;
  if (error) {
    console.error("Error fetching filtered cars:", error);
    return [];
  }
  return cars || [];
}
