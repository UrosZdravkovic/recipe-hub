import { configureStore } from "@reduxjs/toolkit";
import { loadPersistedState, persistState, clearPersistedState } from "@/lib/persist";

import recipeReducer, { resetRecipes } from "../features/recipes/recipeSlice";
import ingredientsReducer, { resetSelectedIngredients } from "../features/recipes/ingredientsSlice";
import authReducer from "../features/auth/authSlice";
import { logoutUserThunk, loginUserThunk } from "@/features/auth/authThunks";

// Kreiranje store-a
const resetOnLogoutMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  const result = next(action);
  if (action.type === logoutUserThunk.fulfilled.type) {
    storeAPI.dispatch(resetRecipes());
    storeAPI.dispatch(resetSelectedIngredients());
    clearPersistedState();
  }
  // When logging in from an anonymous state, wipe previous anonymous UI snapshot
  if (action.type === loginUserThunk.fulfilled.type) {
    storeAPI.dispatch(resetRecipes());
    storeAPI.dispatch(resetSelectedIngredients());
    clearPersistedState();
  }
  return result;
};

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    ingredients: ingredientsReducer,
    auth: authReducer,
  },
  middleware: (getDefault) => getDefault().concat(resetOnLogoutMiddleware)
});

// Hydration after store creation (non-blocking)
const persisted = loadPersistedState();
if (persisted) {
  if (persisted.recipes) {
    store.dispatch({ type: 'recipes/hydrateRecipes', payload: persisted.recipes });
  }
  if (persisted.ingredients) {
    store.dispatch({ type: 'ingredients/hydrateSelectedIngredients', payload: persisted.ingredients.selectedIngredients });
  }
}

// Subscribe to persist future changes (throttle with simple timeout)
let persistTimeout: any;
store.subscribe(() => {
  clearTimeout(persistTimeout);
  persistTimeout = setTimeout(() => {
    const state: any = store.getState();
    persistState({
      recipes: {
        recipes: state.recipes.recipes,
        hasSearched: state.recipes.hasSearched,
      },
      ingredients: {
        selectedIngredients: state.ingredients.selectedIngredients,
      }
    });
  }, 150); // debounce
});

// Tip za ceo state (RootState)
export type RootState = ReturnType<typeof store.getState>;

// Tip za dispatch
export type AppDispatch = typeof store.dispatch;
