import { Schema } from "mongoose";
import { IComment } from "../../utils/common/interface";
import { reactionSchema } from "../post/post.shema";

export const commentSchema = new Schema<IComment>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    postId:{
         type:Schema.Types.ObjectId,
        ref:"Post",
        required:true
    },
    parentId:[{
        type:Schema.Types.ObjectId,
        ref:"Comment",
        required:true
    }],
    content:{
        type:String
    },
    attachment:{},
    reaction: [reactionSchema ]
},{timestamps:true})