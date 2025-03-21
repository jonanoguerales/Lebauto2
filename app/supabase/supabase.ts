import { Car, Feature } from "@/lib/definitions";
import { mapCarFromDB, mapCarToDB } from "@/utils/mappers";
import { generateVehicleSlug } from "@/utils/slug";
import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function uploadImage(
  file: File,
  path: string
): Promise<string | null> {
  try {
    if (!supabaseClient) {
      console.error("Supabase supabaseClient is not initialized");
      return null;
    }

    if (!file) {
      console.error("No file provided");
      return null;
    }

    if (!path) {
      console.error("No path provided");
      return null;
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { data, error } = await supabaseClient.storage
      .from("car-images")
      .upload(filePath, file, { cacheControl: "3600" });

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    const { data: urlData } = supabaseClient.storage
      .from("car-images")
      .getPublicUrl(filePath);

    if (!urlData || !urlData.publicUrl) {
      console.error("Failed to get public URL");
      return null;
    }

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error in uploadImage:", error);
    return null;
  }
}

export async function deleteImage(url: string): Promise<boolean> {
  try {
    if (!url) return false;

    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split("/");

    if (pathParts.length < 6) {
      console.error("URL con estructura inesperada:", url);
      return false;
    }

    const bucketName = pathParts[5];
    const filePath = pathParts.slice(6).join("/");

    const { error } = await supabaseClient.storage
      .from(bucketName)
      .remove([filePath]);

    if (error) {
      console.error("Error deleting image from storage:", error);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Exception in deleteImage:", error);
    return false;
  }
}

export async function fetchCars(): Promise<Car[]> {
  try {
    const { data: cars, error } = await supabaseClient.from("cars").select("*");

    if (error) {
      console.error("Error fetching cars:", error);
      return [];
    }

    const carsWithDetails = await Promise.all(
      cars.map(async (car) => {
        const { data: carImages } = await supabaseClient
          .from("car_images")
          .select("image_url")
          .eq("car_id", car.id);

        const { data: carFeatures } = await supabaseClient
          .from("car_features")
          .select("feature_id")
          .eq("car_id", car.id);

        let features: string[] = [];
        if (carFeatures && carFeatures.length > 0) {
          const featureIds = carFeatures.map((cf) => cf.feature_id);
          const { data: featureDetails } = await supabaseClient
            .from("features")
            .select("id")
            .in("id", featureIds);

          features = featureDetails?.map((f) => f.id) || [];
        }

        return mapCarFromDB({
          ...car,
          images: carImages?.map((img) => img.image_url) || [],
          features,
        });
      })
    );

    return carsWithDetails || [];
  } catch (error) {
    console.error("Error in fetchCars:", error);
    return [];
  }
}

export async function fetchCarById(id: string): Promise<Car | null> {
  try {
    const { data: car, error } = await supabaseClient
      .from("cars")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching car:", error);
      return null;
    }

    const { data: carImages } = await supabaseClient
      .from("car_images")
      .select("image_url")
      .eq("car_id", id);

    const { data: carFeatures } = await supabaseClient
      .from("car_features")
      .select("feature_id")
      .eq("car_id", id);

    let features: string[] = [];
    if (carFeatures && carFeatures.length > 0) {
      const featureIds = carFeatures.map((cf) => cf.feature_id);
      const { data: featureDetails } = await supabaseClient
        .from("features")
        .select("id")
        .in("id", featureIds);

      features = featureDetails?.map((f) => f.id) || [];
    }

    return mapCarFromDB({
      ...car,
      images: carImages?.map((img) => img.image_url) || [],
      features,
    });
  } catch (error) {
    console.error("Error in fetchCarById:", error);
    return null;
  }
}

export async function createCar(
  car: Omit<Car, "id" | "created_at" | "slug">
): Promise<Car | null> {
  try {
    const { images, features, ...carData } = car;
    // Convertir los datos a snake_case antes de enviarlos
    const carDataDB = mapCarToDB(carData);

    const { data: newCar, error } = await supabaseClient
      .from("cars")
      .insert([carDataDB])
      .select()
      .single();

    if (error) {
      console.error("Error creating car:", error);
      return null;
    }

    const slug = generateVehicleSlug({
      brand: newCar.brand,
      model: newCar.model,
      mileage: newCar.mileage,
      year: newCar.year,
      id: newCar.id,
    });

    const { data: updatedCar, error: updateError } = await supabaseClient
      .from("cars")
      .update({ slug })
      .eq("id", newCar.id)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating slug:", updateError);
      return mapCarFromDB(newCar);
    }

    if (images && images.length > 0) {
      const carImages = images.map((imageUrl) => ({
        car_id: newCar.id,
        image_url: imageUrl,
      }));

      const { error: imagesError } = await supabaseClient
        .from("car_images")
        .insert(carImages);

      if (imagesError) {
        console.error("Error adding car images:", imagesError);
      }
    }

    if (features && features.length > 0) {
      const carFeatures = features.map((featureId) => ({
        car_id: newCar.id,
        feature_id: featureId,
      }));

      const { error: featuresError } = await supabaseClient
        .from("car_features")
        .insert(carFeatures);

      if (featuresError) {
        console.error("Error adding car features:", featuresError);
      }
    }

    return mapCarFromDB({
      ...updatedCar,
      images: images || [],
      features: features || [],
    });
  } catch (error) {
    console.error("Exception in createCar:", error);
    return null;
  }
}

