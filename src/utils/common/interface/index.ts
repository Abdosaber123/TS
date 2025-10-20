import { JwtPayload } from "jsonwebtoken";
import { GENDER, REACTION, SYS_ROLE, USER_AGENT } from "../enum";
import { ObjectId } from "mongoose";

export interface IUser {
    id:string
    firstName?: string,
    lastName?:string,
    fullName:string,
    email:string,
    password:string,
    role:SYS_ROLE,
    gender:GENDER,
    credentialUpdateAt:Date,
    userAgent:USER_AGENT,
    phoneNumber:string,
    otp:string,
    expireOtp:Date,
    isVerfy?:Boolean,
    friendRequest:ObjectId[]
    friend:ObjectId[]
    block:ObjectId[]
}
export interface IUser{
    _id:ObjectId
}
export interface IPayload extends JwtPayload {
    _id :string,
    role:string
}
declare module "express"{
    interface Request{
        user: IUser
    }
}
export interface IRection {
    reaction : REACTION,
    userId : ObjectId
}
export interface IPost {
    _id:ObjectId
    userId : ObjectId,
    reaction: IRection[],
    content:string,
    attachments?:IAttachment[],
    isFreeze?:Boolean
}
export interface IAttachment{
    url:string,
    id:string
}
export interface IComment {
    _id:ObjectId
    userId:ObjectId,
    postId:ObjectId,
    parentId: ObjectId,
    attachment?:IAttachment,
    content:string
    mention?:ObjectId[],
    reaction:IRection[],
    isFreeze?:Boolean
}
export interface IMessage {
    content:string,
    sender:ObjectId[],
    attachment?:ObjectId[],
    reactions?:IRection[]
}
export interface IChat{
    users:ObjectId[],
    message:ObjectId[]
}