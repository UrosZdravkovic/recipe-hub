import { createSlice, type PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/axios";


type Recipe = {
  id: string;
  title: string;
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
  async (query: string, { rejectWithValue }) => {
    try {
      const apiKey = "";  

      // Ako user unese više itema, splitujemo po zarezu i trimujemo ekstra space
      const ingredients = query.split(",").map((item) => item.trim());

      const response = await api.get("/recipes/complexSearch", {
        params: {
          apiKey,
          ...(ingredients.length > 1
            ? { includeIngredients: ingredients.join(",") }
            : { query }), // ako je samo jedna reč, koristi "query"
        },
      });

      return response.data.results.map((item: any) => ({
        id: item.id.toString(),
        title: item.title,
        ingredients: [],
        instructions: "",
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
