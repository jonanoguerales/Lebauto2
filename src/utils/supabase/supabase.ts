import { createClient } from "@supabase/supabase-js"

// Verificar que las variables de entorno estén definidas
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Las variables de entorno NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY son requeridas.")
}

// Crear el cliente de Supabase solo si las variables están disponibles
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Función auxiliar para verificar que el cliente existe
function getSupabase() {
  if (!supabase) {
    throw new Error(
      "El cliente de Supabase no está inicializado. Verifica que las variables de entorno NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY estén configuradas.",
    )
  }
  return supabase
}

// Definición de tipos
export interface Car {
  id: string
  brand: string
  model: string
  variant?: string
  condition: string
  price: number
  location?: string
  year: number
  mileage: number
  body_type?: string
  fuel: string
  transmission?: string
  environmental_tag?: string
  drivetrain?: string
  power?: number
  engine_displacement?: number
  color: string
  doors?: number
  electric_range?: number
  battery_capacity?: number
  charging_time?: number
  fast_charge?: boolean
  charging_port?: string
  iva_deductible?: boolean
  monthly_price?: number
  finance_price?: number
  description?: string
  created_at?: string
  // Campos virtuales para la UI
  images?: string[]
  features?: string[]
}

export interface CarImage {
  id: string
  car_id: string
  image_url: string
  created_at?: string
}

export interface Feature {
  id: string
  name: string
  category?: string
  created_at?: string
}

export interface CarFeature {
  car_id: string
  feature_id: string
}

// Función para subir una imagen a Supabase Storage
export async function uploadImage(file: File, path: string): Promise<string | null> {
  try {
    const client = getSupabase()
    const fileExt = file.name.split(".").pop()
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `${path}/${fileName}`

    const { data, error } = await client.storage.from("car-images").upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("Error uploading image:", error)
      return null
    }

    // Obtener la URL pública de la imagen
    const { data: urlData } = client.storage.from("car-images").getPublicUrl(filePath)

    return urlData.publicUrl
  } catch (error) {
    console.error("Error in uploadImage:", error)
    return null
  }
}

// Función para eliminar una imagen de Supabase Storage
export async function deleteImage(url: string): Promise<boolean> {
  try {
    const client = getSupabase()
    // Extraer el path de la URL
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split("/")
    const bucketName = pathParts[1] // Asumiendo que la URL es como: https://xxx.supabase.co/storage/v1/object/public/bucket-name/path/to/file
    const filePath = pathParts.slice(2).join("/")

    const { error } = await client.storage.from(bucketName).remove([filePath])

    if (error) {
      console.error("Error deleting image:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in deleteImage:", error)
    return false
  }
}

// Funciones para gestionar vehículos en Supabase
export async function fetchCars(): Promise<Car[]> {
  try {
    const client = getSupabase()
    // Obtener todos los coches
    const { data: cars, error } = await client.from("cars").select("*")

    if (error) {
      console.error("Error fetching cars:", error)
      return []
    }

    // Para cada coche, obtener sus imágenes y características
    const carsWithDetails = await Promise.all(
      cars.map(async (car) => {
        // Obtener imágenes
        const { data: carImages } = await client.from("car_images").select("image_url").eq("car_id", car.id)

        // Obtener IDs de características
        const { data: carFeatures } = await client.from("car_features").select("feature_id").eq("car_id", car.id)

        // Obtener detalles de características si hay alguna
        let features: string[] = []
        if (carFeatures && carFeatures.length > 0) {
          const featureIds = carFeatures.map((cf) => cf.feature_id)
          const { data: featureDetails } = await client.from("features").select("id").in("id", featureIds)

          features = featureDetails?.map((f) => f.id) || []
        }

        return {
          ...car,
          images: carImages?.map((img) => img.image_url) || [],
          features,
        }
      }),
    )

    return carsWithDetails || []
  } catch (error) {
    console.error("Error in fetchCars:", error)
    return []
  }
}

export async function fetchCarById(id: string): Promise<Car | null> {
  try {
    const client = getSupabase()
    // Obtener el coche
    const { data: car, error } = await client.from("cars").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching car:", error)
      return null
    }

    // Obtener imágenes
    const { data: carImages } = await client.from("car_images").select("image_url").eq("car_id", id)

    // Obtener IDs de características
    const { data: carFeatures } = await client.from("car_features").select("feature_id").eq("car_id", id)

    // Obtener detalles de características si hay alguna
    let features: string[] = []
    if (carFeatures && carFeatures.length > 0) {
      const featureIds = carFeatures.map((cf) => cf.feature_id)
      const { data: featureDetails } = await client.from("features").select("id").in("id", featureIds)

      features = featureDetails?.map((f) => f.id) || []
    }

    return {
      ...car,
      images: carImages?.map((img) => img.image_url) || [],
      features,
    }
  } catch (error) {
    console.error("Error in fetchCarById:", error)
    return null
  }
}

