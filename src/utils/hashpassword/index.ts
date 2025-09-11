import bcrypt, { compareSync } from "bcryptjs"
export const hashPassword = (password:string)=>{
    return bcrypt.hashSync(password , 10)
}
export const comparePassword = (passowrd:string , hash:string)=>{
    return compareSync(passowrd , hash)
}