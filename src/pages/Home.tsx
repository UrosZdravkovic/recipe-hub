import RecipeList from "@/components/custom/RecipeList";
import Sidebar from "@/components/custom/Sidebar";

export default function Home() {
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="w-[75%] p-8 overflow-y-auto">
        <RecipeList />
      </div>
    </div>
  );
}
