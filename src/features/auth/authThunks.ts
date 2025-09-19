import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signUpUser,
  loginUser,
  logoutUser,
  addFavourites,
} from "../../services/authServices";
import type { Recipe } from "@/features/recipes/recipeSlice";

// Signup
export const signUpUserThunk = createAsyncThunk(
  "auth/signup",
  async ({ email, password }: { email: string; password: string }) => {
    const user = await signUpUser(email, password);
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
  return await logoutUser();
});

// Add Favourite
export const addFavouritesThunk = createAsyncThunk(
  "auth/addFavourite",
  async ({ userId, recipe }: { userId: string; recipe: Recipe }) => {
    return await addFavourites(userId, recipe);
  }
);
