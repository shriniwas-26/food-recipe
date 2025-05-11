import { StatusCodes } from 'http-status-codes';
import recipeModel from '../Models/RecipeModel.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + file.fieldname;
        cb(null, filename);
    }
});

export const upload = multer({ storage: storage })

export async function getRecipes(request, response) {
    try {
        const recipes = await recipeModel.find();
        response.status(StatusCodes.OK).send(recipes);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Something went wrong" });
    }
}

export async function getRecipe(request, response) {
    try {
        const recipe = await recipeModel.findById(request.params.id);
        if (recipe) {
            response.status(StatusCodes.OK).send(recipe);
        } else {
            response.status(StatusCodes.BAD_REQUEST).send({ message: "Something went wrong" });
        }

    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Something went wrong" });
    }
}

export async function addRecipe(request, response) {
    const data = request.body;
    console.log(request.user);
    if (!data.title || !data.ingredients || !data.instructions) {
        response.status(StatusCodes.BAD_REQUEST).send({ message: "Required fields cant be empty" });
    } else {
        try {
            
            let ingredientsArr = data.ingredients.split(",");
            const newRecipe = await recipeModel.create({
                title: data.title, ingredients: ingredientsArr, instructions: data.instructions, time: data.time + "", coverImage: request.file.filename, createdBy: request.user.id
            });
            response.status(StatusCodes.CREATED).send({ message: "Recipe added to the database" });
        } catch (error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Something went wrong." });
        }
    }
}

// export async function editRecipe(request, response) {
//     try {
//         const { title, ingredients, instructions, time } = request.body;
//         const id = request.params.id;
//         const recipe = await recipeModel.findById(id);
//         if (recipe) {
//             await recipeModel.findByIdAndUpdate(id, request.body, { new: true });
//             response.status(StatusCodes.OK).send({ message: "recipe updated successfully" });
//         } else {
//             return response.status(StatusCodes.NOT_FOUND).send({ message: "Recipe not found" });
//         }
//     } catch (error) {
//         console.log(error);
//         response.status(StatusCodes.NOT_FOUND).send({ message: "Something went wrong recipe not found" });
//     }
// }

export async function editRecipe(request, response) {
    try {
        const { title, ingredients, instructions, time } = request.body;
        const id = request.params.id;

        const recipe = await recipeModel.findById(id);
        if (!recipe) {
            return response.status(StatusCodes.NOT_FOUND).send({ message: "Recipe not found" });
        }

        // Handle image update if a new file is uploaded
        let updatedFields = {
            title,
            instructions,
            time,
            ingredients: typeof ingredients === "string" ? ingredients.split(",").map(i => i.trim()) : ingredients,
        };

        if (request.file) {
            updatedFields.coverImage = request.file.filename; // adjust field name based on your model
        }

        const updatedRecipe = await recipeModel.findByIdAndUpdate(id, updatedFields, { new: true });

        response.status(StatusCodes.OK).send({ message: "Recipe updated successfully", recipe: updatedRecipe });
    } catch (error) {
        console.error("Error in editRecipe:", error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Something went wrong" });
    }
}


export async function deleteRecipe(request, response) {
    try {
        const id = request.params.id;
        const recipe = await recipeModel.findByIdAndDelete(id);
        if (recipe) {
            response.status(StatusCodes.OK).send({ message: "recipe deleted successfully" });
        }
    } catch (error) {
        response.status(StatusCodes.NOT_FOUND).send({ message: "recipe not found in database..." });
    }
}