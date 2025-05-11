import React, { useEffect } from "react";
import RecipeItem from "./recipeItem";
import { useState } from "react";
import { getRecipeFromApi } from "../services/recipeService";

const Favourite = () => {
  const [favouriteRecipe, setFavouriteRecipe] = useState([]);
  const favRecipesIds = JSON.parse(localStorage.getItem("likes"));
  async function fetchRecipes() {
    try {
      const recipes = await Promise.all(
        favRecipesIds.map((id) => getRecipeFromApi(id))
      );
      console.log(recipes);
      setFavouriteRecipe(recipes);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    // setFavouriteRecipe(favRecipes);
    fetchRecipes();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Favourite Recipes</h2>
      <p>This is where your favourite recipes will appear.</p>
      {/* Add your favourite recipe list or component here */}

      <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
        {favouriteRecipe?.map((item, index) => (
          <RecipeItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Favourite;
