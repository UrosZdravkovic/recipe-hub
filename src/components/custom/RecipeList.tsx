import { useAppSelector } from "@/app/hooks";
import type { Recipe } from "@/features/recipes/recipeSlice";

export default function RecipeList() {
  const { recipes } = useAppSelector((state) => state.recipes);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {recipes.map((recipe: Recipe) => (
        <div key={recipe.id} className="border rounded-lg p-4 flex flex-col items-center">
          <h3 className="text-lg font-semibold text-center">{recipe.title}</h3>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="mt-2 w-32 h-32 object-cover rounded"
          />
        </div>
      ))}
    </div>
  );
}
