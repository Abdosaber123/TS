import { Router } from "express";
import authService from "./auth.service";
const router = Router()
router.post("/register" , authService.register)
router.post("/verfy",authService.verfyAccount)
router.post("/login",authService.login)
router.post("/resend-otp",authService.resendOTP)
export default router