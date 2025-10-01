import { Request, Response } from "express";
import { createPostDTO } from "./post.dto";
import { PostFactory } from "./factrory";
import { postRipository } from "../../DB/post/postRiposotry";
import { NotFoundExpection } from "../../utils/error";
import { log } from "console";
import { ObjectId } from "mongoose";
import { REACTION } from "../../utils/common/enum";

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
        const userId = req.user._id;
        const postExists = await this.postRepostory.exists({ _id: id });
        if (!postExists) {
            throw new NotFoundExpection("post not found");
        }
        let userReactionPostIndex = postExists.reaction.findIndex((reactions) => {
            return reactions.userId.toString() == userId.toString();
        });
        if (userReactionPostIndex == -1) {
            await this.postRepostory.update(
                { _id: id },
                {
                    $push: {
                        reaction: {
                            reaction: [null, undefined, ""].includes(reaction)
                                ? REACTION.like
                                : reaction,
                            userId,
                        },
                    },
                }
            );
        } else if ([undefined, null, ""].includes(reaction)) {                     //lazem a send null 34an ams7 ek like
            await this.postRepostory.update({ _id: id }, {
                $pull :{reaction:postExists.reaction[userReactionPostIndex]}
            })
        }
        else {
            await this.postRepostory.update(
                { _id: id, "reaction.userId": userId },
                { "reaction.$.reaction": reaction }
            );
        }

        return res.sendStatus(204);
    };
    public getSpectafic = async (req: Request, res: Response)=>{
        const {id}= req.params
       const post = await this.postRepostory.getOne({_id:id} ,{},{populate :[
            {path:"userId" , select: "fullName firstName lastName"},
            {path:"reaction.userId" , select: "fullName firstName lastName"},
            {path:"comments" , match: {parentId :[]}},  // hya el mrfrod match: {parentId :[]} bs DB 34an 3mlt el esm mn
        ]})
        return res.status(201).json({message:"succsess" , success : true , data :{post}})
    }
}
export default new postService();
