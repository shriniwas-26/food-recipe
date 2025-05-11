import React, { useEffect, useState } from "react";
import RecipeItem from "./recipeItem";
import { getRecipeFromApi } from "../services/recipeService";
import Footer from "./Footer";

const Favourite = () => {
  const [favouriteRecipe, setFavouriteRecipe] = useState([]);
  const favRecipesIds = JSON.parse(localStorage.getItem("likes")) || [];

  async function fetchRecipes() {
    try {
      const recipes = await Promise.all(
        favRecipesIds.map((id) => getRecipeFromApi(id))
      );
      setFavouriteRecipe(recipes);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Main Content */}
      <main className="container mt-5 flex-grow-1">
        <h2>Favourite Recipes</h2>
        <p>This is where your favourite recipes will appear.</p>

        <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
          {favouriteRecipe?.length > 0 ? (
            favouriteRecipe.map((item, index) => (
              <RecipeItem key={index} item={item} />
            ))
          ) : (
            <p>No favourite recipes found.</p>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Favourite;
