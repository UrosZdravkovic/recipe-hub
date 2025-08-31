import { useAppSelector } from "@/app/hooks";
import type { Recipe } from "@/features/recipes/recipeSlice";

export default function RecipeList() {
  const { recipes } = useAppSelector((state) => state.recipes);

  return (
    <div>
      {recipes.map((recipe: Recipe) => (
        <div key={recipe.id} className="border-b py-4">
          <h3 className="text-lg font-semibold">{recipe.title}</h3>
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
