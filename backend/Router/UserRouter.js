import express from 'express';
const userRouter = express.Router();
import { userSignUp, userLogin, getUser } from '../Controller/UserController.js';

userRouter.post("/signUp",userSignUp);
userRouter.post("/login", userLogin);
userRouter.get("/:id", getUser);

export default userRouter;