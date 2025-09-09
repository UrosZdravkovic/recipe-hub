import { useAppSelector } from "@/app/hooks";
import type { Recipe } from "@/features/recipes/recipeSlice";
import RecipeCard from "./RecipeCard";
import CookingLoader from "./CookingLoader";
import FindYourRecipes from "./FindYourRecipes";






export default function RecipeList() {
  const { recipes, loading, error } = useAppSelector((state) => state.recipes);

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
  
  if (recipes.length === 0) {
    return <FindYourRecipes />;
  }

  


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:[1300px]:grid-cols-3 gap-6">
      {recipes.map((recipe: Recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}     
    </div>
  );
}
