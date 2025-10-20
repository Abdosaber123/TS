import { Router } from "express";
import postService from "./post.service";
import { isAuthenticated } from "../../Middleware/authViryFy";
import commentRouter from "../comment/comment.controller"
const router = Router()
router.use("/:postId/comment" , commentRouter)
router.post("/" , isAuthenticated() ,postService.createPost)
router.patch("/:id" , isAuthenticated() , postService.addReaction)
router.get("/:id" , postService.getSpectafic)
router.delete("/delete/:id" , isAuthenticated() , postService.deletePost)
router.patch("/update/:id" , isAuthenticated() , postService.updatePost)
router.patch("/freeze/:id" ,isAuthenticated() ,postService.freezePost)
export default router