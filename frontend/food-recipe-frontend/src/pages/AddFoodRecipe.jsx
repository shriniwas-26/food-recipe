import React from "react";
import "../components/recipeItems.css";

const AddFoodRecipe = () => {
    const [recipeData, setRecipedata] = useState({});

    const handleRecipeOnChange = (e)=>{
        const value = (e.target.name === "ingredients") ? e.target.value.split(",") : e.target.value;
        setRecipedata()
    }

    const handleRecipeOnSubmit = (e)=>{
        e.preventDefault
    }
  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="w-50 shadow p-4 bg-white rounded">
        <div className="text-center mb-4">
          <h1 className="fw-bold">Add Your Recipe</h1>
          <p className="text-muted">
            Share your delicious creations with the world!
          </p>
        </div>
        <form>
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
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              Upload Image
            </label>
            <input type="file" id="file" name="coverImage" className="form-control" onChange={handleRecipeOnChange}/>
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
            />
          </div>
          <button type="submit" className="bg-light-green text-black w-100">
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodRecipe;
