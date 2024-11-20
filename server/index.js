import dotenv from "dotenv"
import express from "express"
import cors from "cors"
//configuring env
dotenv.config()

//constants
const app = express()
const port = process.env.PORT

//middleware
app.use(express.json())
app.use(cors());


//global array
const todoArr = [
    {
        todo: 'Placeholder To Do',
        id: Date.now()
    }
]


//add todo
app.post("/",(req,res) => {
    const {title} = req.body;
    if (!title) {
        res.status(400).json({
            message : "Title not recieved!"
        })
        return
    }
    todoArr.push({
        todo: title,
        id: Date.now()
    })
    res.status(201).json({
        message: "To Do added",
        status : 201,
        todoArr,
    })
})


//all todos
app.get("/",(req,res)=>{
    res.status(200).json({
        message: "All To Do's",
        status : 200,
        todoArr
    })
})


//get single todo
app.post("/:id",(req,res)=>{
    const { id } = req.params;
    const index = todoArr.findIndex(item => item.id === +id);
    if (index === -1) {
        res.status(400).json({
            message : "Id not found!"
        })
        return
    }
    res.status(200).json({
        message: "Single To Do",
        status : 200,
        singleTodo : todoArr[index],
        todoArr,
    })
})


//delete todo
app.delete("/:id",(req,res)=>{
    const {id} = req.params;
    const index = todoArr.findIndex(item => item.id === +id)
    if (index === -1) {
        res.status(400).json({
            message : "Todo not found!"
        })
        return
    }
    const deletedTodo = todoArr[index]
    todoArr.splice(index,1);
    res.status(200).json({
        message: "To Do deleted",
        status : 200,
        deletedTodo,
        todoArr,
    })
})


//edit todo
app.put("/:id",(req,res)=>{
    const {id} = req.params;
    const index = todoArr.findIndex(item => item.id === +id)
    if (index === -1) {
        res.status(400).json({
            message : "Todo not found!"
        })
        return
    }
    const { updatedTitle } = req.body;
    if (!updatedTitle) {
        res.status(400).json({
            message : "Updated title not provided!"
        })
        return
    }
    todoArr[index].todo = updatedTitle;
    res.status(200).json({
        message: "To Do deleted",
        status : 200,
        updatedTodo : todoArr[index],
        todoArr,
    })
})


app.listen(port, () => {
    console.log("Server running on port ", port);
})