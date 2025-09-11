import { useAppSelector } from "@/app/hooks";
import type { Recipe } from "@/features/recipes/recipeSlice";
import RecipeCard from "./RecipeCard";
import CookingLoader from "./CookingLoader";
import NoRecipesFound from "./NoRecipesFound";







export default function RecipeList({ collapsed }: { collapsed: boolean }) {
  const { recipes, loading, error, hasSearched } = useAppSelector((state) => state.recipes);



  if (loading) {
    return <CookingLoader />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-4">
        Error fetching recipes: {error}
      </div>
    );
  }

  if (hasSearched && recipes.length === 0) {
    return (
      <NoRecipesFound />
    );
  }


  return (
    <div className={`grid gap-3 ${collapsed ? "grid-cols-3" : "grid-cols-1"} ${collapsed
      ? "[@media(max-width:1100px)]:grid-cols-2 [@media(max-width:850px)]:grid-cols-1"
      : "[@media(min-width:1200px)]:grid-cols-2"}`}>
      {recipes.map((recipe: Recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
