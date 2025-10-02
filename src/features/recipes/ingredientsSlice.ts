import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import ingredientsData from "@/data/ingredients.json";

export type Ingredient = {
  id: string;
  name: string;
};

export type CategoryIngredients = {
  category: string;
  ingredients: Ingredient[];
};

interface IngredientState {
  defaultIngredients: CategoryIngredients[];
  selectedIngredients: Ingredient[];
}

// Convert JSON to state format
const defaultIngredients: CategoryIngredients[] = ingredientsData.categories.map((cat, idx) => ({
  category: cat.name,
  ingredients: cat.ingredients.map((name, i) => ({
    id: `${idx}-${i}`,
    name,
  })),
}));

const initialState: IngredientState = {
  defaultIngredients,
  selectedIngredients: [],
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<Ingredient>) => {
      state.selectedIngredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (i) => i.id !== action.payload
      );
    },
    clearSelectedIngredients: (state) => {
      state.selectedIngredients = [];
    },
    hydrateSelectedIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      state.selectedIngredients = action.payload;
    },
    resetSelectedIngredients: (state) => {
      state.selectedIngredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, clearSelectedIngredients, hydrateSelectedIngredients, resetSelectedIngredients } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
