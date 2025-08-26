import { createSlice, type PayloadAction } from "@reduxjs/toolkit";


type Recipe = {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string;
};

type RecipeState = {
  recipes: Recipe[];
  loading: false,
  error: null,
}

const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: null,
};


const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
        state.recipes = action.payload;
    }
  },
});

export const { setRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
