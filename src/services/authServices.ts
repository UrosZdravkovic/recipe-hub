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
  // Oslanjamo se na DB trigger koji kreira red u profiles.
  // Ako se pojave race problemi, razmotriti retry ili ručni insert ovde.
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
  const user = data.user;
  // Pretpostavljamo da profil već postoji (trigger). Ako ne, addFavourites će ga kreirati on-demand.
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
  // 1. Pokušaj da pročitaš postojeći red (može biti NULL odmah posle signup-a ako trigger kasni)
  const { data, error } = await supabase
    .from("profiles")
    .select("favourites")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    // Ako je stvarno greška (ne samo 'row not found'), prosledi
    if ((error as any).code !== 'PGRST116') { // PGRST116 = no rows
      console.error('[addFavourites] select error', error);
      throw error;
    }
  }

  if (!data) {
    // Red ne postoji još -> kreiraj ga i stavi prvi favourite
    const { data: inserted, error: insertError } = await supabase
      .from('profiles')
      .insert([{ user_id: userId, favourites: [recipe] }])
      .select('favourites')
      .single();
    if (insertError) {
      console.error('[addFavourites] insert (on-demand) failed', insertError);
      throw insertError;
    }
    return inserted.favourites as Recipe[];
  }

  const existingFavourites: Recipe[] = Array.isArray(data.favourites)
    ? data.favourites
    : [];

  const alreadyExists = existingFavourites.some(r => r.id === recipe.id);
  if (alreadyExists) {
    return existingFavourites; // nema promene
  }

  const updatedFavourites = [...existingFavourites, recipe];

  const { data: updateData, error: updateError } = await supabase
    .from('profiles')
    .update({ favourites: updatedFavourites })
    .eq('user_id', userId)
    .select('favourites')
    .maybeSingle();

  if (updateError) {
    console.error('[addFavourites] update error', updateError);
    throw updateError;
  }

  if (!updateData) {
    throw new Error('Favourites update failed: no row returned');
  }

  return updateData.favourites as Recipe[];
}

// Uklanjanje iz favourites (vrati ažuriran niz)
export async function removeFavourite(userId: string, recipeId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('favourites')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw error;
  if (!data || !Array.isArray(data.favourites)) return [];

  const filtered = (data.favourites as Recipe[]).filter(r => r.id !== recipeId);

  const { data: updateData, error: updateError } = await supabase
    .from('profiles')
    .update({ favourites: filtered })
    .eq('user_id', userId)
    .select('favourites')
    .maybeSingle();

  if (updateError) throw updateError;
  return (updateData?.favourites as Recipe[]) ?? filtered;
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

