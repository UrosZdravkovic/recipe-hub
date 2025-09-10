import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import IngredientInput from "./IngredientInput";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { fetchRecipes } from "@/features/recipes/recipeSlice";


export default function RecipeSearchForm() {

    const dispatch = useAppDispatch();
    const { selectedIngredients } = useAppSelector(
        (state) => state.ingredients
    );
    const { loading } = useAppSelector((state) => state.recipes);
    // Ref for the scroll container
    const [showTooltip, setShowTooltip] = useState(false);


    // Submit recipes
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const queryString = selectedIngredients.map((i) => i.name).join(",");
        if (!queryString) {
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 2000); // Hide after 2s
            return;
        }

        dispatch(fetchRecipes({ query: queryString, number: 3 }));


    };

    return (
        <form onSubmit={handleSubmit} className="bg-orange-50">
            <IngredientInput />
            <TooltipProvider>
                <Tooltip open={showTooltip}>
                    <TooltipTrigger asChild>

                        <Button
                            type="submit"
                            className="text-lg w-[175px] mt-6 text-white bg-orange-500 border-0 hover:bg-orange-600 hover:cursor-pointer transition-all duration-300 rounded-lg py-3"
                        >
                            {loading ? "Searching..." : "Search Recipes"}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center">
                        Please add ingredients before searching!
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </form>
    )
}