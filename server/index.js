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


app.listen(port, () => {
    console.log("Server running on port ", port);
})