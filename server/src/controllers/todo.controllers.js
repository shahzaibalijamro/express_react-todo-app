import mongoose from "mongoose";
import todoModel from "../model/todo.model.js";

const addTodo = async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required!" });
        }
        const newTodo = await todoModel.create({ title, done: false })
        res.status(201).json({
            message: "To Do added",
            status: 201,
            todo: newTodo,
        })
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while adding the todo",
            error: error.message,
        })
    }
}


//gets all todos
const allTodos = async (req, res) => {
    try {
        const allTodos = await todoModel.find({});
        res.status(200).json({
            message: "All todos",
            allTodos,
        })
    } catch (error) {
        res.status(500).json({
            message: "Could not fetch all todos",
            error: error.message
        })
    }
}


//gets single todo
const singleTodo = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid ID",
            status: 400
        })
    }
    try {
        const getSingleTodo = await todoModel.findById(id)
        if (!getSingleTodo) {
            return res.status(404).json({
                message: "Todo not found",
                status: 404
            });
        }
        res.status(200).json({
            message: "Single To Do",
            status: 200,
            singleTodo: getSingleTodo
        })
    } catch (error) {
        res.status(500).json({
            message: "Could not fetch single todo",
            error: error.message
        })
    }
}


//deletes todos
const deleteTodo = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid ID",
            status: 400
        })
    }
    try {
        const deletedTodo = await todoModel.findByIdAndDelete(id)
        if (!deletedTodo) {
            res.status(404).json({
                message: "Todo not found",
            })
        }
        res.status(200).json({
            message: "Todo deleted successfully",
            status: 200,
            data: deletedTodo
        });
    } catch (error) {
        res.status(500).json({
            message: "Could not delete todo",
            error: error.message
        })
    }
}


//edits todos
const editTodo = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid ID!"
        })
    }
    if (!title) {
        res.status(400).json({
            message: "Title not provided!"
        })
        return
    }
    try {
        const updatedTodo = await todoModel.findByIdAndUpdate(id, { title }, { new: true, runValidators: true })
        if (!updatedTodo) {
            return res.status(404).json({
                message: "Todo not found",
                status: 404
            });
        }
        res.status(200).json({
            message: "To Do updated",
            status: 200,
            updatedTodo,
        })
    } catch (error) {
        res.status(500).json({
            message: "Could not update todo",
            error: error.message
        })
    }
}


//adds done
const addDone = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid ID!"
        })
    }
    try {
        const addDone = await todoModel.findByIdAndUpdate(id, { done: true }, { new: true, runValidators: true })
        if (!addDone) {
            return res.status(404).json({
                message: "Todo not found",
                status: 404
            });
        }
        res.status(200).json({
            message: "Done added",
            status: 200,
            done: addDone
        })
    } catch (error) {
        res.status(500).json({
            message: "Could not add done",
            error: error.message
        })
    }
}


//gets all dones
const allDones = async (req, res) => {
    try {
        const allDones = await todoModel.find({done : true})
        if (!allDones) {
            return res.status(404).json({
                message: "Could not find any dones",
                status: 404
            })
        }
        res.status(200).json({
            status: 200,
            allDones,
        })
    } catch (error) {
        res.status(500).json({
            message: "Could not fetch all dones",
            error: error.message
        })
    }
}

export { addTodo, allTodos, editTodo, singleTodo, deleteTodo, addDone, allDones }