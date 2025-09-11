import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum"

export class User {
        
    public    fullName!:string
    public    email!:string
    public    password!:string
    public    role!:SYS_ROLE
    public    gender!:GENDER
    public    credentialUpdateAt!:Date
    public    userAgent!:USER_AGENT
    public    phoneNumber!:string
    public    otp!:string
    public    expireOtp!:Date
    public    isVerfy!:Boolean
}