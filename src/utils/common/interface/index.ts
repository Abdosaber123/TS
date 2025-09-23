import { JwtPayload } from "jsonwebtoken";
import { GENDER, SYS_ROLE, USER_AGENT } from "../enum";

export interface IUser {
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
    isVerfy?:Boolean
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
