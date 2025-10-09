import { ObjectId } from "mongoose"
import { IAttachment, IRection } from "../../../utils/common/interface"

export class Comment {
    userId: ObjectId
    postId: ObjectId
    parentId: ObjectId
    attachment?: IAttachment
    content: string
    mention?: ObjectId[]
    reaction: IRection[]
}