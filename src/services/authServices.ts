import type { Recipe } from "@/features/recipes/recipeSlice";
import { supabase } from "./supabaseClient";


// SIGNUP sa email i password
export async function signUpUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
    return data.user;
}

// Profile kreiranje

export async function createProfile(id: string, username: string) {
  const { data, error } = await supabase
    .from("Profile")
    .insert({ id, username })
    .select()
    .single();

  if (error) throw error;
  return data;
}


// Login sa email i password
export async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  if (!data.user) throw new Error("Login failed");

  // Dohvati profil iz profiles tabele
  const profileData = await supabase
    .from("Profile")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileData.error) throw profileData.error;

  return { user: data.user, profile: profileData.data };
}

// Logout usera
export async function logoutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
}



// Dodavanje u favourites
export async function addFavourites(userId: string, recipe: Recipe) {
    const { data, error } = await supabase
    .from("Profile")
    .select("favourites")
    .eq("id", userId)
    .single();
    
    if (error) throw error;

    const existingFavourites = data.favourites || [];
    const updatedFavourites = [...existingFavourites, recipe];

    const { error: updateError } = await supabase
    .from("Profile")
    .update({ favourites: updatedFavourites })
    .eq("id", userId);

    if (updateError) throw updateError;
    return updatedFavourites;
}