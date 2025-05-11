import React, { useEffect, useState } from "react";
import { getAllRecipesFromApi } from "../services/recipeService.js";
import food from '../assets/food.png';
import { RiTimerFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import './recipeItems.css';
import { Link } from "react-router-dom";

const RecipeItems = () => {
  const [allRecipes, setAllRecipes] = useState([]);

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
        
        <div key={item._id} className="card m-3 align-items-center " style={{ width: "15rem" }}>
          {/* You don't need to import url, use the base URL directly */}
          <Link to={`/recipeDetails/${item._id}`} className="w-100" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="w-100"><img src={`http://localhost:5000/images/${item.coverImage}`} className="card-img-top" style={{ height: "160px" }} alt="..." /></div>
          </Link>
          <div className="card-body w-100 d-flex flex-column justify-content-between bg-light-green">
            <Link to={`/recipeDetails/${item._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h5 className="card-title fs-5 text-center text-decoration-none">{item.title}</h5>
            </Link>
            <div className="d-flex justify-content-between m-3">
              <div className="text-decoration-none"><RiTimerFill /> <span>{item.time}</span></div>
              <div><FaHeart /></div>
            </div>
          </div>
        </div>
       
      ))}
    </div>
  );
};

export default RecipeItems;
