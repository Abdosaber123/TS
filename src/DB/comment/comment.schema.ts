import { Schema } from "mongoose";
import { IComment } from "../../utils/common/interface";
import { reactionSchema } from "../reaction/reaction.schema";


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
    parentId:{
        type:Schema.Types.ObjectId,
        ref:"Comment",
       
    },
    content:{
        type:String
    },
    attachment:{},
    reaction: [reactionSchema ]
},{timestamps:true , toJSON:{virtuals:true} , toObject:{virtuals:true}})
commentSchema.virtual("replaies",{
    ref:"Comment",
    localField:"_id",
    foreignField:"parentId"
})
commentSchema.pre("deleteOne",async function(next){
    const filter =  typeof this.getFilter =='function' ?this.getFilter():{} 
    const replies = await this.model.find({parentId:filter._id})
    if(replies.length){
        for(const replay of replies){
            await this.model.deleteOne({_id:replay._id})
        }
    }
    next()
})