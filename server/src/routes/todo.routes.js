import express from "express"
import { addTodo, allTodos, editTodo, singleTodo, deleteTodo, addDone, allDones } from "../controllers/todo.controllers.js";

const router = express.Router();
router.post("/addtodo", addTodo)
router.put("/adddone/:id", addDone)
router.get("/alltodos", allTodos)
router.get("/alldones", allDones)
router.put("/edittodo/:id", editTodo)
router.get("/singletodo/:id", singleTodo)
router.delete("/deletetodo/:id", deleteTodo)

export { router }