import { Schema } from "mongoose";
import { IRection } from "../../utils/common/interface";
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