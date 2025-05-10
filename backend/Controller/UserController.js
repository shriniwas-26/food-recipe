import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../Models/UserModel.js';
import { StatusCodes } from 'http-status-codes';

export async function userSignUp(request, response){
    try {
        const {email, password, name} = request.body;
        if(!email || !password || !name){
            response.status(StatusCodes.BAD_REQUEST).send({ message: "Name, Email and Password is required" });
        }else{
            const user = await userModel.findOne({ email });
            if(user){
                response.status(StatusCodes.BAD_REQUEST).send({ message: "Email is already exist" });
            }else{
                const encryptPwd = await bcrypt.hash(password, 10);
                const newUser = await userModel.create({
                    name, email, password: encryptPwd
                });
                const token = jwt.sign({email, id: newUser._id}, process.env.SECRET_KEY);
                response.status(StatusCodes.OK).send({newUser, token});
            }
        }
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "internal server error..."});
    }
}

export async function userLogin(request, response){
    try {
        const {email, password} = request.body;
        if(!email || !password){
            response.status(StatusCodes.BAD_REQUEST).send({messsage: "Email and Password is required."});
        }else{
            const user = await userModel.findOne({ email });
            if(user && await bcrypt.compare(password, user.password)){
                const token = jwt.sign({email, id: user._id}, process.env.SECRET_KEY);
                response.status(StatusCodes.OK).send({user, token});
            }else{
                response.status(StatusCodes.BAD_REQUEST).send({message: "Invalid credientials"});
            }
        }
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "internal server error..."});
    }
}

export async function getUser(request, response){
    try {
        const user = await userModel.findById(request.params.id);
        if(user){
            response.status(StatusCodes.OK).send({name: user.name,email: user.email});
        }
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR).send({message: "User not found in the database."});
    }
}