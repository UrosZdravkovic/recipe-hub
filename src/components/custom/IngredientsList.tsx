import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { addIngredient, removeIngredient } from "@/features/recipes/ingredientsSlice";

export default function IngredientsList() {
  const dispatch = useAppDispatch();
  const { defaultIngredients, selectedIngredients } = useAppSelector((state) => state.ingredients);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (category: string) => {
    setOpen((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="w-full pt-6 pb-6 overflow-y-auto space-y-2 pr-3.5 pl-6 bg-white rounded-3xl scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
      {defaultIngredients.map((cat) => {
        const selectedCount = cat.ingredients.filter(ing =>
          selectedIngredients.some(sel => sel.id === ing.id)
        ).length;
        const totalCount = cat.ingredients.length;

        const visibleIngredients = open[cat.category]
          ? cat.ingredients
          : cat.ingredients.slice(0, 10);

        return (
          <div key={cat.category} className="mb-4 shadow-sm bg-white rounded-xl p-4 border-1 border-amber-100 max-[1200px]:p-2">
            <div className="flex items-center w-full font-semibold text-base mb-1 px-3 py-2">
              <div className="flex flex-col items-start gap-1 w-full">
                <span className="text-left w-full">{cat.category}</span>
                <span
                  className="text-xs text-gray-400 cursor-pointer relative pb-1
                    hover:text-orange-500 transition-colors duration-300
                    after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5
                    after:bg-orange-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  onClick={() => toggle(cat.category)}
                >
                  {open[cat.category] ? "Show less" : "Show more"}
                </span>
              </div>
              <span className="ml-auto text-lg text-gray-500">
                {selectedCount}/{totalCount}
              </span>
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden ${open[cat.category] ? "max-h-96 opacity-100" : "max-h-24 opacity-100"}`}
            >
              <ul className="flex flex-wrap gap-1 mt-2 mb-2">
                {visibleIngredients.map((ing) => {
                  const isSelected = selectedIngredients.some((sel) => sel.id === ing.id);
                  return (
                    <li
                      key={ing.id}
                      className={`px-3 py-1 rounded text-sm cursor-pointer transition-colors ${isSelected ? "bg-blue-200 text-blue-800" : "bg-gray-100 hover:bg-blue-50"}`}
                      onClick={() => {
                        if (isSelected) {
                          dispatch(removeIngredient(ing.id));
                        } else {
                          dispatch(addIngredient(ing));
                        }
                      }}
                    >
                      {ing.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
}