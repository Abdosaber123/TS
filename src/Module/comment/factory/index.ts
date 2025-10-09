import { ObjectId } from "mongoose";
import { IComment, IPost, IUser } from "../../../utils/common/interface";
import { commentDTO } from "../commentDTO";
import { Comment } from "../utlis";

export class FactoryComment {
    createComment(creatComment:commentDTO , post:IPost , user:IUser , comment?:IComment) {
        const newComment = new Comment()
        newComment.content = creatComment.content
        newComment.postId = post._id || comment.postId
        newComment.userId = user._id
        newComment.reaction= []
        newComment.parentId  = comment?._id
        return newComment
    }
}