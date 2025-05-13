import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateRecipeInApi, getRecipeFromApi } from "../services/recipeService";
import { toast } from "react-toastify";
import axios from "axios";
import "../assets/styles/EditFoodRecipe.css";

const EditFoodRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: [],
    instructions: "",
    time: "",
    coverImage: null,
  });

  const fetchRecipe = async () => {
    try {
      const data = await getRecipeFromApi(id);
      setRecipeData({
        title: data.title || "",
        ingredients: Array.isArray(data.ingredients)
          ? data.ingredients
          : (data.ingredients || "").split(",").map((item) => item.trim()),
        instructions: data.instructions || "",
        time: parseInt(data.time?.split(" ")[0]) || "",
        coverImage: null, // Reset on fetch
      });
    } catch (error) {
      console.error("Error fetching recipe data:", error);
      toast.error("Failed to fetch recipe details.");
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const handleRecipeOnChange = (e) => {
    const { name, value, files } = e.target;

    setRecipeData((prev) => ({
      ...prev,
      [name]:
        name === "ingredients"
          ? value.split(",").map((item) => item.trim())
          : name === "coverImage"
          ? files[0]
          : value,
    }));
  };

  const handleRecipeOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("instructions", recipeData.instructions);
    formData.append("time", recipeData.time);
    formData.append("ingredients", recipeData.ingredients.join(", "));

    if (recipeData.coverImage) {
      formData.append("coverImage", recipeData.coverImage);
    }

    try {
      const response = await updateRecipeInApi(id, formData);
      if (response?.status === 200) {
        toast.success("Recipe updated successfully!");
        navigate("/myrecipes");
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
      toast.error("Failed to update recipe. Please try again.");
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="shadow p-4 bg-white rounded">
            <div className="text-center mb-4">
              <h1 className="fw-bold"style={{ color: '#ff4d30' }}>Edit Your Recipe</h1>
              <p className="text-muted">Update your delicious creation!</p>
            </div>
            <form onSubmit={handleRecipeOnSubmit} >
              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label htmlFor="title" className="form-label">Recipe Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={recipeData.title}
                    onChange={handleRecipeOnChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="ingredients" className="form-label">Ingredients</label>
                  <input
                    type="text"
                    id="ingredients"
                    name="ingredients"
                    className="form-control"
                    value={recipeData.ingredients}
                    onChange={handleRecipeOnChange}
                    placeholder="e.g., Flour, Sugar, Eggs"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="instructions" className="form-label">
                  Instructions
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  className="form-control"
                  value={recipeData.instructions}
                  onChange={handleRecipeOnChange}
                  rows="5"
                  required
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-6 mb-3">
                  <label htmlFor="time" className="form-label">Time (in minutes)</label>
                  <input
                    type="number"
                    id="time"
                    name="time"
                    className="form-control"
                    value={recipeData.time}
                    onChange={handleRecipeOnChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="coverImage" className="form-label">Cover Image</label>
                  <input
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    className="form-control"
                    accept="image/*"
                    onChange={handleRecipeOnChange}
                  />
                </div>
              </div>

              <div className="text-center">
                <button type="submit" className="share-btn1">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFoodRecipe;
