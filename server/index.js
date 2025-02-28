import dotenv from "dotenv"
dotenv.config()
import {app} from "./app.js"
import { todoRouter } from "./src/routes/todos.routes.js"
import { connectDB } from "./src/db/index.js"

app.use("/api/v1", todoRouter)


connectDB()
.then(()=>{
    app.listen(process.env.PORT,() => {
        console.log("Server running on port ", process.env.PORT)
    })
})
.catch((err)=>{
    console.log("Something went wrong", err)
})