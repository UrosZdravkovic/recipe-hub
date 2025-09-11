import SelectedIngredients from "./SelectedIngredients"
import RecipeSearchForm from "./RecipeSearchForm"
import IngredientsList from "./IngredientsList"
import { ChevronLeft, ChevronRight } from "lucide-react"

type SidebarProps = {
    collapsed: boolean,
    setCollapsed: () => void
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
    return (
        <div className={` bg-orange-50 p-4 relative`}>
            <button
                onClick={setCollapsed}
                className={`fixed  transition-all duration-300 ease-in-out rounded-r-3xl cursor-pointer
                    w-3 flex items-center justify-center bg-orange-300 text-white hover:bg-orange-200 ${collapsed ? "left-0 h-[50%] top-2" : "[@media(max-width:500px)]:left-[0px] left-[350px] top-2 h-[40px]"}`}
                >
                {collapsed ? (
                    <ChevronRight className="w-3 h-3" />
                ) : (
                    <ChevronLeft className="w-3 h-3" />
                )}
            </button>

            <SelectedIngredients />
            <RecipeSearchForm />
            <IngredientsList />

        </div>
    )
}