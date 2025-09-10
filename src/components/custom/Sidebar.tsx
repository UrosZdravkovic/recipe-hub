import SelectedIngredients from "./SelectedIngredients"
import RecipeSearchForm from "./RecipeSearchForm"
import IngredientsList from "./IngredientsList"

export default function Sidebar({collapsed}: {collapsed: boolean}) {
    return (
        <div className={`min-w-[300px] bg-orange-50 overflow-y-auto rounded-r-3xl p-4 `}>
            <div className={`transition-opacity duration-300 delay-170 ${collapsed ? "opacity-0" : "opacity-100"}`}>
                <SelectedIngredients />
                <RecipeSearchForm />
                <IngredientsList />
            </div>
        </div>
    )
}