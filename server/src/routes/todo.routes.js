import express from "express"
import { addTodo , allTodo , editTodo , singleTodo , deleteTodo , addDone , allDone, editDone, deleteDone } from "../controllers/todo.controllers.js";

const router = express.Router();
router.post("/addtodo", addTodo)
router.post("/adddone", addDone)
router.get("/alltodo", allTodo)
router.get("/alldone", allDone)
router.put("/edittodo/:id", editTodo)
router.put("/editdone/:id", editDone)
router.get("/singletodo/:id", singleTodo)
router.delete("/deletetodo/:id", deleteTodo)
router.delete("/deletedone/:id", deleteDone)

export { router }