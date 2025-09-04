import { useAppSelector } from "@/app/hooks";
import type { Recipe } from "@/features/recipes/recipeSlice";
import CookingLoader from "./CookingLoader";
import FindYourRecipes from "./FindYourRecipes";




function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function RecipeList() {
  const { recipes, loading } = useAppSelector((state) => state.recipes);




  if (loading) {
    return <CookingLoader />;
  }

  if (recipes.length === 0) {
    return <FindYourRecipes />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map((recipe: Recipe) => (
        <div
          key={recipe.id}
          className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center"
        >
          <h3 className="text-lg font-medium text-center mb-4">
            {capitalize(recipe.title)}
          </h3>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        </div>
      ))}
    </div>
  );
}
