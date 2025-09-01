import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchRecipes } from "../features/recipes/recipeSlice";
import IngredientInput from "../components/custom/IngredientInput";
import RecipeList from "@/components/custom/RecipeList";
import { removeIngredient } from "@/features/recipes/ingredientsSlice";
import { Badge } from "@/components/ui/badge";



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
    <div className="flex h-screen">
      {/* Sidebar: Input & ingredient list */}
      <div className="w-[20%] min-w-[300px] bg-gray-50 p-6 space-y-4 border-r">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="pl-2">
            {selectedIngredients.length === 0 && (
              <span className="block text-sm text-gray-400 italic mb-2">No ingredients selected</span>
            )}    
          </div>
          {selectedIngredients.map((ing) => (
            <Badge
              key={ing.id}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => dispatch(removeIngredient(ing.id))}
            >
              {ing.name} ✕
            </Badge>
          ))}
          <IngredientInput />
          <Button type="submit">Search Recipes</Button>
        </form>
      </div>

      {/* Main content: Recipe list */}
      <div className="w-[80%] p-6 overflow-y-auto">
        <RecipeList />
      </div>
    </div>
  );
}
