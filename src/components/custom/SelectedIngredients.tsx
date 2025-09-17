import { useRef, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { removeIngredient, clearSelectedIngredients } from "@/features/recipes/ingredientsSlice";
import { Badge } from "@/components/ui/badge";

export default function SelectedIngredients() {
  const { selectedIngredients } = useAppSelector((s) => s.ingredients);
  const dispatch = useAppDispatch();

  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollLeft = el.scrollWidth; // auto-scroll na kraj kada se doda novi
    setHasOverflow(el.scrollWidth > el.clientWidth);
  }, [selectedIngredients]);

  return (
    <div className="mb-3">
      {/* Red 1: Selected + Clear all (u istom redu) */}
      <div className="mb-2 flex items-center justify-between max-[400px]:justify-start">
        <span className="text-xs px-2 font-semibold text-gray-700">
          Selected ({selectedIngredients.length})
        </span>
        <button
          type="button"
          onClick={() => dispatch(clearSelectedIngredients())}
          disabled={selectedIngredients.length === 0}
          className="text-xs px-2 py-2 rounded-md bg-orange-100  text-orange-700 hover:text-orange-500 transition-all duration-300 cursor-pointer "
        >
          Clear all
        </button>
      </div>

      {/* Red 2: Badge-ovi (scroll) */}
      <div className="relative">
        {hasOverflow && (
          <>
            <div className="pointer-events-none absolute left-0 top-0 bottom-1 w-6 bg-gradient-to-r from-orange-50 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-1 w-6 bg-gradient-to-l from-orange-50 to-transparent" />
          </>
        )}

        <div
          ref={scrollRef}
          className="flex items-center gap-1 overflow-x-auto overflow-y-hidden whitespace-nowrap pr-4 pb-2 -mb-2 scrollbar-thin"
        >
          {selectedIngredients.length === 0 ? (
            <span className="text-sm text-gray-400 italic shrink-0">
              No ingredients selected...
            </span>
          ) : (
            selectedIngredients.map((ing) => (
              <Badge
                key={ing.id}
                variant="secondary"
                className="shrink-0 whitespace-nowrap rounded-full bg-orange-100 text-orange-800 hover:bg-orange-200 transition cursor-pointer"
                onClick={() => dispatch(removeIngredient(ing.id))}
                aria-label={`Remove ${ing.name}`}
                title={`Remove ${ing.name}`}
              >
                {ing.name} ✕
              </Badge>
            ))
          )}
        </div>
      </div>
    </div>
  );
}