import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    time: {
        type: String,
    },
    coverImage: {
        type: String,
    }
},{timestamps: true});

const recipeModel = mongoose.model("Recipes",recipeSchema);

export default recipeModel;