import express from 'express';
import { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe } from '../Controller/RecipeController.js';
const recipeRouter = express.Router();

recipeRouter.get("/", getRecipes); // Get All Recipes
recipeRouter.get("/:id", getRecipe); // Get a specific Recipe
recipeRouter.post("/", addRecipe); // Add a new Recipe
recipeRouter.put("/:id", editRecipe); // Edit a Recipe
recipeRouter.delete("/:id", deleteRecipe); // Delete a Recipe


export default recipeRouter;