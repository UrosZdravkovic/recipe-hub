import { configureStore } from "@reduxjs/toolkit";

import recipeReducer from "../features/recipes/recipeSlice";
import ingredientsReducer from "../features/recipes/ingredientsSlice";

// Kreiranje store-a
export const store = configureStore({
  reducer: {
    recipes: recipeReducer, // dodajemo recipes slice
    ingredients: ingredientsReducer, // dodajemo ingredients slice
  },
});

// Tip za ceo state (RootState)
export type RootState = ReturnType<typeof store.getState>;

// Tip za dispatch
export type AppDispatch = typeof store.dispatch;
