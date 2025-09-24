import type { Recipe } from "@/features/recipes/recipeSlice";
import { supabase } from "./supabaseClient";


export async function isUsernameTaken(username: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("userId")          // možemo birati samo id, ne treba sve kolone
    .eq("username", username)
    .maybeSingle();        // vraća single object ili null

  if (error) {
    throw error;
  }

  return !!data; // true ako username postoji, false ako ne postoji
}


// SIGNUP sa email i password
export async function signUpUser(email: string, password: string, username: string) {

  const isTaken = await isUsernameTaken(username);
  if (isTaken) {
    throw new Error("Username is already taken");
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    throw error;
  }

  const user = data.user;

  if (!user) throw new Error("Signup failed");

  const { error: profileError } = await supabase.from("profiles").insert({
    userId: user.id,
    username: username,
    favourites: [],
  });

  if (profileError) throw profileError;

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

export async function fetchUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("userId", userId)
    .single();

  if (error) throw error;
  return data;
}

