import { model, Types } from "mongoose";
import { Schema } from "mongoose";
import { IChat, IMessage } from "../../utils/common/interface";

export const messageSchema = new Schema<IMessage>({
    content:{type:String},
    sender:[{type:Schema.Types.ObjectId , ref:"User"}],

},{timestamps:true})
