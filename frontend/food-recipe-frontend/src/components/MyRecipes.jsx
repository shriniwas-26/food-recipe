import React, { useEffect, useState } from "react";
import axios from "axios";
import MyRecipeItem from "./MyRecipeItem";

function MyRecipes() {
  const [myRecipes, setMyRecipes] = useState([]);

  useEffect(() => {
    fetchMyRecipes();
  }, []);

  const fetchMyRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/recipes/myrecipes");
      setMyRecipes(response.data);
    } catch (error) {
      console.error("Error fetching your recipes:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/${id}`);
      setMyRecipes(myRecipes.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="my-recipes">
      <h2>My Recipes</h2>
      <div className="recipe-list">
        {myRecipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          myRecipes.map((recipe) => (
            <MyRecipeItem key={recipe._id} item={recipe} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
}

export default MyRecipes;
