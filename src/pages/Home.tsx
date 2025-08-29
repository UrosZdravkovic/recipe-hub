import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { removeIngredient } from "../features/recipes/ingredientsSlice";
import type { Recipe } from "../features/recipes/recipeSlice";
import { fetchRecipes } from "../features/recipes/recipeSlice";
import IngredientInput from "@/components/IngredientInput";



export default function Home() {
  const dispatch = useAppDispatch();
  const { selectedIngredients } = useAppSelector(
    (state) => state.ingredients
  );
  const { recipes } = useAppSelector((state) => state.recipes)

  // Submit recipes
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const queryString = selectedIngredients.map((i) => i.name).join(",");
    if (!queryString) return;
    dispatch(fetchRecipes({ query: queryString, number: 10 }));

  }; 




  return (
    <div className="p-6 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selected ingredients */}
        <div className="flex flex-wrap gap-2">
          {selectedIngredients.map((ing) => (
            <Badge
              key={ing.id}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => dispatch(removeIngredient(ing.id))}
            >
              {ing.name} ✕
            </Badge>
          ))}
        </div>

        {/* Command input za pretragu */}
        <IngredientInput />

        {/* Dugme za search */}
        <Button type="submit">Search Recipes</Button>
      </form>

      {recipes.map((recipe: Recipe) => (
        <div key={recipe.id} className="border-b py-4">
          <h3 className="text-lg font-semibold">{recipe.title}</h3>
          <img src={recipe.image} alt={recipe.title} className="mt-2 w-32 h-32 object-cover rounded" />
        </div>
      ))}
    </div>
  );
}
