import type { Recipe } from "@/features/recipes/recipeSlice";
import { supabase } from "./supabaseClient";

// SIGNUP sa email i password
export async function signUpUser(email: string, password: string, username: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }, // ovo ide u raw_user_meta_data
    },
  });
  if (error) throw error;
  return data.user;
}

// LOGIN sa email i password
export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  if (!data.user) throw new Error("Login failed");

  const user = data.user;

  // Samo pokupi profil (jer ga trigger pravi)
  const { data: profile, error: selectError } = await supabase
    .from("profiles")
    .select("*")
    .eq("userId", user.id) // ovde koristiš userId
    .single();

  if (selectError) throw selectError;

  return { user, profile };
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
    .eq("userId", userId) // ovde isto userId
    .single();

  if (error) throw error;

  const existingFavourites = data.favourites || [];
  const updatedFavourites = [...existingFavourites, recipe];

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ favourites: updatedFavourites })
    .eq("userId", userId);

  if (updateError) throw updateError;
  return updatedFavourites;
}
