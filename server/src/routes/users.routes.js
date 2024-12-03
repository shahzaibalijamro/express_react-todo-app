import express from "express"
import { loginUser, registerUser } from "../controllers/users.controllers.js";

const userRouter = express.Router();

//register User
userRouter.post("/register", registerUser)

//login User
userRouter.post("/login", loginUser)

export { userRouter }