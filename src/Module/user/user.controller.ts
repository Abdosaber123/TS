import { Router } from "express";
import userServise from "./user.service.js"
import { isAuthenticated } from "../../Middleware/authViryFy.js";
const router = Router()
router.get("/profile/:id" , userServise.getProfile)
router.post("/update-password" ,isAuthenticated(),userServise.updatePassowrd )
router.post("/updateInfo" ,isAuthenticated(),userServise.updateInfo )
router.post("/send-request/:friendId" , isAuthenticated() ,userServise.addRequest)
router.put("/accept-request/:friendId" , isAuthenticated(),userServise.acceptRequest)
router.put("/reject-request/:friendId" , isAuthenticated(),userServise.rejectRequest)
router.put("/delete-friend/:friendId" , isAuthenticated(),userServise.deleteFriend)
router.put("/block-user/:friendId" , isAuthenticated(),userServise.blockUser)

export default router