import { Router } from "express";
import userServise from "./user.service.js"
const router = Router()
router.get("/profile/:id" , userServise.getProfile)
export default router