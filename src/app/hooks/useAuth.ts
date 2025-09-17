import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  signUpUserThunk,
  loginUserThunk,
  logoutUserThunk,
  addFavouritesThunk,
} from "../../features/auth/authThunks";
import type { Recipe } from "@/features/recipes/recipeSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, profile, loading, error } = useAppSelector(
    (state) => state.auth
  );

  // Auth akcije sa payload-om kao objekat
  const signup = (payload: { email: string; password: string; username: string }) =>
    dispatch(signUpUserThunk(payload));

  const login = (payload: { email: string; password: string }) =>
    dispatch(loginUserThunk(payload));

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
