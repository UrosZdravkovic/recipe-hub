import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../features/recipes/recipeSlice";

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  },
});

export default store;