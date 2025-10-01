import { ObjectId } from "mongoose"
import { IAttachment, IRection } from "../../../utils/common/interface"

export class Post {
    content : string 
    userId : ObjectId
    attashment?:IAttachment[]
    reaction:IRection[]
}