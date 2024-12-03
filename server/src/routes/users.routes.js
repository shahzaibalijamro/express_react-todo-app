import express from "express"
import { registerUser } from "../controllers/users.controllers.js";

const userRouter = express.Router();

//register Todo
userRouter.post("/register", registerUser)

export { userRouter }