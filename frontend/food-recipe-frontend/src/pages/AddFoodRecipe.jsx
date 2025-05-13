import React, { useState, useRef } from "react";
import "../components/RecipeItems/recipeItems.css";
import axios from "axios";
import { url } from "../services/recipeService";
import { toast } from "react-toastify";

const AddFoodRecipe = () => {
  const [recipeData, setRecipedata] = useState({});
  const fileInputRef = useRef(null); // Reference to file input

  const handleRecipeOnChange = (e) => {
    const value =
      e.target.name === "ingredients"
        ? e.target.value
        : e.target.name === "coverImage"
        ? e.target.files[0]
        : e.target.name === "time"
        ? String(e.target.value)
        : e.target.value;

    setRecipedata((pre) => ({
      ...pre,
      [e.target.name]: value,
    }));
  };

  const handleRecipeOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", recipeData.title);
      formData.append("ingredients", recipeData.ingredients);
      formData.append("instructions", recipeData.instructions);
      formData.append("time", recipeData.time);
      formData.append("coverImage", recipeData.coverImage);

      const response = await axios.post(`${url}/recipe`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Recipe added to the database successfully...");

        // Clear state
        setRecipedata({
          title: "",
          ingredients: "",
          instructions: "",
          time: "",
          coverImage: "",
        });

        // Manually clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container row ms-auto me-auto mt-5 mb-5 d-flex justify-content-center">
      <div className="shadow p-4 bg-white rounded col-11 col-md-8">
        <div className="text-center mb-4">
          <h1 className="fw-bold" style={{ color: '#ff4d30' }}>Add Your Recipe</h1>
          <p className="text-muted">
            Share your delicious creations with the world!
          </p>
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
              value={recipeData.title}
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
              value={recipeData.ingredients}
              className="form-control"
              rows="3"
              placeholder="List ingredients (separated by commas)"
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
              value={recipeData.instructions}
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
              value={recipeData.time}
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
              ref={fileInputRef} // Attach ref here
              required
            />
          </div>

          <div className="btn-container">
            <button className="share-btn1">Submit Recipe</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFoodRecipe;
