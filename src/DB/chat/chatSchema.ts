import { model, Types } from "mongoose";
import { Schema } from "mongoose";
import { IChat } from "../../utils/common/interface";

export const chateSchema = new Schema<IChat>({
    users:[{type:Schema.Types.ObjectId , ref:"User"}],
    message:[{type:Schema.Types.ObjectId , ref:"Message"}]

},{timestamps:true})
