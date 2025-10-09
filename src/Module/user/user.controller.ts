import { Router } from "express";
import userServise from "./user.service.js"
import { isAuthenticated } from "../../Middleware/authViryFy.js";
const router = Router()
router.get("/profile/:id" , userServise.getProfile)
router.post("/update-password" ,isAuthenticated(),userServise.updatePassowrd )
router.post("/updateInfo" ,isAuthenticated(),userServise.updateInfo )

export default router