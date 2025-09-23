
import { UserRepository } from "../../../DB/model/userModel/user.reporistory"
import { BadRequestExpection, NotFoundExpection } from "../../../utils/error"
import { IVerfy } from "../auth.dto"
export const authProvider = {
   async checkOTP  (IVerfy:IVerfy){
                const userRepository = new UserRepository()
                const userExists = await userRepository.getOne({email:IVerfy.email , otp:IVerfy.otp })
                if(!userExists){
                    throw new NotFoundExpection("user Not Found")
                }
                if(userExists.otp != IVerfy.otp){
                     throw new BadRequestExpection("invalid OTP")
                }
                if(userExists.expireOtp < new Date()){
                    throw new BadRequestExpection("invalid OTP")
                }
    }
}