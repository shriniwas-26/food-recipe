import React, { useState } from "react";
import "../components/recipeItems.css";
import axios from "axios";
import { url } from "../services/recipeService"; // Make sure this path is correct
import { toast } from "react-toastify";

const AddFoodRecipe = () => {
  const [recipeData, setRecipedata] = useState({});

  const handleRecipeOnChange = (e) => {
    const value =
      e.target.name === "ingredients"
        ? e.target.value.split(",")
        : e.target.name === "time"
        ? String(e.target.value)
        : e.target.name === "coverImage"
        ? e.target.files[0]
        : e.target.value;
    setRecipedata((pre) => ({
      ...pre,
      [e.target.name]: value,
    }));
  };

  const handleRecipeOnSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(recipeData);
      let response = await addRecipeToApi(recipeData)
      if(response.status===200){
        toast.success("Recipe added to the database successfully...");
      }else{
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    
  };

  return (
    <div className="container row ms-auto me-auto mt-5 mb-5 d-flex justify-content-center">
      <div className="shadow p-4 bg-white rounded col-11 col-md-8">
        <div className="text-center mb-4">
          <h1 className="fw-bold">Add Your Recipe</h1>
          <p className="text-muted">Share your delicious creations with the world!</p>
        </div>
        <form onSubmit={handleRecipeOnSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Recipe Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Enter recipe title"
              onChange={handleRecipeOnChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="ingredients" className="form-label">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              className="form-control"
              rows="3"
              placeholder="List ingredients"
              onChange={handleRecipeOnChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="instructions" className="form-label">
              Instructions
            </label>
            <textarea
              id="instructions"
              name="instructions"
              className="form-control"
              rows="4"
              placeholder="Enter cooking instructions"
              onChange={handleRecipeOnChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="timer" className="form-label">
              Cooking Time (minutes)
            </label>
            <input
              type="number"
              id="timer"
              name="time"
              className="form-control"
              placeholder="Enter cooking time"
              onChange={handleRecipeOnChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              Upload Image
            </label>
            <input
              type="file"
              id="file"
              name="coverImage"
              className="form-control"
              onChange={handleRecipeOnChange}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-light-green text-black rounded-3 outline-none p-2 b-none w-100"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodRecipe;
