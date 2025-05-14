import React, { useEffect, useState } from "react";
import RecipeItem from "./RecipeItems/recipeItem";
import { getRecipeFromApi } from "../services/recipeService";
import Footer from "./Footer";

const Favourite = () => {
  const [favouriteRecipe, setFavouriteRecipe] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  async function fetchRecipes() {
    const favRecipesIds = JSON.parse(localStorage.getItem("likes")) || [];
    try {
      const recipes = await Promise.all(
        favRecipesIds.map((id) => getRecipeFromApi(id))
      );
      setFavouriteRecipe(recipes);
    } catch (error) {
      console.log(error);
    }
  }

  // Handle unliking from the child
  const handleUnlike = (id) => {
    const updatedList = favouriteRecipe.filter((recipe) => recipe._id !== id);
    setFavouriteRecipe(updatedList);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="container mt-5 flex-grow-1">
        <h2>Favourite Recipes</h2>
        <p>This is where your favourite recipes will appear.</p>

        <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
          {favouriteRecipe?.length > 0 ? (
            favouriteRecipe.map((item) => (
              <RecipeItem key={item._id} item={item} onUnlike={handleUnlike} />
            ))
          ) : (
            <p>No favourite recipes found.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favourite;