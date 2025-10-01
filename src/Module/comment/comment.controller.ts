import { Router } from "express";
import commentService from "./comment.service";
import { isAuthenticated } from "../../Middleware/authViryFy";
const router = Router({mergeParams:true})
router.post("/{:id}" ,isAuthenticated() ,commentService.create)
export default router