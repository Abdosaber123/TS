import { CommentRiposotry } from "../../DB/comment/comment.reposotry";
import { postRipository } from "../../DB/post/postRiposotry";
import { REACTION } from "../common/enum";
import { NotFoundExpection } from "../error";

export const addReactionProvider = async (
    repo:CommentRiposotry|postRipository , 
    id:string,
    userId:string,
    reaction:string

)=>{
            const postExists = await repo.exists({ _id: id });
            if (!postExists) {
                throw new NotFoundExpection("post not found");
            }
            let userReactionPostIndex = postExists.reaction.findIndex((reactions) => {
                return reactions.userId.toString() == userId.toString();
            });
            if (userReactionPostIndex == -1) {
                await repo.update(
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
                await repo.update({ _id: id }, {
                    $pull :{reaction:postExists.reaction[userReactionPostIndex]}
                })
            }
            else {
                await repo.update(
                    { _id: id, "reaction.userId": userId },
                    { "reaction.$.reaction": reaction }
                );
            }
    
           
        };
