import { Request, Response } from "express";
import { createPostDTO } from "./post.dto";
import { PostFactory } from "./factrory";
import { postRipository } from "../../DB/post/postRiposotry";
import { NotAuthriztionExpection, NotFoundExpection } from "../../utils/error";
import { addReactionProvider } from "../../utils/provider/reaction.provider";
import { IUser } from "../../utils/common/interface";


class postService {
    private readonly postFactory = new PostFactory();
    private readonly postRepostory = new postRipository();
    public createPost = async (req: Request, res: Response) => {
        const createPostDTO: createPostDTO = req.body;
        const post = this.postFactory.createPost(createPostDTO, req.user);
        const createPost = await this.postRepostory.create(post);
        return res
            .status(201)
            .json({
                message: "Succsses Create Post",
                Success: true,
                data: { createPost },
            });
    };
    public addReaction = async (req: Request, res: Response) => {
        const { id } = req.params;

        const { reaction } = req.body;
        const userId = req.user.id;
        await addReactionProvider(this.postRepostory, id, userId, reaction)

        return res.sendStatus(204);
    };
    public getSpectafic = async (req: Request, res: Response) => {
        const { id } = req.params
        const post = await this.postRepostory.getOne({ _id: id }, {}, {
            populate: [
                { path: "userId", select: "fullName firstName lastName" },
                { path: "reaction.userId", select: "fullName firstName lastName" },
                { path: "comments", match: { parentId: null } },  // hya el mrfrod match: {parentId :[]} bs DB 34an 3mlt el esm mn
            ]
        })
        return res.status(201).json({ message: "succsess", success: true, data: { post } })
    }
    deletePost = async (req: Request, res: Response) => {
        const { id } = req.params
        const postExists = await this.postRepostory.exists({ _id: id })
        if (!postExists) throw new NotFoundExpection("Post Not Found")
        if (postExists.userId.toString() != req.user._id.toString()) throw new NotAuthriztionExpection("Check Authrizition")
        await this.postRepostory.delte({ _id: id })
        return res.status(201).json({ message: "Done Deleted", Succsess: true })
    }
    public updatePost = async (req: Request, res: Response) => {
        const { id } = req.params
        const updatePostDTO: createPostDTO = req.body
        const postExists = await this.postRepostory.exists({ _id: id })
        if (!postExists) throw new NotFoundExpection("post Not Found")
        if (postExists.userId.toString() != req.user._id.toString() && (postExists.userId as unknown as IUser)._id.toString() != req.user._id.toString()) throw new NotAuthriztionExpection("Check Authrizition")
        await this.postRepostory.update({ _id: id }, { content: updatePostDTO.content })
        return res.status(201).json({ message: "Updated Done", Success: true })
    }
    public freezePost = async (req: Request, res: Response) => {
        const { id } = req.params
        const postExists = await this.postRepostory.exists({ _id: id })
        if (!postExists) throw new NotFoundExpection("Post Not Found")
        if (postExists.userId.toString() != req.user._id.toString()) throw new NotAuthriztionExpection("Check Authrizition")
        await this.postRepostory.update({ _id: id }, { isFreeze: true })
        return res.status(201).json({ message: "Done Freezed", Succsess: true })
    }
}
export default new postService();
