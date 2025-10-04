import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signUpUser,
  loginUser,
  logoutUser,
  addFavourites,
  removeFavourite,
  fetchUserProfile,
  updateUserEmail,
} from "../../services/authServices";
import { clearPersistedState } from "@/lib/persist";
import type { Recipe } from "@/features/recipes/recipeSlice";

// Signup
export const signUpUserThunk = createAsyncThunk(
  "auth/signup",
  async ({ email, password, username }: { email: string; password: string; username: string }) => {
    const user = await signUpUser(email, password, username);
    return { user };
  }
);

// Login
export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    return await loginUser(email, password);
  }
);

// Logout
export const logoutUserThunk = createAsyncThunk("auth/logout", async () => {
  await logoutUser();
  clearPersistedState(); // remove persisted UI snapshot (recipes, ingredients)
  return true;
});

// Add Favourite
export const addFavouritesThunk = createAsyncThunk(
  "auth/addFavourite",
  async ({ userId, recipe }: { userId: string; recipe: Recipe }) => {
    return await addFavourites(userId, recipe);
  }
);

export const removeFavouriteThunk = createAsyncThunk(
  "auth/removeFavourite",
  async ({ userId, recipeId }: { userId: string; recipeId: string }) => {
    return await removeFavourite(userId, recipeId);
  }
);

export const toggleFavouriteThunk = createAsyncThunk(
  "auth/toggleFavourite",
  async (
    { userId, recipe }: { userId: string; recipe: Recipe },
    { getState }
  ) => {
    const state: any = getState();
    const favourites: Recipe[] = state.auth.profile?.favourites || [];
    const exists = favourites.some((r) => r.id === recipe.id);
    if (exists) {
      return await removeFavourite(userId, recipe.id);
    }
    return await addFavourites(userId, recipe);
  }
);


export const fetchProfileThunk = createAsyncThunk(
  "auth/fetchProfile",
  async (userId: string) => {
    return await fetchUserProfile(userId);
  }
);

export const updateUserEmailThunk = createAsyncThunk(
  "auth/updateEmail",
  async (newEmail: string) => {
    return await updateUserEmail(newEmail);
  }
);