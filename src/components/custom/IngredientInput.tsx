import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addIngredient, removeIngredient, type Ingredient } from "../../features/recipes/ingredientsSlice";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";


export default function IngredientInput() {

    const commandRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();
    const { defaultIngredients, selectedIngredients } = useAppSelector(
        (state) => state.ingredients
    );

    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (commandRef.current && !commandRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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
        <Command ref={commandRef} className="max-w-md rounded-r-none rounded-l-lg bg-white">
            <div className="p-2">
                <CommandInput
                    placeholder="Search our ingredients list..."
                    value={query}
                    onValueChange={val => {
                        setQuery(val);
                        setIsOpen(val.length > 0);

                    }}
                />
            </div>
            {isOpen && (
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