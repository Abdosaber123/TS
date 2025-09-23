import type { NextFunction, Request, Response } from "express";
import { ILogin, IRegisterDTO, IResendOTP, IVerfy } from "./auth.dto";
import { User } from "../../DB/model/userModel/user.model";
import { BadRequestExpection, ConflictExpection, NotAuthriztionExpection, NotFoundExpection } from "../../utils/error";
import { UserRepository } from "../../DB/model/userModel/user.reporistory";
import { AuthFectory } from "./factory";
import { sendEmail } from "../../utils/sendEmail";
import { comparePassword } from "../../utils/hashpassword";
import { expirteOtp, generateOtp } from "../../utils/otp";
import { geralToken } from "../../utils/token";
import * as AuthValidation from "./validation.auth"
import { log } from "console";
import { authProvider } from "./provider";
 class AuthService {
    private  userRepository = new UserRepository()
    private authFectory = new  AuthFectory()
    constructor(){}
      register = async (req:Request , res:Response , next:NextFunction)=>{
        const registerDTO:IRegisterDTO = req.body
        log("wsl l hna")
        const userExists = await this.userRepository.exists({email:registerDTO.email})
        if(userExists){
             throw new ConflictExpection("user is Exitst")
        }
        const user = this.authFectory.creat(registerDTO)
        const createdUser =await this.userRepository.create(user)
        return res.status(200).json({message:"register", success:true , data:{id:createdUser.id}})
    }
    verfyAccount = async  (req : Request , res : Response , next : NextFunction)=>{
        const verfy : IVerfy = req.body
        await authProvider.checkOTP(verfy)
        this.userRepository.update({email:verfy.email}, {isVerfy : true , $unset:{otp: "" , expireOtp :""}})
        // const userExists = await this.userRepository.getOne({email:verfy.email , otp:verfy.otp })
        // if(!userExists){
        //     throw new NotFoundExpection("user Not Found")
        // }
        // if(userExists.otp != verfy.otp){
        //      throw new BadRequestExpection("invalid OTP")
        // }
        // if(userExists.expireOtp < new Date()){
        //     throw new BadRequestExpection("invalid OTP")
        // }
        // userExists.isVerfy = true
        // userExists.otp = undefined as unknown as string
        // userExists.expireOtp = undefined as unknown as Date
        // await userExists.save()
        return res.status(200).json({message:"Verfy is Successfuly", success:true })

    }
    login = async (req : Request , res : Response , next : NextFunction)=>{
        const loginDTO:ILogin = req.body 
        const userExists = await this.userRepository.getOne({email:loginDTO.email})
        if(!userExists){
            throw new NotFoundExpection("user Not Found")
        }
        const match = comparePassword(loginDTO.password! , userExists!.password)
        if(!match){
            throw new NotFoundExpection("Check Your Password")
        }
         if(userExists.isVerfy == false){
            throw new NotAuthriztionExpection("plese Verfy your Account")
        }
        
        if(userExists.isVerfy == false){
            throw new NotAuthriztionExpection("plese Verfy your Account")
        }
        const accsessToken = geralToken({payload:{_id:userExists.id , role: userExists.role} , option :{expiresIn :"15m"}}) 
        return res.status(201).json({message:"Login is Success" , Succsess:true , token : {accsessToken}})
    }
    resendOTP = async (req : Request , res : Response , next : NextFunction)=>{
        const resend:IResendOTP = req.body
        const userExists =await  this.userRepository.exists({email:resend.email})
        if(!userExists){
             throw new NotFoundExpection("user is notFound")
        }
        const otp = generateOtp()
        const expire = expirteOtp(15*60*1000)as unknown as number
         await sendEmail({
            to: resend.email as unknown as string,
            subject :"verfy your account",
            html:`<p> Succsess Resend OTP ${otp}</p>`
        })
        // this.userRepository.update({email:userExists.email }, {otp , expireOtp:expire})
        userExists.otp = otp as unknown as string
        userExists.expireOtp = expire as unknown as Date
         await userExists.save()
        return res.status(201).json({message:"Done Resend" , Succsess:true})

    }
}
export default new AuthService()

