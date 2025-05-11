import React from "react";
import { RiTimerFill } from "react-icons/ri";
import { FaEdit, FaTrash } from "react-icons/fa"; // ✅ New icons
import './recipeItems.css';
import food from "../assets/food.png"

const MyRecipeItems = () => {
  return (
    <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
      <div key={1} className="card m-3 align-items-center" style={{ width: "15rem" }}>
        <img src={ food } className="card-img-top" style={{ height: "160px" }} alt="..." />
        <div className="card-body w-100 d-flex flex-column justify-content-between bg-light-green">
          <h5 className="card-title fs-5 text-center">Burger</h5>
          <div className="d-flex justify-content-between m-3">
            <div><RiTimerFill /> <span> 15 </span></div>
            <div>
              {/* ✅ Edit & Delete Icons */}
              <FaEdit
                className="me-2"
                style={{ cursor: 'pointer' }}
              />
              <FaTrash 
                className="text-danger"
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecipeItems;
