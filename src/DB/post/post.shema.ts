import { Schema } from "mongoose";
import { IPost, IRection } from "../../utils/common/interface";
import { Comment } from "../comment/comment.model";
import { reactionSchema } from "../reaction/reaction.schema";


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
postSchema.pre("deleteOne",async function(next){
    // const filter = typeof this.getFilter =='function'? this.getFilter():{}
    const filter =  typeof this.getFilter =='function' ?this.getFilter():{} 
    await Comment.deleteMany({postId:filter._id})
    next()
} )


