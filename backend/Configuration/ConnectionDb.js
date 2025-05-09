import mongoose from "mongoose";
import dotenv from 'dotenv';


export async function connectToDb(){
    await mongoose.connect(process.env.DATABASE_CONN_STRING)
    .then(()=>{
        console.log("Connected to database");
    })
}