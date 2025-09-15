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
    <div className="w-full pt-6 pb-6 overflow-y-auto space-y-2 bg-orange-50 rounded-3xl">
      {defaultIngredients.map((cat) => {
        const selectedCount = cat.ingredients.filter((ing) =>
          selectedIngredients.some((sel) => sel.id === ing.id)
        ).length;
        const totalCount = cat.ingredients.length;

        return (
          <div
            key={cat.category}
            className="shadow-sm bg-white rounded-xl pr-2 pb-1 border-1 border-amber-100 max-[1200px]:p-2"
          >
            <div className="flex flex-col items-start w-full font-semibold text-base mb-1 px-3 py-2">
              <div className="flex flex-row items-center justify-between w-full max-[800px]:flex-col max-[800px]:items-start">
                <span className="text-left">{cat.category}</span>
                <span className="text-lg text-gray-500">
                  {selectedCount}/{totalCount}
                </span>
              </div>

              <BottomHoverWrapper onClick={() => toggle(cat.category)}>
                <div className="relative inline-block w-[80px]">
                  {/* Show more */}
                  <span
                    className={`absolute left-0 top-0 transition-opacity duration-400 ${open[cat.category] ? "opacity-0" : "opacity-100"
                      }`}
                  >
                    Show more
                  </span>
                  {/* Show less */}
                  <span
                    className={`transition-opacity duration-400 ${open[cat.category] ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    Show less
                  </span>
                </div>
              </BottomHoverWrapper>
            </div>

            <div
              className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${open[cat.category] ? "max-h-[999px]" : "max-h-0"
                }`}
            >
              <ul className="flex flex-wrap gap-1 pl-2">
                {cat.ingredients.map((ing) => {
                  const isSelected = selectedIngredients.some(
                    (sel) => sel.id === ing.id
                  );
                  return (
                    <li
                      key={ing.id}
                      className={`px-3 py-1 rounded text-sm cursor-pointer transition-colors ${isSelected
                          ? "bg-blue-200 text-blue-800"
                          : "bg-gray-100 hover:bg-blue-50"
                        }`}
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
