import { Request, Response } from "express";
import { commentDTO } from "./commentDTO";
import { postRipository } from "../../DB/post/postRiposotry";
import { NotAuthriztionExpection, NotFoundExpection } from "../../utils/error";
import { IComment, IPost } from "../../utils/common/interface";
import { CommentRiposotry } from "../../DB/comment/comment.reposotry";
import { FactoryComment } from "./factory";
import { addReactionProvider } from "../../utils/provider/reaction.provider";

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
        const comment = this.commentFactory.createComment(commentDTO, postExists, req.user, commentExists)
        const createdComment = await this.commentRiposotry.create(comment)
        return res.status(201).json({ message: "create comment Succsess", Success: true, data: { createdComment } })
    }
    getSpectific = async (req: Request, res: Response) => {
        const { id } = req.params
        const commentExists = await this.commentRiposotry.exists({ _id: id }, {}, {
            populate: [
                // { path: "replaies" },
                { path: "postId", select: "userId" }
            ]
        })
        if (!commentExists) throw new NotFoundExpection("Post Not Found")
        return res.status(201).json({ message: "done", succsess: true, data: { commentExists } })
    }
    deleteComment = async (req: Request, res: Response) => {
        const { id } = req.params
        const commentExists = await this.commentRiposotry.exists({ _id: id })
        if (commentExists.userId.toString() != req.user._id.toString() && (commentExists.postId as unknown as IPost).userId.toString() != req.user._id.toString()) throw new NotAuthriztionExpection("Check Authrizition")
        if (!commentExists) throw new NotFoundExpection("post Not Found")
        this.commentRiposotry.delte({ _id: id })
        return res.status(201).json({ Message: "Deleted Done", Success: true })
    }
    addReaction = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { reaction } = req.body;
        const userId = req.user.id;
        await addReactionProvider(this.commentRiposotry, id, userId, reaction)
        return res.sendStatus(204);
    };
    public updateComment = async (req:Request , res:Response)=>{
        const {id} = req.params
        const updateCommentDTO:commentDTO = req.body
        const commentExists = await this.commentRiposotry.exists({ _id: id })
        if (!commentExists) throw new NotFoundExpection("post Not Found")
        if (commentExists.userId.toString() != req.user._id.toString() && (commentExists.postId as unknown as IPost).userId.toString() != req.user._id.toString()) throw new NotAuthriztionExpection("Check Authrizition")
        await this.commentRiposotry.update({ _id: id },{content:updateCommentDTO.content})
        return res.status(201).json({message:"Updated Done" , Success:true})        
    }
    public freezeComment = async (req:Request , res:Response)=>{
        const {id} = req.params
        const commentExists = await this.commentRiposotry.exists({ _id: id })
        if (!commentExists) throw new NotFoundExpection("post Not Found")
        if (commentExists.userId.toString() != req.user._id.toString() && (commentExists.postId as unknown as IPost).userId.toString() != req.user._id.toString()) throw new NotAuthriztionExpection("Check Authrizition")
        await this.commentRiposotry.update({ _id: id },{isFreeze:true})
        return res.status(201).json({message:"Freezed Done" , Success:true})        
    }
}
export default new CommentService