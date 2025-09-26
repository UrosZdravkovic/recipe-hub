import type { Recipe } from "@/features/recipes/recipeSlice";
import { supabase } from "./supabaseClient";




export async function signUpUser(
  email: string,
  password: string,
  username: string
) {
  // 1️⃣ Provera da li username već postoji u profiles
  const { data: existingProfile, error: checkError } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("username", username)
    .maybeSingle();

  if (checkError) {
    throw checkError;
  }

  if (existingProfile) {
    throw new Error("Username is already taken");
  }

  // 2️⃣ Kreiranje auth user-a sa username u metadata
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username: username },
    },
  });

  if (error) {
    throw error;
  }

  const user = data.user;
  if (!user) {
    throw new Error("Signup failed");
  }

  // 3️⃣ Vrati korisnika
  return user;
}




// LOGIN sa email i password
export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  if (!data.user) throw new Error("Login failed");
  const user = data.user
  return user;

}

// LOGOUT usera
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}

// Dodavanje u favourites
export async function addFavourites(userId: string, recipe: Recipe) {
  const { data, error } = await supabase
    .from("profiles")
    .select("favourites")
    .eq("user_id", userId) // ovde isto userId
    .single();

  if (error) throw error;

  const existingFavourites = data.favourites || [];
  const updatedFavourites = [...existingFavourites, recipe];

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ favourites: updatedFavourites })
    .eq("user_id", userId);

  if (updateError) throw updateError;
  return updatedFavourites;
}

export async function fetchUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw error;
  return data;
}

