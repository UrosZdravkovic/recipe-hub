import { createSlice } from "@reduxjs/toolkit";
import {
  signUpUserThunk,
  loginUserThunk,
  logoutUserThunk,
  addFavouritesThunk,
  removeFavouriteThunk,
  toggleFavouriteThunk,
  fetchProfileThunk,
  updateUserEmailThunk,
  updateUsernameThunk,   // 👈 dodaj ovde
  updatePasswordThunk,
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
  loading: boolean; // auth/profile fetching
  favouritesLoading: boolean; // add/remove/toggle favourites
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  profile: null,
  loading: false,
  favouritesLoading: false,
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
        // Reset related UI slices through direct reducer invocation style dispatch pattern
        // (Since we are inside a reducer, we can't dispatch; but we can rely on middleware approach.
        // Instead, consumers can listen, or we expose a meta action. Simpler: state cleared here only.)
      })

      // add favourite
      .addCase(addFavouritesThunk.pending, (state) => {
        state.favouritesLoading = true;
      })
      .addCase(addFavouritesThunk.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.favourites = action.payload;
        }
        state.favouritesLoading = false;
      })
      .addCase(addFavouritesThunk.rejected, (state, action) => {
        state.favouritesLoading = false;
        state.error = action.error.message || 'Add favourite failed';
      })
      // remove favourite
      .addCase(removeFavouriteThunk.pending, (state) => {
        state.favouritesLoading = true;
      })
      .addCase(removeFavouriteThunk.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.favourites = action.payload;
        }
        state.favouritesLoading = false;
      })
      .addCase(removeFavouriteThunk.rejected, (state, action) => {
        state.favouritesLoading = false;
        state.error = action.error.message || 'Remove favourite failed';
      })
      // toggle favourite
      .addCase(toggleFavouriteThunk.pending, (state) => {
        state.favouritesLoading = true;
      })
      .addCase(toggleFavouriteThunk.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.favourites = action.payload;
        }
        state.favouritesLoading = false;
      })
      .addCase(toggleFavouriteThunk.rejected, (state, action) => {
        state.favouritesLoading = false;
        state.error = action.error.message || 'Toggle favourite failed';
      })

      // 👇 fetch profile
      .addCase(fetchProfileThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        const row: any = action.payload; // Supabase row { user_id, username, favourites? }
        state.profile = {
          id: row.user_id,
          username: row.username ?? "",
          favourites: Array.isArray(row.favourites) ? row.favourites : [],
        };
      })
      .addCase(fetchProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Fetching profile failed";
      })


      .addCase(updateUserEmailThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(updateUserEmailThunk.fulfilled, (state, action) => {
        if (state.user && action.payload?.email) {
          state.user.email = action.payload.email;
        }
      })
      .addCase(updateUserEmailThunk.rejected, (state, action) => {
        state.error = action.error.message || "Updating email failed";
      })
      // updateEmail 

      .addCase(updateUsernameThunk.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.username = action.payload?.username;
        }
      })

      // password update (no state change needed besides error handling)
      .addCase(updatePasswordThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Updating password failed';
      })
      .addCase(updatePasswordThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(updatePasswordThunk.fulfilled, () => {
        // password updated successfully
      })

  },
});

export default authSlice.reducer;
