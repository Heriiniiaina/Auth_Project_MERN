import express from "express"
import authRoute from "./auth.routes.js"
const router = express.Router()
const baseUrl = "/api/v1"
router.use(`${baseUrl}/auth`,authRoute)


export default router