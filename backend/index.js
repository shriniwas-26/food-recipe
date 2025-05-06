import express from 'express';
import dotenv from 'dotenv';
import { connectToDb } from './Configuration/ConnectionDb.js';
import recipeRouter from './Router/RecipeRouter.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/recipe', recipeRouter);

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}....`);
    connectToDb();
});