import React, { useEffect, useState } from "react";
import { getAllRecipesFromApi } from "../services/recipeService.js";
import food from '../assets/food.png';
import { RiTimerFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import './recipeItems.css';
import { Link } from "react-router-dom";
import RecipeItem from "./recipeItem.jsx";

const RecipeItems = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  // const [liked, setLiked] = useState(false);

  // const handleLike = () => {
  //   const existingLikes = JSON.parse(localStorage.getItem('likes')) || [];

  //   if (!existingLikes.includes(itemId)) {
  //     existingLikes.push(itemId);
  //     localStorage.setItem('likes', JSON.stringify(existingLikes));
  //     setLiked(true);
  //   }
  // };

  const getAllRecipes = async () => {
    try {
      const response = await getAllRecipesFromApi();
      console.log(response);
      setAllRecipes(response); // Ensure the data is properly set
    } catch (error) {
      console.log("Error fetching recipes:", error);
    }
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
      {allRecipes?.map((item) => (
        
        <RecipeItem item={item} />
       
      ))}
    </div>
  );
};

export default RecipeItems;
