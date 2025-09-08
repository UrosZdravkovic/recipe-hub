import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { addIngredient, removeIngredient } from "@/features/recipes/ingredientsSlice";
import BottomHoverWrapper from "../ui/BottomHoverWrapper";

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
    <div className="w-full pt-6 pb-6 overflow-y-auto space-y-2 pr-3.5 pl-3.5 bg-white rounded-3xl scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
      {defaultIngredients.map((cat) => {
        const selectedCount = cat.ingredients.filter(ing =>
          selectedIngredients.some(sel => sel.id === ing.id)
        ).length;
        const totalCount = cat.ingredients.length;

        const visibleIngredients = open[cat.category]
          ? cat.ingredients
          : cat.ingredients.slice(0, 10);

        return (
          <div key={cat.category} className="mb-4 shadow-sm bg-white rounded-xl pr-4 border-1 border-amber-100 max-[1200px]:p-2">
            <div className="flex flex-col  items-start w-full font-semibold text-base mb-1 px-3 py-2">
              <div className="flex flex-row items-center justify-between w-full">
                <span className="text-left">{cat.category}</span>
                <span className="text-lg text-gray-500">{selectedCount}/{totalCount}</span>
              </div>
              <BottomHoverWrapper onClick={() => toggle(cat.category)}>
                {open[cat.category] ? "Show less" : "Show more"}
              </BottomHoverWrapper>
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