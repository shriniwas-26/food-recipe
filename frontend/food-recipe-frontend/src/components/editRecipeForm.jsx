import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateRecipeInApi, getRecipeFromApi } from "../services/recipeService";
import { toast } from "react-toastify";
import axios from "axios";
import "../assets/styles/EditFoodRecipe.css";

const EditFoodRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipeData, setRecipeData] = useState({});

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeFromApi(id);
        setRecipeData({
          title: data.title || "",
          ingredients: data.ingredients.join(", ") || "",
          instructions: data.instructions || "",
          time: parseInt(data.time.split(" ")[0]) || ""
        });
      } catch (error) {
        console.log("Error fetching recipe data:", error);
        toast.error("Failed to fetch recipe details.");
      }
    };
    fetchRecipe();
  }, [id]);

  // const handleRecipeOnChange = (e) => {
  //   const { name, value, files } = e.target;
  //   let newValue;

  //   if (name === "ingredients") {
  //     newValue = value.split(",").map((item) => item.trim());
  //   } else {
  //     newValue = value;
  //   }

  //   // else if (name === "coverImage") {
  //   //   newValue = files[0];
  //   // }

  //   setRecipeData((prev) => ({
  //     ...prev,
  //     [name]: newValue,
  //   }));
  // };

  const onHandleChange = (e) => {
    let val =
      e.target.name === "ingredients"
        ? e.target.value
        : e.target.name === "coverImage"
        ? e.target.files[0]
        : e.target.value;
    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }));
  };

  // const handleRecipeOnSubmit = async (e) => {
  //   e.preventDefault();

  //   // const formData = new FormData();
  //   // formData.append("title", recipeData.title);
  //   // formData.append("instructions", recipeData.instructions);
  //   // formData.append("time", recipeData.time);
  //   // formData.append("ingredients", recipeData.ingredients);

  //   // if (recipeData.coverImage) {
  //   //   formData.append("coverImage", recipeData.coverImage);
  //   // }

    
  //     await updateRecipeInApi(id, recipeData).then(response=>{
  //       if (response) {
  //         toast.success("Recipe updated successfully!");
  //       }
  //     }).catch((err)=>{
  //         toast.success(err);
  //     });
      
    
  // };

  const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(recipeData)
        const {title, ingredients, instructions, time} = recipeData;
        await axios.put(`http://localhost:5000/recipe/${id}`, {title, ingredients, instructions, time},{
            headers:{
                'Content-Type':'multipart/form-data',
                'authorization':'bearer '+localStorage.getItem("token")
            }
        })
            .then(() => console.log("success"))
    }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="shadow p-4 bg-white rounded">
            <div className="text-center mb-4">
              <h1 className="fw-bold">Edit Your Recipe</h1>
              <p className="text-muted">Update your delicious creation!</p>
            </div>
            <form onSubmit={onHandleSubmit} >
              <div className="row mb-3">
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                  <label htmlFor="title" className="form-label">
                    Recipe Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={recipeData.title}
                    onChange={onHandleChange}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="ingredients" className="form-label">
                    Ingredients
                  </label>
                  <input
                    type="text"
                    id="ingredients"
                    name="ingredients"
                    className="form-control"
                    value={recipeData.ingredients}
                    onChange={onHandleChange}
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
                  onChange={onHandleChange}
                  rows="5"
                  required
                ></textarea>
              </div>

              <div className="row mb-3">
                <div className="col-12 col-md-6 mb-3 mb-md-0">
                  <label htmlFor="time" className="form-label">
                    Time (in minutes)
                  </label>
                  <input
                    type="number"
                    id="time"
                    name="time"
                    className="form-control"
                    value={recipeData.time}
                    onChange={onHandleChange}
                    required
                  />
                </div>
                <div className="col-12 col-md-6">
                  <label htmlFor="coverImage" className="form-label">
                    Cover Image
                  </label>
                  <input
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    className="form-control"
                    accept="image/*"
                    // onChange={onHandleChange}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  type="submit"
                  className="btn btn-success w-50 p-10 btn-animated"
                >
                  save
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
