import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addIngredient, removeIngredient, type Ingredient } from "../features/recipes/ingredientsSlice";
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
        setQuery(""); // očistimo input posle dodavanja
    }

    const allIngredients = defaultIngredients.flatMap((c) => c.ingredients);



    return (
        <Command className="border rounded-lg">
            <CommandInput
                placeholder="Type ingredient..."
                value={query}
                onValueChange={setQuery}
            />
            {query.length > 0 && (
                <CommandList className="max-h-40 overflow-auto">
                    {allIngredients
                        .filter((ing) =>
                            ing.name.toLowerCase().includes(query.toLowerCase())
                        )
                        .map((ing) => (
                            <CommandItem
                                key={ing.id}
                                value={ing.name}
                                onSelect={() => handleSelect(ing)}
                            >
                                {ing.name}
                            </CommandItem>
                        ))}
                </CommandList>
            )}
        </Command>
    )
}