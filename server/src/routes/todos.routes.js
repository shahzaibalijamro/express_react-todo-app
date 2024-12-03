import express from "express"
import { addTodo, allTodos, editTodo, singleTodo, deleteTodo, addDone, allDones } from "../controllers/todos.controllers.js";

const todoRouter = express.Router();

//add Todo
router.post("/addtodo", addTodo)

//complete Todo
router.put("/adddone/:id", addDone)

//get all Todos
router.get("/alltodos", allTodos)

//get all completed Todos
router.get("/alldones", allDones)

//edit Todos
router.put("/edittodo/:id", editTodo)

//get single Todos

router.get("/singletodo/:id", singleTodo)

//delete Todo
router.delete("/deletetodo/:id", deleteTodo)

export { todoRouter }