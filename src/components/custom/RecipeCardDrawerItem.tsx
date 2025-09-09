import type { Recipe } from "@/features/recipes/recipeSlice";
import { ExternalLink } from "lucide-react";
import BottomHoverWrapper from "../ui/BottomHoverWrapper";
import { capitalize } from "./RecipeCard";
import { useState } from "react";

export default function RecipeCardDrawerItem({ recipe }: { recipe: Recipe }) {
    const [showFullInstructions, setShowFullInstructions] = useState(false);

    function getPreview(html: string, length: number) {
        const text = html.replace(/<[^>]+>/g, "");
        return text.length > length ? text.slice(0, length) + "..." : text;
    }
    
    const previewLength = 300;
    const hasLongInstructions = recipe.instructions && recipe.instructions.replace(/<[^>]+>/g, "").length > previewLength;


    return (
        <>
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
        </>
    )
}