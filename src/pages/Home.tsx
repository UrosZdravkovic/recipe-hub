import RecipeList from "@/components/custom/RecipeList";
import Sidebar from "@/components/custom/Sidebar";
import { useAppSelector } from "@/app/hooks";
import FindYourRecipes from "@/components/custom/FindYourRecipes";


export default function Home() {
  const { hasSearched, loading, recipes } = useAppSelector((state) => state.recipes);

  return (
    <div className="flex h-screen">
      <div className="w-[25%]">
        <Sidebar />
      </div>
      <div className="w-[75%] overflow-y-auto p-4 ">
        {(!hasSearched && !loading && recipes.length === 0) && <FindYourRecipes />}
        <RecipeList />
      </div>
    </div>
  );
}
