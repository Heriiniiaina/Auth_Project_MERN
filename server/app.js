import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
import { dbConnect } from "./db/dbConnect.js"
import routes from "./routes/routes.js"
const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(routes)


dbConnect()

export default app



