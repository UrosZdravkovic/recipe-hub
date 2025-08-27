import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { fetchRecipes } from "../features/recipes/recipeSlice";


export default function Home() {
    const [input, setInput] = useState("");
    const dispatch = useAppDispatch();
    const recipes = useAppSelector((state) => state.recipes.recipes);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        dispatch(fetchRecipes(input));
    }

    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter ingredients (comma separated)"
        />
        <button type="submit">Search Recipes</button>
        <div>
          {recipes.map((recipe: any) => (
            <div key={recipe.id}>
              <h3>{recipe.title}</h3>
            </div>
          ))}
        </div>
      </form>
    )

}