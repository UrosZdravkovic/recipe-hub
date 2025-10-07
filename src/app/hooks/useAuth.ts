import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  signUpUserThunk,
  loginUserThunk,
  logoutUserThunk,
  addFavouritesThunk,
  fetchProfileThunk,
} from "@/features/auth/authThunks";
import type { Recipe } from "@/features/recipes/recipeSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, profile, loading, error } = useAppSelector(
    (state) => state.auth
  );

  // automatski fetch profila kada se user promeni
  useEffect(() => {
    if (user && !profile) {
      dispatch(fetchProfileThunk(user.id));
    }
  }, [user, profile, dispatch]);

  // akcije
  async function signup(payload: { email: string; password: string; username: string }) {
    return await dispatch(signUpUserThunk(payload)).unwrap();
  }

  async function login(payload: { email: string; password: string }) {
    return await dispatch(loginUserThunk(payload)).unwrap();
  }

  const logout = () => dispatch(logoutUserThunk());

  const addFavourite = (payload: { userId: string; recipe: Recipe }) =>
    dispatch(addFavouritesThunk(payload));

  return {
    user,
    profile,
    loading,
    error,
    signup,
    login,
    logout,
    addFavourite,
  };
}
