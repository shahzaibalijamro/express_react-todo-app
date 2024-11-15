import dotenv from "dotenv"
import express from "express"

//configuring env
dotenv.config()

//constants
const app = express()
const port = process.env.PORT

//middleware
app.use(express.json())

//global array
const todoArr = []


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
    todoArr.splice(index,1);
    res.status(200).json({
        message: "To Do deleted",
        status : 200,
        todoArr,
    })
})


app.listen(port, () => {
    console.log("Server running on port ", port);
})