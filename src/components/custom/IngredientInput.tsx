import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addIngredient, removeIngredient, type Ingredient } from "../../features/recipes/ingredientsSlice";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";


export default function IngredientInput() {
    const dispatch = useAppDispatch();
    const { defaultIngredients, selectedIngredients } = useAppSelector(
        (state) => state.ingredients
    );
    const [query, setQuery] = useState("");

    function handleSelect(ing: Ingredient) {
        const isSelected = selectedIngredients.some((i) => i.id === ing.id);
        if (isSelected) {
            dispatch(removeIngredient(ing.id));
        } else {
            dispatch(addIngredient(ing));
        }
        setQuery("");
    }

    const allIngredients = defaultIngredients.flatMap((c) => c.ingredients);
    const filteredIngredients = allIngredients.filter(
        (ing) =>
            ing.name.toLowerCase().includes(query.toLowerCase()) &&
            !selectedIngredients.some((sel) => sel.id === ing.id)
    );

    return (
        <Command className="w-full max-w-md border rounded-lg p-2 bg-white">
            <div>
                <CommandInput
                    placeholder="Your ingredients..."
                    value={query}
                    onValueChange={setQuery}
                />
            </div>
            {query.length > 0 && (
                <CommandList className="max-h-40 overflow-auto">
                    {filteredIngredients.map((ing) => (
                        <CommandItem
                            key={ing.id}
                            value={ing.name}
                            onSelect={() => handleSelect(ing)}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        >
                            {ing.name}
                        </CommandItem>
                    ))}
                </CommandList>
            )}
        </Command>
    );
}