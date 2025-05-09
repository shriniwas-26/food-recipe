import React, { useEffect, useState } from "react";
import { getAllRecipesFromApi } from "../services/recipeService";
import { RiTimerFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import '../components/recipeItems.css';
import food from "../assets/food.png";


const RecipeItems = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  const getAllRecipes = async () => {
    const recipes = await getAllRecipesFromApi();
    console.log(recipes);
    setAllRecipes(recipes);
  };

  useEffect(() => {
    getAllRecipes();
  }, []);

  return (
    <div className="d-flex flex-wrap justify-content-center justify-content-lg-start ">
      {allRecipes?.map((item, index) => {
        return(
        <div key={index} className="card m-3 align-items-center" style={{ width: "15rem" }}>
          <img src={food} className="card-img-top" style={{ height: "150px", width: "150px" }} alt="..." />
          <div className="card-body w-100 d-flex flex-column justify-content-between bg-light-green">
            <h5 className="card-title fs-5 text-center">{ item.title }</h5>
            <div className="d-flex justify-content-between m-3">
              <div><RiTimerFill /></div>
              <div><FaHeart /></div>
            </div>
          </div>
        </div>
        )
      })}
    </div>
  );
};

export default RecipeItems;
