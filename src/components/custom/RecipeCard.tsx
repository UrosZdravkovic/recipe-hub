import { ExternalLink, Heart } from 'lucide-react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import type { Recipe } from "@/features/recipes/recipeSlice";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Drawer  direction="right">
      <DrawerTrigger asChild>
        <div
          className="flex items-center gap-6 p-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow min-h-[120px] cursor-pointer"
        >
          <div className="relative w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1 line-clamp-2">{capitalize(recipe.title)}</h3>
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
      </DrawerTrigger>
      <DrawerContent className="ml-auto rounded-l-2xl p-8 bg-white shadow-2xl">

        <h2 className="text-2xl font-bold mb-4">{capitalize(recipe.title)}</h2>
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
        {/* Add more recipe details here, e.g. ingredients, instructions, etc. */}
        <a
          href={recipe.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-orange-600 font-semibold mt-4"
        >
          <ExternalLink size={20} />
          See full recipe
        </a>
      </DrawerContent>
    </Drawer>
  );
}