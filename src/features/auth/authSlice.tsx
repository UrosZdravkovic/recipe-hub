import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  login,
  logout,
  addFavouritesRecipe,
} from "./authThunks";
import type { Recipe } from "@/features/recipes/recipeSlice";

type Profile = {
  id: string;
  username: string;
  favourites: Recipe[];
}

type AuthState = {
  user: any | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  profile: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Signup failed";
      });

    // login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.profile = action.payload.profile;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      });

    // logout
    builder
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.profile = null;
      });

    // add favourite
    builder
      .addCase(addFavouritesRecipe.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.favourites = action.payload;
        }
      });
  },
});

export default authSlice.reducer;
