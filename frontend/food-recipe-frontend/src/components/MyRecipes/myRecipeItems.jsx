import React from "react";
import { RiTimerFill } from "react-icons/ri";
import { FaEdit, FaTrash } from "react-icons/fa"; //  New icons
import "../RecipeItems/recipeItems.css";

import { Link, useNavigate, useParams } from "react-router-dom";



const MyRecipeItems = ({ item, deleteRecipe }) => {

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/editRecipe/${item._id}`);
  };

  return (
    <div>
      {item ?
        (
          <div className="d-flex flex-wrap justify-content-center justify-content-lg-start">
            <div
              key={item._id}
              className="card m-3 align-items-center"
              style={{ width: "15rem", height: "310px" }}
            >
              <Link
                to={`/recipeDetails/${item._id}`}
                className="w-100"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={`http://localhost:5000/images/${item.coverImage}`}
                  className="card-img-top"
                  style={{ height: "160px" }}
                  alt="..."
                />
              </Link>
              <div className="card-body w-100 d-flex flex-column justify-content-between bg-light-green">
                <Link
                  to={`/recipeDetails/${item._id}`}
                  className="w-100"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h5 className="card-title fs-5 text-center">{item.title}</h5>
                </Link>
                <div className="d-flex justify-content-between m-3">
                  <div>
                    <RiTimerFill /> <span> {item.time} mins</span>
                  </div>
                  <div>
                    {/* Edit & Delete Icons */}
                    <FaEdit className="me-2" style={{ cursor: "pointer" }} onClick={handleEditClick} />
                    <FaTrash
                      className="text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => { deleteRecipe(item._id) }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
    </div>
  );
};

export default MyRecipeItems;
