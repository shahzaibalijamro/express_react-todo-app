import dotenv from "dotenv"
dotenv.config()
import {app} from "./app.js"
import { router } from "./src/routes/todo.routes.js"

app.use("/api/v1", router)

app.listen(process.env.PORT,() => {
    console.log("Server running on port ", process.env.PORT)
})