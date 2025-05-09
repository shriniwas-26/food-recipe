import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDb } from './Configuration/ConnectionDb.js';
import recipeRouter from './Router/RecipeRouter.js';
import userRouter from './Router/UserRouter.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/recipe', recipeRouter);
app.use('/user', userRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}....`);
    connectToDb();
});