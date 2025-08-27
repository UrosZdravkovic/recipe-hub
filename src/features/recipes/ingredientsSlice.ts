import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

export type Ingredient = {
  id: string;
  name: string;
};

export type CuisineIngredients = {
  cuisine: string;
  ingredients: Ingredient[];
};

interface IngredientState {
  defaultIngredients: CuisineIngredients[];
  selectedIngredients: Ingredient[]; // ingredients the user selects
}

const initialState: IngredientState = {
  defaultIngredients: [
    {
      cuisine: "Italian",
      ingredients: [
        { id: "1", name: "tomato" },
        { id: "2", name: "olive oil" },
        { id: "3", name: "basil" },
      ],
    },
    {
      cuisine: "Japanese",
      ingredients: [
        { id: "4", name: "soy sauce" },
        { id: "5", name: "mirin" },
        { id: "6", name: "nori" },
      ],
    },
    {
      cuisine: "Mexican",
      ingredients: [
        { id: "7", name: "corn" },
        { id: "8", name: "chili pepper" },
        { id: "9", name: "cilantro" },
      ],
    },
  ],
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
  },
});

export const { addIngredient, removeIngredient, clearSelectedIngredients } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
