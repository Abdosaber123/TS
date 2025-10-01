import { Router } from "express";
import postService from "./post.service";
import { isAuthenticated } from "../../Middleware/authViryFy";
import commentRouter from "../comment/comment.controller"
const router = Router()
router.use("/:postId/comment" , commentRouter)
router.post("/" , isAuthenticated() ,postService.createPost)
router.patch("/:id" , isAuthenticated() , postService.addReaction)
router.get("/:id" , postService.getSpectafic)
export default router