import { configureStore } from "@reduxjs/toolkit";
import { loadPersistedState, persistState } from "@/lib/persist";

import recipeReducer from "../features/recipes/recipeSlice";
import ingredientsReducer from "../features/recipes/ingredientsSlice";
import authReducer from "../features/auth/authSlice";

// Kreiranje store-a
export const store = configureStore({
  reducer: {
    recipes: recipeReducer, // dodajemo recipes slice
    ingredients: ingredientsReducer, // dodajemo ingredients slice
    auth: authReducer, // dodajemo auth slice
  },
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
