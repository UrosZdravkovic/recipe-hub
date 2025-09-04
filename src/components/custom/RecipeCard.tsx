import type { Recipe } from "@/features/recipes/recipeSlice";

type RecipeCardProps = {
  recipe: Recipe;
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function RecipeCard({ recipe }: RecipeCardProps) {

    return (
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
          <span> 
            <a
              href={recipe.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Recipe
            </a>
          </span>
        </div>
      );
}