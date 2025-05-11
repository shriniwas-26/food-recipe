import React, { useState } from "react";
import "../components/recipeItems.css";
import axios from "axios";
import { url } from "../services/recipeService";

const EditFoodRecipe = () => {
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
    console.log(recipeData);

    await axios
      .post(url + "/recipe", recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        alert("Recipe edited successfully...");
      })
      .catch((err) => {
        alert("Invalid token");
      });
  };

  return (
    <div className="container d-flex justify-content-center mt-5 mb-5">
      <div className="shadow p-4 bg-white rounded" style={{ width: "50%" }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold">Edit Your Recipe</h1>
          <p className="text-muted">Update your delicious creation!</p>
        </div>
        <form onSubmit={handleRecipeOnSubmit} encType="multipart/form-data">
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="title" className="form-label">Recipe Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                placeholder="Enter title"
                onChange={handleRecipeOnChange}
                required
              />
            </div>
            <div className="col">
              <label htmlFor="ingredients" className="form-label">Ingredients</label>
              <input
                type="text"
                id="ingredients"
                name="ingredients"
                className="form-control"
                placeholder="List ingredients"
                onChange={handleRecipeOnChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <label htmlFor="instructions" className="form-label">Instructions</label>
              <textarea
                id="instructions"
                name="instructions"
                className="form-control"
                rows="4"
                placeholder="Enter instructions"
                onChange={handleRecipeOnChange}
                required
              ></textarea>
            </div>
            <div className="col">
              <label htmlFor="time" className="form-label">Cooking Time (minutes)</label>
              <input
                type="number"
                id="time"
                name="time"
                className="form-control"
                placeholder="Time"
                onChange={handleRecipeOnChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="coverImage" className="form-label">Upload Image</label>
            <input
              type="file"
              id="coverImage"
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
            Edit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditFoodRecipe;
