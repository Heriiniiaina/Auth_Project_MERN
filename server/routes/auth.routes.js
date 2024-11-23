import express from "express"
import { login, logout, register, resetPasword, sendForgotPasswordToken, sendValidationCode, verifyVerificationCode } from "../controllers/auth.controller.js"
const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
router.patch("/send-verification-code",sendValidationCode)
router.patch("/verify-verification-code",verifyVerificationCode)
router.patch("/send-forgot-password-token",sendForgotPasswordToken)
router.patch("/reset-password/:token",resetPasword)
export default router