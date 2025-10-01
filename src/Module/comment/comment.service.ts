import { Request, Response } from "express";
import { commentDTO } from "./commentDTO";
import { postRipository } from "../../DB/post/postRiposotry";
import { NotFoundExpection } from "../../utils/error";
import { IComment } from "../../utils/common/interface";
import { CommentRiposotry } from "../../DB/comment/comment.reposotry";
import { FactoryComment } from "./factory";

class CommentService {
    private readonly postRiposotry = new postRipository()
    private readonly commentRiposotry = new CommentRiposotry()
    private readonly commentFactory = new FactoryComment()
    create = async (req: Request, res: Response) => {
        const { postId, id } = req.params
        console.log(postId, id);
        const commentDTO: commentDTO = req.body
        const postExists = await this.postRiposotry.exists({ _id: postId })
        if (!postExists) throw new NotFoundExpection("Post Not Found")
        let commentExists: IComment | any
        if (id) {
            commentExists = await this.commentRiposotry.exists({ _id: id })
            if (!commentExists) throw new NotFoundExpection("Post Not Found")
        }
        const comment = this.commentFactory.createComment(commentDTO,postExists, req.user ,commentExists)
        const createdComment = await this.commentRiposotry.create(comment)
        return res.status(201).json({message:"create comment Succsess" , Success:true , data :{createdComment}})
    }
}
export default new CommentService