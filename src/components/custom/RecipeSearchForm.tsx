import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import IngredientInput from "./IngredientInput";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { fetchRecipes } from "@/features/recipes/recipeSlice";
import { CiSearch } from "react-icons/ci";
import { Loader2 } from "lucide-react";


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
                            className="w-[25%] h-[52px] text-white bg-orange-500 border-l-0 rounded-l-none rounded-r-lg hover:bg-orange-600 hover:cursor-pointer transition-all duration-300 flex items-center justify-center"
                        >
                            <span>
                                {loading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <CiSearch className="stroke-[1.5]" />
                                )}
                            </span>
                        </Button>
                    </TooltipTrigger>

                    {/* Add TooltipContent as a sibling to TooltipTrigger inside Tooltip */}
                    <TooltipContent
                        side="top"
                        align="center"
                        sideOffset={8}
                        className="text-sm font-medium"
                    >
                        Please add at least one ingredient.
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

        </form>
    )
}

