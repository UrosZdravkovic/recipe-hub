import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchRecipes } from "../features/recipes/recipeSlice";
import IngredientInput from "../components/custom/IngredientInput";
import RecipeList from "@/components/custom/RecipeList";



export default function Home() {
  const dispatch = useAppDispatch();
  const { selectedIngredients } = useAppSelector(
    (state) => state.ingredients
  );

  // Submit recipes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const queryString = selectedIngredients.map((i) => i.name).join(",");
    if (!queryString) return;
    dispatch(fetchRecipes({ query: queryString, number: 10 }));

  };


  return (
    <div className="p-6 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selected ingredients */}

        {/* Command input za pretragu */}
        <IngredientInput />

        {/* Dugme za search */}
        <Button type="submit">Search Recipes</Button>
      </form>

      <RecipeList />
    </div>
  );
}
