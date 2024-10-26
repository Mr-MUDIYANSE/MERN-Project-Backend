import express from 'express';
import { loginUser, postUsers } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post("/", postUsers);
userRouter.post("/login", loginUser);

export default userRouter;