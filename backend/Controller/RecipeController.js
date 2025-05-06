import {StatusCodes} from 'http-status-codes';
import recipeModel from '../Models/RecipeModel.js';

export function getRecipes(request, response){

}

export function getRecipe(request, response){

}

export async function addRecipe(request, response){
    const data = request.body;
    if(!data.title || !data.ingredients || !data.instructions){
        response.status(StatusCodes.BAD_REQUEST).send({message: "Required fields cant be empty"});
    }else{
        try {
            const newRecipe = await recipeModel.create({
                title: data.title, ingredients: data.ingredients, instructions : data.instructions, time : data.time
            });
            response.status(StatusCodes.CREATED).send({message: "Recipe added to the database"});
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "Something went wrong"});
        }
    }
}

export function editRecipe(request, response){

}

export function deleteRecipe(request, response){

}