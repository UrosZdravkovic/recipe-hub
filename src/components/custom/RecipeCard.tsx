import { ExternalLink, Heart } from 'lucide-react';
import { Drawer, DrawerTrigger, DrawerContent, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type { Recipe } from "@/features/recipes/recipeSlice";
import { useState } from "react";
import BottomHoverWrapper from "../ui/BottomHoverWrapper";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const [showFullInstructions, setShowFullInstructions] = useState(false);

  // Strip HTML tags for preview (optional, if instructions are HTML)
  function getPreview(html: string, length: number) {
    const text = html.replace(/<[^>]+>/g, "");
    return text.length > length ? text.slice(0, length) + "..." : text;
  }

  const previewLength = 300;
  const hasLongInstructions = recipe.instructions && recipe.instructions.replace(/<[^>]+>/g, "").length > previewLength;

  return (
    <Drawer direction="right">
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
              <ul className="flex flex-wrap gap-1 mt-2 mb-2">
                {recipe.ingredients.slice(0, 6).map((ingredient, idx) => (
                  <li key={idx} className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-700">
                    {ingredient}
                  </li>
                ))}
                {recipe.ingredients.length > 6 && (
                  <li className="text-xs text-gray-400 px-2 py-1">+{recipe.ingredients.length - 6} more</li>
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
      </DrawerTrigger>
      <DrawerContent className="h-[100vh] overflow-y-auto ml-auto rounded-l-2xl p-8 bg-white shadow-2xl">
        <VisuallyHidden>
          <DrawerTitle>Recipe Details</DrawerTitle>
          <DrawerDescription>
            More information about {capitalize(recipe.title)}.
          </DrawerDescription>
        </VisuallyHidden>
        <h2 className="text-2xl font-bold mb-4">{capitalize(recipe.title)}</h2>
        <div className="w-64 h-44 mb-4 flex items-center justify-center">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        <a
          href={recipe.sourceUrl}
          target="_blank"
          className="inline-flex items-center gap-2 text-orange-600 font-semibold mb-4"
        >
          <ExternalLink size={20} />
          <span
            className="relative
              after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-orange-600
              after:scale-x-0 hover:after:scale-x-100 after:transition-all after:duration-300"
          >
            See full recipe
          </span>
        </a>

        <ul className="mt-2 flex flex-wrap gap-2">
          {recipe.ingredients.map((ingredient, idx) => (
            <li key={idx} className="bg-gray-100 rounded px-2 py-1 text-xs text-gray-700">
              {ingredient}
            </li>
          ))}
        </ul>

        {recipe.instructions && (
          <div className="mt-4 text-gray-700 text-sm leading-relaxed">
            {!showFullInstructions && hasLongInstructions ? (
              <>
                {getPreview(recipe.instructions, previewLength)}
                <BottomHoverWrapper
                  className="ml-2 text-orange-600 text-xs"
                  onClick={() => setShowFullInstructions(true)}
                  role="button"
                  tabIndex={0}
                >
                  Show more
                </BottomHoverWrapper>
              </>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
            )}
            {showFullInstructions && hasLongInstructions && (
              <BottomHoverWrapper
                className="text-orange-600 text-xs"
                onClick={() => setShowFullInstructions(false)}
                role="button"
                tabIndex={0}
              >
                Show less
              </BottomHoverWrapper>
            )}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}