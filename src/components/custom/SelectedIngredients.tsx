import { useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch} from "@/app/hooks";
import { removeIngredient } from "@/features/recipes/ingredientsSlice";
import { Badge } from "@/components/ui/badge";

export default function SelectedIngredients() {
    const { selectedIngredients } = useAppSelector(
        (state) => state.ingredients
    );

    const dispatch = useAppDispatch();
    const badgeScrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (badgeScrollRef.current) {
            badgeScrollRef.current.scrollTop = badgeScrollRef.current.scrollHeight;
        }
    }, [selectedIngredients]);

    return (
        <div className="flex justify-center h-14 border-1 border-amber-200 p-2 pr-0.5 mb-2 rounded-xl bg-white shadow-sm">
            <div
                ref={badgeScrollRef}
                className="overflow-y-auto flex flex-row flex-wrap items-center gap-1 w-full"
            >
                {selectedIngredients.length === 0 && (
                    <span className="block w-full text-lg text-gray-400 italic mb-1 text-left">
                        No ingredients selected
                    </span>
                )}
                {selectedIngredients.map((ing) => (
                    <Badge
                        key={ing.id}
                        variant="secondary"
                        className="cursor-pointer text-xs px-2 py-2 bg-orange-400 text-white hover:bg-orange-600 hover:cursor-pointer transition-all duration-300"
                        onClick={() => dispatch(removeIngredient(ing.id))}
                    >
                        {ing.name} ✕
                    </Badge>
                ))}
            </div>
        </div>
    )
}