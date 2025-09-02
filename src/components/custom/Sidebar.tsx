import SelectedIngredients from "./SelectedIngredients"
import RecipeSearchForm from "./RecipeSearchForm"
import IngredientsList from "./IngredientsList"

export default function Sidebar() {
    return (
        <div className="w-[25%] min-w-[300px] bg-gradient-to-b bg-orange-50 space-y-6 border-r overflow-y-auto">
            <SelectedIngredients />
            <RecipeSearchForm />
            <IngredientsList />
        </div>
    )
}