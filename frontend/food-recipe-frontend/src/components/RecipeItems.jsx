import React, { useEffect, useState } from "react";
import { getAllRecipesFromApi } from "../services/recipeService";
import RecipeItem from "./RecipeItem";

const RecipeItems = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getAllRecipesFromApi();
        setAllRecipes(response);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <>
      {allRecipes.length > 0 && (
        <div className="container d-flex justify-content-center justify-content-lg-start">
          <h1 className="m-3">All Recipes</h1>
        </div>
      )}
      <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
        {allRecipes.map((item) => (
          <RecipeItem key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};

export default RecipeItems;
