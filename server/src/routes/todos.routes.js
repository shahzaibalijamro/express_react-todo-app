import express from "express"
import { addTodo, allTodos, editTodo, singleTodo, deleteTodo, addDone, allDones } from "../controllers/todos.controllers.js";

const todoRouter = express.Router();

//add Todo
todoRouter.post("/addtodo", addTodo)

//complete Todo
todoRouter.put("/adddone/:id", addDone)

//get all Todos
todoRouter.get("/alltodos", allTodos)

//get all completed Todos
todoRouter.get("/alldones", allDones)

//edit Todos
todoRouter.put("/edittodo/:id", editTodo)

//get single Todos

todoRouter.get("/singletodo/:id", singleTodo)

//delete Todo
todoRouter.delete("/deletetodo/:id", deleteTodo)

export { todoRouter }