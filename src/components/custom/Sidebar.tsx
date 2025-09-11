import SelectedIngredients from "./SelectedIngredients"
import RecipeSearchForm from "./RecipeSearchForm"
import IngredientsList from "./IngredientsList"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

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
                    w-3 flex items-center justify-center bg-orange-300 text-white hover:bg-orange-200 ${collapsed ? "left-0 h-[50%] top-2" : "[@media(max-width:500px)]:left-[300px] max-[400px]:hidden left-[350px] top-2 h-[40px]"}`}
            >
                {collapsed ? (
                    <ChevronRight className="w-3 h-3" />
                ) : (
                    <ChevronLeft className="w-3 h-3" />
                )}
            </button>

            {!collapsed && (
                <button
                    type="button"
                    onClick={setCollapsed}
                    aria-label="Zatvori sidebar"
                    className="hidden max-[400px]:flex items-center justify-center absolute top-2 right-2 h-8 w-8
                     rounded-full bg-orange-500 text-white shadow-md hover:bg-orange-600 active:scale-95 transition"
                >
                    <X className="w-4 h-4" />
                </button>
            )}

            <SelectedIngredients />
            <RecipeSearchForm />
            <IngredientsList />

        </div>
    )
}