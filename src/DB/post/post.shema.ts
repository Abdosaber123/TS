import { Schema } from "mongoose";
import { IPost, IRection } from "../../utils/common/interface";
import { REACTION } from "../../utils/common/enum";

export const reactionSchema = new Schema<IRection>({
    reaction:{
        type:Number,
        enum:REACTION,
        default:REACTION.like
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        require:true
    }
},{timestamps:true})
export const postSchema = new Schema<IPost>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    content:{
        type:String,
        // require:function (){
        //     if(this.attachments.length) return false
        //     return true
        // },
        required: true
    },
    reaction:[reactionSchema]
},{timestamps:true , toJSON:{virtuals:true} , toObject:{virtuals:true}})
postSchema.virtual("comments" ,{
    localField: "_id",
    foreignField:"postId",
    ref:"Comment"
})