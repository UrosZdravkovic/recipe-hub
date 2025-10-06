import SelectedIngredients from "./SelectedIngredients"
import RecipeSearchForm from "./RecipeSearchForm"
import IngredientsList from "./IngredientsList"
import FavouritesList from "./FavouritesList"
import { useState, useEffect } from "react"
import { useAuth } from "@/app/hooks/useAuth"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import ProfileControls from "./ProfileControls"

type SidebarProps = {
    collapsed: boolean,
    setCollapsed: () => void
}

export default function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
    const { user, profile } = useAuth();
    const favCount = profile?.favourites?.length ?? 0;
    const [showFavourites, setShowFavourites] = useState(false);

    // If user logs out while on favourites tab, revert to ingredients view
    useEffect(() => {
        if (!user && showFavourites) {
            setShowFavourites(false);
        }
    }, [user, showFavourites]);
    return (
        <div className={`fixed inset-0 z-40 bg-orange-50 w-full max-w-[350px] p-4 shadow-xl transition-transform duration-300 ${collapsed ? '-translate-x-full' : 'translate-x-0'} h-full flex flex-col` }>
            <ProfileControls />
            <button
                onClick={setCollapsed}
                className={`absolute transition-all duration-300 ease-in-out rounded-r-3xl cursor-pointer
                    w-3 flex items-center justify-center bg-orange-300 text-white hover:bg-orange-200 ${collapsed ? "-right-3 top-6 h-[50%]" : "-right-3 top-6 h-[40px]"}`}
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

            {user && (
                <div className="flex items-center gap-2 mt-2 mb-3">
                    <button
                        type="button"
                        onClick={() => setShowFavourites(false)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-md border transition ${!showFavourites ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-orange-200 text-gray-600 hover:bg-orange-100'}`}
                    >
                        Ingredients
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowFavourites(true)}
                        className={`relative flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-md border transition ${showFavourites ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-orange-200 text-gray-600 hover:bg-orange-100'}`}
                        aria-label={`Favourites (${favCount})`}
                    >
                        <span>Favourites</span>
                        <span className={`min-w-5 h-5 px-1.5 flex items-center justify-center rounded-full text-[10px] font-semibold ${showFavourites ? 'bg-white/20 text-white' : 'bg-orange-500 text-white'}`}>
                            {favCount}
                        </span>
                    </button>
                </div>
            )}

            <div className="flex-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-transparent">
                {!showFavourites && (
                    <>  
                        <SelectedIngredients />
                        <RecipeSearchForm handleCollapse={setCollapsed} />
                        <IngredientsList />
                    </>
                )}
                {showFavourites && user && <FavouritesList />}
            </div>

        </div>
    )
}