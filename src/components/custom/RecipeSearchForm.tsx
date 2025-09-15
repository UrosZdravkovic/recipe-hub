import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import IngredientInput from "./IngredientInput";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { fetchRecipes } from "@/features/recipes/recipeSlice";

type RecipeSearchFormProps = {
    handleCollapse: () => void;
};

export default function RecipeSearchForm({ handleCollapse }: RecipeSearchFormProps) {

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
        if (window.innerWidth < 750) {
            handleCollapse();
        }
        

    };

    return (
        <form onSubmit={handleSubmit} className="flex">
            <IngredientInput />
            <TooltipProvider>
                <Tooltip open={showTooltip}>
                    <TooltipTrigger asChild>

                        <Button
                            type="submit"
                            className="w-[25%] text-white bg-orange-500 border-l-0 rounded-l-none rounded-r-lg hover:bg-orange-600 hover:cursor-pointer transition-all duration-300"
                        >
                            <span>{loading ? ".." : "f"}</span>
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