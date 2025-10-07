import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import {
  signUpUserThunk,
  loginUserThunk,
  logoutUserThunk,
  addFavouritesThunk,
  removeFavouriteThunk,
  toggleFavouriteThunk,
  fetchProfileThunk,
  updateUserEmailThunk,
  updateUsernameThunk,
  updatePasswordThunk,
} from "@/features/auth/authThunks";
import type { Recipe } from "@/features/recipes/recipeSlice";

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, profile, loading, favouritesLoading, error } = useAppSelector(
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
  const removeFavourite = (payload: { userId: string; recipeId: string }) =>
    dispatch(removeFavouriteThunk(payload));
  const toggleFavourite = (payload: { userId: string; recipe: Recipe }) =>
    dispatch(toggleFavouriteThunk(payload));

  // profile updates
  const updateEmail = async (newEmail: string) =>
    await dispatch(updateUserEmailThunk(newEmail)).unwrap();

  const updateUsername = async (newUsername: string, userId: string) =>
    await dispatch(updateUsernameThunk({ newUsername, userId })).unwrap();

  const updatePassword = async (newPassword: string) =>
    await dispatch(updatePasswordThunk(newPassword)).unwrap();

  return {
    user,
    profile,
    loading,
    error,
    favouritesLoading,
    signup,
    login,
    logout,
    addFavourite,
    removeFavourite,
    toggleFavourite,
    updateEmail,
    updateUsername,
    updatePassword,
  };
}
