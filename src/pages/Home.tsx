import { useState } from "react";
import RecipeList from "@/components/custom/RecipeList";
import Sidebar from "@/components/custom/Sidebar";
import { useAppSelector } from "@/app/hooks";
import FindYourRecipes from "@/components/custom/FindYourRecipes";


export default function Home() {
  const { hasSearched, loading, recipes } = useAppSelector((state) => state.recipes);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`overflow-x-scroll ${collapsed ? 'w-0' : 'w-[350px]'} transition-all duration-300`}>
        <Sidebar collapsed={collapsed} />
      </div>
      <div className={`overflow-y-auto p-4 flex-1`}>
        <button onClick={() => setCollapsed(!collapsed)} className="mb-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300">
          {collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        </button>
        {(!hasSearched && !loading && recipes.length === 0) && <FindYourRecipes />}
        <RecipeList />
      </div>
    </div>
  );
}
