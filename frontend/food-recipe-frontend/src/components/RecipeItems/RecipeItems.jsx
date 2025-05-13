import React, { useEffect, useState } from "react";
import { getAllRecipesFromApi } from "../../services/recipeService.js";
import './recipeItems.css';
import RecipeItem from "./recipeItem.jsx";

const RecipeItems = () => {
  const [allRecipes, setAllRecipes] = useState([]); //useState is a React Hook that lets you add state to functional components.

  const getAllRecipes = async () => {
    try {
      const response = await getAllRecipesFromApi();
      setAllRecipes(response);
    } catch (error) {
      console.log("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    getAllRecipes(); //imperative function to fetch all recipes
  }, []);

  return (
    <>
      {allRecipes.length > 0 && (
        <div className="container d-flex justify-content-center justify-content-lg-start">
          <h1 className="m-3">All Recipes</h1>
        </div>
      )}

      <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
        {allRecipes.length > 0 ? (
          allRecipes.map((item) => <RecipeItem key={item._id} item={item} />)
        ) : null}
      </div>
    </>
  );
};

export default RecipeItems;