import React, { useEffect, useState } from "react";
import { getAllRecipesFromApi } from "../services/recipeService.js";
import food from '../assets/food.png';
import { RiTimerFill } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import './recipeItems.css';

const MyRecipeItems = ({item}) => {

return (
    <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
        <div key={item.id} className="card m-3 align-items-center" style={{ width: "15rem" }}>
          <img src={`http://localhost:5000/images/${item.coverImage}`} className="card-img-top" style={{ height: "160px" }} alt="..." />
          <div className="card-body w-100 d-flex flex-column justify-content-between bg-light-green">
            <h5 className="card-title fs-5 text-center">{item.title}</h5>
            <div className="d-flex justify-content-between m-3">
              <div><RiTimerFill /> <span>{item.time}</span></div>
              <div><FaHeart /></div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default MyRecipeItems;