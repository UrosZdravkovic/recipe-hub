import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchRecipes } from "../features/recipes/recipeSlice";
import IngredientInput from "../components/custom/IngredientInput";
import RecipeList from "@/components/custom/RecipeList";
import { removeIngredient } from "@/features/recipes/ingredientsSlice";
import { Badge } from "@/components/ui/badge";
import IngredientsList from "@/components/custom/IngredientsList";
import { useRef, useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const { selectedIngredients } = useAppSelector(
    (state) => state.ingredients
  );

  // Ref for the scroll container
  const badgeScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (badgeScrollRef.current) {
      badgeScrollRef.current.scrollTop = badgeScrollRef.current.scrollHeight;
    }
  }, [selectedIngredients]);

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
      <div className="w-[25%] min-w-[300px] bg-gradient-to-b bg-orange-50 space-y-6 border-r overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          <div className="h-24 flex flex-col justify-end">
            <div
              ref={badgeScrollRef}
              className="overflow-y-auto flex flex-row flex-wrap items-center gap-3 w-full"
            >
              {selectedIngredients.length === 0 && (
                <span className="block w-full text-lg text-gray-400 italic mb-2 text-center">
                  No ingredients selected
                </span>
              )}
              {selectedIngredients.map((ing) => (
                <Badge
                  key={ing.id}
                  variant="secondary"
                  className="cursor-pointer text-xs px-3 py-2 bg-orange-400 text-white hover:bg-orange-600 hover:cursor-pointer transition-all duration-300"
                  onClick={() => dispatch(removeIngredient(ing.id))}
                >
                  {ing.name} ✕
                </Badge>
              ))}
            </div>
          </div>

          <IngredientInput />
          <Button type="submit" className="text-lg text-white bg-orange-500 border-0 hover:bg-orange-600 hover:cursor-pointer transition-all duration-300 rounded-lg py-3">
            Search Recipes
          </Button>
        </form>
        <IngredientsList />
      </div>

      {/* Main content: Recipe list */}
      <div className="w-[75%] p-8 overflow-y-auto">
        <RecipeList />
      </div>
    </div>
  );
}
