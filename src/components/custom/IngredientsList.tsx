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
        <div className="max-h-[600px] overflow-y-auto space-y-2 pr-3.5 pl-2 bg-white rounded scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-50">
            {defaultIngredients.map((cat) => (
                <div key={cat.category}>
                    <button
                        className="flex items-center w-full text-left font-medium text-base py-1 focus:outline-none bg-transparent"
                        onClick={() => toggle(cat.category)}
                    >
                        <span className="text-gray-700">{cat.category}</span>
                        <span
                            className={`ml-auto text-gray-400 transition-transform duration-300 ${open[cat.category] ? "rotate-180" : ""}`}
                        >
                            ▼
                        </span>
                    </button>
                    <div
                        className={`transition-all duration-300 overflow-hidden ${open[cat.category] ? "max-h-auto opacity-100" : "max-h-0 opacity-0"}`}
                    >
                        <ul className="flex flex-wrap gap-1 mt-3 mb-3">
                            {cat.ingredients.map((ing) => {
                                const isSelected = selectedIngredients.some((sel) => sel.id === ing.id);
                                return (
                                    <li
                                        key={ing.id}
                                        className={`px-2 py-1 rounded text-xs cursor-pointer transition-colors border border-transparent ${isSelected ? "bg-stone-600 text-white" : "bg-gray-50 hover:bg-gray-200 text-gray-700"}`}
                                        onClick={() => {
                                            if (!isSelected) {
                                                dispatch(addIngredient(ing));
                                            } else {
                                                dispatch(removeIngredient(ing.id));
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
            ))}
        </div>
    );
}