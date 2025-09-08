import RecipeList from "@/components/custom/RecipeList";
import Sidebar from "@/components/custom/Sidebar";

export default function Home() {
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-[75%] overflow-y-auto p-4 ">
        <RecipeList />
      </div>
    </div>
  );
}
