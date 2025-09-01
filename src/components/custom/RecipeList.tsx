import { useAppSelector } from "@/app/hooks";
import type { Recipe } from "@/features/recipes/recipeSlice";


const FALLBACK_IMAGE = "https://via.placeholder.com/256?text=No+Image";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function RecipeList() {
  const { recipes } = useAppSelector((state) => state.recipes);


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
            src={recipe.image || FALLBACK_IMAGE}
            alt={recipe.title} 
            className="w-64 h-64 object-cover rounded bg-gray-100"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />
        </div>
      ))}
    </div>
  );
}
