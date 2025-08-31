import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addIngredient, removeIngredient, type Ingredient } from "../../features/recipes/ingredientsSlice";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Badge } from "../ui/badge";


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



    // ...existing code...
    return (
        <Command className="w-[50%] border rounded-lg ">
            {/* Flex container for badges and input */}
            <div className="flex flex-wrap items-center gap-2 p-2">

                <CommandInput
                    placeholder="Type ingredient..."
                    value={query}
                    onValueChange={setQuery}
                    className="flex-1 min-w-[250px] text-decoration-none"
                />

                {selectedIngredients.map((ing) => (
                    <Badge
                        key={ing.id}
                        variant="secondary"
                        className="cursor-pointer"
                        onClick={() => dispatch(removeIngredient(ing.id))}
                    >
                        {ing.name} ✕
                    </Badge>
                ))}
            </div>
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
    // ...existing code...

}