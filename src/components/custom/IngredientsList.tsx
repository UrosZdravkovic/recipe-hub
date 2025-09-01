import { useState } from "react";
import { useAppSelector } from "@/app/hooks";

export default function IngredientsList() {
  const { defaultIngredients } = useAppSelector((state) => state.ingredients);
  const [open, setOpen] = useState<Record<string, boolean>>({});

  const toggle = (category: string) => {
    setOpen((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="max-h-[500px] overflow-y-auto space-y-4 p-2 bg-white rounded shadow">
      {defaultIngredients.map((cat) => (
        <div key={cat.category} className="border-b pb-2">
          <button
            className="flex items-center w-full text-left font-semibold text-lg mb-2 focus:outline-none"
            onClick={() => toggle(cat.category)}
          >
            <span>{cat.category}</span>
            <span className="ml-auto text-gray-400">
              {open[cat.category] ? "▲" : "▼"}
            </span>
          </button>
          {open[cat.category] && (
            <ul className="flex flex-wrap gap-2">
              {cat.ingredients.map((ing) => (
                <li key={ing.id} className="px-3 py-1 bg-gray-100 rounded text-sm">
                  {ing.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
