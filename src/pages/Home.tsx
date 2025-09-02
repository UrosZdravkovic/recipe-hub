import RecipeList from "@/components/custom/RecipeList";
import IngredientsList from "@/components/custom/IngredientsList";
import SelectedIngredients from "@/components/custom/SelectedIngredients";
import RecipeSearchForm from "@/components/custom/RecipeSearchForm";

export default function Home() {
  
  return (
    <div className="flex h-screen">
      {/* Sidebar: Input & ingredient list */}
      <div className="w-[25%] min-w-[300px] bg-gradient-to-b bg-orange-50 space-y-6 border-r overflow-y-auto">
        <SelectedIngredients />
        <RecipeSearchForm />
        <IngredientsList />
      </div>

      {/* Main content: Recipe list */}
      <div className="w-[75%] p-8 overflow-y-auto">
        <RecipeList />
      </div>
    </div>
  );
}
