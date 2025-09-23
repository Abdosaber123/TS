import { Router } from "express";
import authService from "./auth.service";
import * as AuthValidation from "./validation.auth"
import { isValid } from "../../Middleware/validate.middleware";
const router = Router()
router.post("/register",isValid(AuthValidation.registerValidation),authService.register)
router.post("/verfy",authService.verfyAccount)
router.post("/login",isValid(AuthValidation.loginValidation),authService.login)
router.post("/resend-otp",authService.resendOTP)
export default router