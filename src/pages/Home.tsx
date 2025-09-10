import { useState } from "react";
import RecipeList from "@/components/custom/RecipeList";
import Sidebar from "@/components/custom/Sidebar";
import { useAppSelector } from "@/app/hooks";
import FindYourRecipes from "@/components/custom/FindYourRecipes";


export default function Home() {
  const { hasSearched, loading, recipes } = useAppSelector((state) => state.recipes);
  const [collapsed, setCollapsed] = useState(false);

  function handleCollapse() {
    setCollapsed(!collapsed)
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`relative w-[350px] transition-all duration-300 ease-in-out overflow-y-scroll
      ${collapsed ? "ml-[-350px]" : "ml-0"}`}
      >
        <Sidebar collapsed={collapsed} setCollapsed={handleCollapse} />
      </div>
      <div className="flex-1 overflow-y-auto p-4 ml-2">
        {(!hasSearched && !loading && recipes.length === 0) && <FindYourRecipes />}
        <RecipeList collapsed={collapsed} />
      </div>
    </div>
  );
}
