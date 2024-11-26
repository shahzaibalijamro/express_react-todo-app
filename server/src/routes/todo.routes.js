import express from "express"
import { addTodo , allTodos , editTodo , singleTodo , deleteTodo , addDone , allDones, editDone, deleteDone } from "../controllers/todo.controllers.js";

const router = express.Router();
router.post("/addtodo", addTodo)
router.post("/adddone/:id", addDone)
router.get("/alltodos", allTodos)
router.get("/alldones", allDones)
router.put("/edittodo/:id", editTodo)
router.put("/editdone/:id", editDone)
router.get("/singletodo/:id", singleTodo)
router.delete("/deletetodo/:id", deleteTodo)
router.delete("/deletedone/:id", deleteDone)

export { router }