import { useAppSelector } from "@/app/hooks";
import type { Recipe } from "@/features/recipes/recipeSlice";
import RecipeCard from "./RecipeCard";
import CookingLoader from "./CookingLoader";
import NoRecipesFound from "./NoRecipesFound";







export default function RecipeList() {
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
    <div className="grid grid-cols-2 gap-3 max-[1200px]:grid-cols-1">
      {recipes.map((recipe: Recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}     
    </div>
  );
}
