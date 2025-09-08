import { useAppSelector } from "@/app/hooks";
import type { Recipe } from "@/features/recipes/recipeSlice";
import RecipeCard from "./RecipeCard";
import CookingLoader from "./CookingLoader";
import FindYourRecipes from "./FindYourRecipes";






export default function RecipeList() {
  const { recipes, loading } = useAppSelector((state) => state.recipes);

  if (loading) {
    return <CookingLoader />;
  }

  if (recipes.length === 0) {
    return <FindYourRecipes />;
  }
  console.log(recipes);


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:[1300px]:grid-cols-3 gap-6">
      {recipes.map((recipe: Recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}     
    </div>
  );
}
