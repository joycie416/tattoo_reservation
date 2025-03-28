import { UserReservation } from "@/types/supabase";
import browserClient from "@/utils/supabase/client";

export const getUserReservations = async (
  name: string,
  instagram: string,
  password: string
) => {
  console.log("getting data...");
  console.log(name, instagram, password);
  // if (!name && !instagram && !password) {
  //   const { data, error } = await browserClient
  //     .from("user_reservations")
  //     .select()
  //     .order("created_at");

  //   if (error) {
  //     throw new Error(error.message);
  //   }
  //   return data;
  // }
  // if (name && instagram && password) {
  const { data, error } = await browserClient
    .from("user_reservations")
    .select()
    .eq("name", name)
    .eq("instagram", instagram)
    .eq("password", password)
    .order("created_at");
  if (error) {
    throw new Error(error.message);
  }
  return data;
  // }
};

export const addUserReservation = async (reservation: UserReservation) => {
  const { data, error } = await browserClient
    .from("user_reservations")
    .insert(reservation)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  const id = data[0].id;
  return id;
};

export const updateUserReservation = async (
  id: string,
  reservation: Partial<UserReservation>
) => {
  const { error } = await browserClient
    .from("user_reservations")
    .update(reservation)
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return null;
};

export const addImages = async (id: string, images: File[]) => {
  images.forEach(async (image, i) => {
    const { error } = await browserClient.storage
      .from("user_reservations")
      .upload(`${id}/${i}_${id}`, image);
    if (error) {
      throw new Error(error.message);
    }
  });
};
