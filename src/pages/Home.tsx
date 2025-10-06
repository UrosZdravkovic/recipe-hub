import { useState } from "react";
import RecipeList from "@/components/custom/recipe-data/RecipeList";
import Sidebar from "@/components/custom/sidebar/Sidebar";
import { useAppSelector } from "@/app/hooks/hooks";
import FindYourRecipes from "@/components/custom/recipe-data/FindYourRecipes";






export default function Home() {
  const { hasSearched, loading, recipes } = useAppSelector((state) => state.recipes);
  const [collapsed, setCollapsed] = useState(false);

  function handleCollapse() {
    setCollapsed(c => !c);
    
  }

  const showOverlay = !collapsed; // prikaz samo kad je otvoren


  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Overlay (samo mobil, iza sidebara, iznad sadržaja) */}
      {showOverlay && (
        <div
          onClick={handleCollapse}
          aria-hidden="true"
          className="hidden [@media(max-width:750px)]:block fixed inset-0 bg-black/30 backdrop-blur-[2px] z-30 transition-opacity"
        />
      )}

      {/* Sidebar */}
      <div
        className={`relative  z-40 min-w-[350px] transition-all duration-300 ease-in-out overflow-y-scroll
        [@media(max-width:750px)]:absolute [@media(max-width:500px)]:max-w-[300px]
        ${collapsed ? "ml-[-350px]" : "ml-0"}`}
      >
        <Sidebar collapsed={collapsed} setCollapsed={handleCollapse} />
      </div>

      {/* Glavni sadržaj */}
      <div
        className={`flex-1 overflow-y-auto p-4 ml-2 transition
          ${showOverlay ? "[@media(max-width:750px)]:pointer-events-none" : "pointer-events-auto"}`}
      >
        {(!hasSearched && !loading && recipes.length === 0) && <FindYourRecipes />}
        <RecipeList collapsed={collapsed} />
      </div>
    </div>
  );
}