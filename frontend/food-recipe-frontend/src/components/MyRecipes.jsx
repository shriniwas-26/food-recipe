import React, { useEffect, useState } from "react";
import { getAllRecipesFromApi } from "../services/recipeService";
import MyRecipeItems from "./myRecipeItems";
import { deleteRecipeFromApi } from "../services/recipeService";
import { toast } from "react-toastify";

const MyRecipes = () => {

  const [myRecipes, setMyRecipes] = useState([]);
  const getMyRecipes = async ()=>{
    let user = JSON.parse(localStorage.getItem("user"));
    let allRecipes = await getAllRecipesFromApi();
    let myAllRecipes = allRecipes.filter(item=> item.createdBy === user._id);
    console.log("MyallRecipes : ",myAllRecipes);
    setMyRecipes(myAllRecipes);
  }

  async function deleteRecipe(id) {
      try {
        const response = await deleteRecipeFromApi(id);
        if (response.status === 201 || response.status === 200) {
          toast.success("Recipe deleted successfully...");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    }

  useEffect(()=>{
    getMyRecipes();
  },[]);

  return (
    <div className="container mt-5">
      <h2>My Recipes</h2>
      <p>This is where your saved recipes will appear.</p>
      {/* Add your recipe list or component here */}

      {
        myRecipes?.map((item)=>{
          return <MyRecipeItems key={item._id} deleteRecipe={deleteRecipe} item={item}/>
        })
      }
      
    </div>
  );
};

export default MyRecipes;
