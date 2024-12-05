import express from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/users.controllers.js";

const userRouter = express.Router();

//register User
userRouter.post("/register", registerUser)

//login User
userRouter.post("/login", loginUser)

//logout User
userRouter.post("/logout", logoutUser)

export { userRouter }