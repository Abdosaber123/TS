import type { NextFunction, Request, Response } from "express";
import { ILogin, IRegisterDTO, IResendOTP, IVerfy } from "./auth.dto";
import { User } from "../../DB/model/userModel/user.model";
import { ConflictExpection, NotAuthriztionExpection, NotFoundExpection } from "../../utils/error";
import { UserRepository } from "../../DB/model/userModel/user.reporistory";
import { AuthFectory } from "./factory";
import { sendEmail } from "../../utils/sendEmail";
import { comparePassword } from "../../utils/hashpassword";
import { expirteOtp, generateOtp } from "../../utils/otp";
 class AuthService {
    private  userRepository = new UserRepository()
    private authFectory = new  AuthFectory()
    constructor(){}
      register = async (req:Request , res:Response , next:NextFunction)=>{
        const registerDTO:IRegisterDTO = req.body
        const userExists =await  this.userRepository.exists({email:registerDTO.email})
        if(userExists){
             throw new ConflictExpection("user is Exitst")
        }
       
        const user = this.authFectory.register(registerDTO)
         await sendEmail({
            to: registerDTO.email,
            subject :"verfy your account",
            html:`<p> Your otp to verfy your account ${user.otp}</p>`
        })
        const createdUser =await this.userRepository.create(user)
        return res.status(200).json({message:"register", success:true , data:createdUser})
    }
    verfyAccount = async  (req : Request , res : Response , next : NextFunction)=>{
        const verfy : IVerfy = req.body
        console.log(verfy.email,verfy.otp);
        
        const userExists = await this.userRepository.getOne({email:verfy.email , otp:verfy.otp })
        if(!userExists){
            throw new NotFoundExpection("user Not Found")
        }
        userExists.isVerfy = true
        userExists.otp = undefined as unknown as string
        userExists.expireOtp = undefined as unknown as Date
        await userExists.save()
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
        return res.status(201).json({message:"Login is Success" , Succsess:true})
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
        userExists.otp = otp as unknown as string
        userExists.expireOtp = expire as unknown as Date
         await userExists.save()
        return res.status(201).json({message:"Done Resend" , Succsess:true})

    }
}
export default new AuthService()