export async function updateCar(
  id: string,
  car: Partial<Car>
): Promise<Car | null> {
  try {
    const { images, features, ...carData } = car;
    // Convertir datos a snake_case antes de actualizar
    const carDataDB = mapCarToDB(carData);

    let updatedCar: any = { id };

    if (Object.keys(carDataDB).length > 0) {
      const { data, error } = await supabaseClient
        .from("cars")
        .update(carDataDB)
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating car:", error);
        return null;
      }

      if (data && data.length > 0) {
        updatedCar = data[0];
      } else {
        const { data: currentCar } = await supabaseClient
          .from("cars")
          .select("*")
          .eq("id", id)
          .single();

        if (currentCar) {
          updatedCar = currentCar;
        }
      }
    }

    if (images !== undefined) {
      await supabaseClient.from("car_images").delete().eq("car_id", id);

      if (images.length > 0) {
        const carImages = images.map((imageUrl) => ({
          car_id: id,
          image_url: imageUrl,
        }));

        const { error: imagesError } = await supabaseClient
          .from("car_images")
          .insert(carImages);

        if (imagesError) {
          console.error("Error updating car images:", imagesError);
        }
      }
    }

    if (features !== undefined) {
      await supabaseClient.from("car_features").delete().eq("car_id", id);

      if (features.length > 0) {
        const carFeatures = features.map((featureId) => ({
          car_id: id,
          feature_id: featureId,
        }));

        const { error: featuresError } = await supabaseClient
          .from("car_features")
          .insert(carFeatures);

        if (featuresError) {
          console.error("Error updating car features:", featuresError);
        }
      }
    }

    const { data: carImages } = await supabaseClient
      .from("car_images")
      .select("image_url")
      .eq("car_id", id);

    const { data: carFeatures } = await supabaseClient
      .from("car_features")
      .select("feature_id")
      .eq("car_id", id);

    let currentFeatures: string[] = [];
    if (carFeatures && carFeatures.length > 0) {
      const featureIds = carFeatures.map((cf) => cf.feature_id);
      const { data: featureDetails } = await supabaseClient
        .from("features")
        .select("id")
        .in("id", featureIds);

      currentFeatures = featureDetails?.map((f) => f.id) || [];
    }

    return mapCarFromDB({
      ...updatedCar,
      images: carImages?.map((img) => img.image_url) || [],
      features: currentFeatures,
    });
  } catch (error) {
    console.error("Exception in updateCar:", error);
    return null;
  }
}

export async function deleteCar(id: string): Promise<boolean> {
  try {
    await supabaseClient.from("car_features").delete().eq("car_id", id);
    await supabaseClient.from("car_images").delete().eq("car_id", id);

    const { error } = await supabaseClient.from("cars").delete().eq("id", id);

    if (error) {
      console.error("Error deleting car:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Exception in deleteCar:", error);
    return false;
  }
}

export async function fetchFeatures(): Promise<Feature[]> {
  const { data, error } = await supabaseClient.from("features").select("*");

  if (error) {
    console.error("Error fetching features:", error);
    return [];
  }

  return data || [];
}

export async function createFeature(
  feature: Omit<Feature, "id" | "created_at">
): Promise<Feature | null> {
  const { name } = feature;

  const { data, error } = await supabaseClient
    .from("features")
    .insert([{ name }])
    .select()
    .single();

  if (error) {
    console.error("Error creating feature:", error);
    return null;
  }

  return data;
}

export async function updateFeature(
  id: string,
  feature: Partial<Feature>
): Promise<Feature | null> {
  const { data, error } = await supabaseClient
    .from("features")
    .update(feature)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating feature:", error);
    return null;
  }

  return data;
}

export async function deleteFeature(id: string): Promise<boolean> {
  const { error } = await supabaseClient.from("features").delete().eq("id", id);

  if (error) {
    console.error("Error deleting feature:", error);
    return false;
  }

  return true;
}

export async function fetchCarDetailsBySlug(slug: string): Promise<Car | null> {
  try {
    const { data: car, error } = await supabaseClient
      .from("cars")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error fetching car details by slug:", error);
      return null;
    }

    const { data: carImages } = await supabaseClient
      .from("car_images")
      .select("image_url")
      .eq("car_id", car.id);

    const { data: carFeatures } = await supabaseClient
      .from("car_features")
      .select("feature_id")
      .eq("car_id", car.id);

    let features: string[] = [];
    if (carFeatures && carFeatures.length > 0) {
      const featureIds = carFeatures.map((cf) => cf.feature_id);
      const { data: featureDetails } = await supabaseClient
        .from("features")
        .select("*")
        .in("id", featureIds);
      features = featureDetails?.map((f) => f.name) || [];
    }

    return mapCarFromDB({
      ...car,
      images: carImages?.map((img) => img.image_url) || [],
      features,
    });
  } catch (error) {
    console.error("Error in fetchCarDetailsBySlug:", error);
    return null;
  }
}

export async function fetchElectricVehicles(limit = 4): Promise<Car[]> {
  const { data, error } = await supabaseClient
    .from("cars")
    .select("*")
    .eq("fuel", "Eléctrico")
    .limit(limit);
     
  if (error) {
    console.error("Error fetching electric vehicles:", error);
    return [];
  }
  
  const carsWithImages = await Promise.all(
    (data || []).map(async (car) => {
      const { data: carImages } = await supabaseClient
        .from("car_images")
        .select("image_url")
        .eq("car_id", car.id);
      
      return mapCarFromDB({
        ...car,
        images: carImages ? carImages.map((img) => img.image_url) : []
      });
    })
  );
  
  return carsWithImages || [];
}
