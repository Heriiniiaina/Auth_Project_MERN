import express from "express"
import { login, logout, register, sendValidationCode } from "../controllers/auth.controller.js"
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.patch("/send-verification-code",sendValidationCode)

export default router