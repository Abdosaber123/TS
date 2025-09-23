import jwb, { JwtPayload } from "jsonwebtoken"
import { devConfig } from "../../config/env/local.config"
import { IPayload } from "../common/interface"
export const geralToken = ({payload , sec = devConfig.JWP_SECRET, option} :{payload:object , sec?:string,option:jwb.SignOptions} )=>{
    return jwb.sign(payload ,sec , option)
}
export const verfyToken = (token:string , sec:string = devConfig.JWP_SECRET )=>{
    return jwb.verify(token , sec) as IPayload
}