import { Router } from "express";
import commentService from "./comment.service";
import { isAuthenticated } from "../../Middleware/authViryFy";
const router = Router({mergeParams:true})
router.post("/{:id}" ,isAuthenticated() ,commentService.create)
router.get("/:id" ,commentService.getSpectific)
router.delete("/:id" ,commentService.deleteComment)
router.patch("/:id" ,isAuthenticated() ,commentService.addReaction)
router.patch("/update/:id" ,isAuthenticated() ,commentService.updateComment)
router.patch("/freeze/:id" ,isAuthenticated() ,commentService.freezeComment)
export default router