export async function createCar(car: Omit<Car, "id" | "created_at">): Promise<Car | null> {
  try {
    const client = getSupabase()

    // 1. Extraer imágenes y características para manejarlas por separado
    const { images, features, ...carData } = car

    // 2. Insertar el coche en la tabla cars
    const { data: newCar, error } = await client.from("cars").insert([carData]).select().single()

    if (error) {
      console.error("Error creating car:", error)
      return null
    }

    // 3. Si hay imágenes, insertarlas en car_images
    if (images && images.length > 0) {
      const carImages = images.map((imageUrl) => ({
        car_id: newCar.id,
        image_url: imageUrl,
      }))

      const { error: imagesError } = await client.from("car_images").insert(carImages)

      if (imagesError) {
        console.error("Error adding car images:", imagesError)
      }
    }

    // 4. Si hay características, insertarlas en car_features
    if (features && features.length > 0) {
      const carFeatures = features.map((featureId) => ({
        car_id: newCar.id,
        feature_id: featureId,
      }))

      const { error: featuresError } = await client.from("car_features").insert(carFeatures)

      if (featuresError) {
        console.error("Error adding car features:", featuresError)
      }
    }

    // 5. Devolver el coche con sus imágenes y características
    return {
      ...newCar,
      images: images || [],
      features: features || [],
    }
  } catch (error) {
    console.error("Exception in createCar:", error)
    return null
  }
}

export async function updateCar(id: string, car: Partial<Car>): Promise<Car | null> {
  try {
    const client = getSupabase()

    // 1. Extraer imágenes y características para manejarlas por separado
    const { images, features, ...carData } = car

    // 2. Actualizar el coche en la tabla cars
    const { data: updatedCar, error } = await client.from("cars").update(carData).eq("id", id).select().single()

    if (error) {
      console.error("Error updating car:", error)
      return null
    }

    // 3. Si se proporcionaron imágenes, actualizar car_images
    if (images !== undefined) {
      // Primero eliminar todas las imágenes existentes
      await client.from("car_images").delete().eq("car_id", id)

      // Luego insertar las nuevas imágenes
      if (images.length > 0) {
        const carImages = images.map((imageUrl) => ({
          car_id: id,
          image_url: imageUrl,
        }))

        const { error: imagesError } = await client.from("car_images").insert(carImages)

        if (imagesError) {
          console.error("Error updating car images:", imagesError)
        }
      }
    }

    // 4. Si se proporcionaron características, actualizar car_features
    if (features !== undefined) {
      // Primero eliminar todas las características existentes
      await client.from("car_features").delete().eq("car_id", id)

      // Luego insertar las nuevas características
      if (features.length > 0) {
        const carFeatures = features.map((featureId) => ({
          car_id: id,
          feature_id: featureId,
        }))

        const { error: featuresError } = await client.from("car_features").insert(carFeatures)

        if (featuresError) {
          console.error("Error updating car features:", featuresError)
        }
      }
    }

    // 5. Obtener las imágenes actuales
    const { data: carImages } = await client.from("car_images").select("image_url").eq("car_id", id)

    // 6. Obtener las características actuales
    const { data: carFeatures } = await client.from("car_features").select("feature_id").eq("car_id", id)

    let currentFeatures: string[] = []
    if (carFeatures && carFeatures.length > 0) {
      const featureIds = carFeatures.map((cf) => cf.feature_id)
      const { data: featureDetails } = await client.from("features").select("id").in("id", featureIds)

      currentFeatures = featureDetails?.map((f) => f.id) || []
    }

    // 7. Devolver el coche actualizado con sus imágenes y características
    return {
      ...updatedCar,
      images: carImages?.map((img) => img.image_url) || [],
      features: currentFeatures,
    }
  } catch (error) {
    console.error("Exception in updateCar:", error)
    return null
  }
}

export async function deleteCar(id: string): Promise<boolean> {
  try {
    const client = getSupabase()

    // 1. Eliminar las relaciones en car_features
    await client.from("car_features").delete().eq("car_id", id)

    // 2. Eliminar las imágenes en car_images
    await client.from("car_images").delete().eq("car_id", id)

    // 3. Finalmente eliminar el coche
    const { error } = await client.from("cars").delete().eq("id", id)

    if (error) {
      console.error("Error deleting car:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Exception in deleteCar:", error)
    return false
  }
}

// Funciones para gestionar características (features) en Supabase
export async function fetchFeatures(): Promise<Feature[]> {
  const client = getSupabase()
  const { data, error } = await client.from("features").select("*")

  if (error) {
    console.error("Error fetching features:", error)
    return []
  }

  return data || []
}

export async function createFeature(feature: Omit<Feature, "id" | "created_at">): Promise<Feature | null> {
  const client = getSupabase()
  const { data, error } = await client.from("features").insert([feature]).select().single()

  if (error) {
    console.error("Error creating feature:", error)
    return null
  }

  return data
}

