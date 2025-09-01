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
      <div className="w-[20%] min-w-[300px] bg-gray-50 p-6 space-y-4 border-r">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="h-15 flex flex-col justify-end">
            <div
              ref={badgeScrollRef}
              className="overflow-y-auto flex flex-row flex-wrap items-center gap-2 w-full"
            >
              {selectedIngredients.length === 0 && (
                <span className="block w-full text-sm text-gray-400 italic mb-2 text-left">
                  No ingredients selected
                </span>
              )}
              {selectedIngredients.map((ing) => (
                <Badge
                  key={ing.id}
                  variant="secondary"
                  className="cursor-pointer text-xs px-2 py-1 bg-stone-600 text-white"
                  onClick={() => dispatch(removeIngredient(ing.id))}
                >
                  {ing.name} ✕
                </Badge>
              ))}
            </div>
          </div>

          <IngredientInput />
          <Button type="submit" className="text-stone-600 bg-white border-1 border-stone-600 hover:bg-stone-600 hover:text-white hover:cursor-pointer transition-all duration-300">
            Search Recipes
          </Button>
        </form>
        <IngredientsList />
      </div>

      {/* Main content: Recipe list */}
      <div className="w-[80%] p-6 overflow-y-auto">
        <RecipeList />
      </div>
    </div>
  );
}
