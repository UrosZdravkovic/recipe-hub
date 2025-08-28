import { useState } from "react";
import { fetchRecipes } from "../features/recipes/recipeSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addIngredient, removeIngredient } from "../features/recipes/ingredientsSlice";

export default function Home() {
  const dispatch = useAppDispatch();

  // Input for search
  const [input, setInput] = useState("");

  // Get state from Redux
  const { recipes, loading, error } = useAppSelector((state) => state.recipes);
  const { defaultIngredients, selectedIngredients } = useAppSelector((state) => state.ingredients);

  // Handle form submit
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;

    // Combine all input (already includes selected ingredients)
    const query = input
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean)
      .join(",");



    dispatch(fetchRecipes({ query, number: 10 }));
  }

  // Toggle ingredient in selectedIngredients AND update input field
  const handleIngredientClick = (ingredient: { id: string; name: string }) => {
    const isSelected = selectedIngredients.some((i) => i.id === ingredient.id);

    if (isSelected) {
      dispatch(removeIngredient(ingredient.id));
      // Remove from input
      const inputArray = input.split(",").map((i) => i.trim());
      setInput(inputArray.filter((i) => i !== ingredient.name).join(", "));
    } else {
      dispatch(addIngredient(ingredient));
      // Add to input
      setInput((prev) => (prev ? `${prev}, ${ingredient.name}` : ingredient.name));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter ingredients"
          style={{ padding: "5px", width: "300px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "5px 10px" }}>
          Search Recipes
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {recipes.length === 0 && !loading && <p>No recipes found.</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Ingredients by Cuisine</h2>
      {defaultIngredients.map((cuisine) => (
        <div key={cuisine.cuisine} style={{ marginBottom: "15px" }}>
          <h3>{cuisine.cuisine}</h3>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {cuisine.ingredients.map((ing) => {
              const isSelected = selectedIngredients.some((i) => i.id === ing.id);
              return (
                <button
                  key={ing.id}
                  onClick={() => handleIngredientClick(ing)}
                  style={{
                    backgroundColor: isSelected ? "#4caf50" : "#e0e0e0",
                    color: isSelected ? "white" : "black",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {ing.name}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <h2>Recipes</h2>
      <div>
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
