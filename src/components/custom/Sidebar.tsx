import SelectedIngredients from "./SelectedIngredients"
import RecipeSearchForm from "./RecipeSearchForm"
import IngredientsList from "./IngredientsList"

export default function Sidebar() {
    return (
        <div className="w-[25%] min-w-[200px] bg-orange-50 overflow-y-auto border-1 border-r-amber-500">
            <SelectedIngredients />
            <RecipeSearchForm />
            <IngredientsList />
        </div>
    )
}