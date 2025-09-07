import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";



export type Recipe = {
  id: string;
  title: string;
  image: string;
  sourceUrl: string;
  ingredients: string[];
  instructions: string;
};

type RecipeState = {
  recipes: Recipe[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  recipes: [],
  loading: false,
  error: null,
  
};

// Thunk to fetch recipes from Spoonacular
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async ({ query, number }: { query: string; number?: number }, { rejectWithValue }) => {
    try {
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
      const ingredients = query.split(",").map((item) => item.trim());
      
      const response = await api.get("/recipes/complexSearch", {
        params: {
          apiKey,
          addRecipeInformation: true,
          fillIngredients: true,
          number: number ?? 10, // default to 10 if not provided
          ...(ingredients.length > 1
            ? { includeIngredients: ingredients.join(",") }
            : { query }),
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));

      return response.data.results.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        image: item.image,
        sourceUrl: item.sourceUrl,
        ingredients: item.extendedIngredients?.map((ing: any) => ing.name) ?? [],
        instructions: item.summary || "No instructions provided."
      }));

    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Recipe[]>) => {
        state.recipes = action.payload;
    }, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
        state.recipes = action.payload;
        state.loading = false;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;
