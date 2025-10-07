import { createSlice } from "@reduxjs/toolkit";
import {
  signUpUserThunk,
  loginUserThunk,
  logoutUserThunk,
  addFavouritesThunk,
  fetchProfileThunk,   // 👈 dodaj ovde
} from "./authThunks";
import type { Recipe } from "@/features/recipes/recipeSlice";

export type Profile = {
  id: string;
  username: string;
  favourites: Recipe[];
};

type AuthState = {
  user: any | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
};

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
      .addCase(signUpUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(signUpUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Signup failed";
      })

      // login
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
        
      })

      // logout
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.profile = null;
      })

      // add favourite
      .addCase(addFavouritesThunk.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.favourites = action.payload;
        }
      })

      // 👇 fetch profile
      .addCase(fetchProfileThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Fetching profile failed";
      });
  },
});

export default authSlice.reducer;
