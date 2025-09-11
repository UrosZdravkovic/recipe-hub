import React from "react";
import type { Recipe } from "@/features/recipes/recipeSlice";
import { Heart, ExternalLink } from "lucide-react";

const RecipeListCardItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { recipe: Recipe }>(
  ({ recipe, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      className={`flex items-center gap-6 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow min-h-[120px] cursor-pointer ${props.className ?? ""}`}
    >
      <div className="rounded-xl min-h-40 min-w-40 overflow-hidden bg-gray-100 w-40 h-40">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-2">{recipe.title}</h3>
          <ul className="flex flex-wrap gap-1 mt-1">
            {recipe.ingredients.slice(0, 3).map((ingredient, idx) => (
              <li key={idx} className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-700">
                {ingredient}
              </li>
            ))}
            {recipe.ingredients.length > 3 && (
              <li className="text-xs text-gray-400 px-1 py-1 hover:text-gray-700 transition-colors duration-300  ">
                +{recipe.ingredients.length - 3} more
              </li>
            )}
          </ul>
        </div>
        <div className="flex gap-3 mt-3">
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Favorite"
          >
            <Heart size={20} className="text-gray-400" />
          </button>
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="See full recipe"
          >
            <ExternalLink size={20} className="text-gray-400" />
          </a>
        </div>
      </div>
    </div>
  )
);

export default RecipeListCardItem;