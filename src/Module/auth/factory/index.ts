import { SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { hashPassword } from "../../../utils/hashpassword";
import { expirteOtp, generateOtp } from "../../../utils/otp";
import { sendEmail } from "../../../utils/sendEmail";
import { IRegisterDTO } from "../auth.dto";
import { User } from "../etily";

export class AuthFectory {
     creat(registerDTO : IRegisterDTO){
        const user = new User
        user.fullName = registerDTO.fullName
        user.email = registerDTO.email
        user.password = hashPassword(registerDTO.password)
        user.phoneNumber = registerDTO.phoneNumber
        user.gender = registerDTO.gender
        user.otp = generateOtp() as unknown as string
        user.expireOtp = expirteOtp(10 * 60 * 1000) as unknown as Date
        user.role = SYS_ROLE.user
        user.userAgent = USER_AGENT.local
        user.credentialUpdateAt = Date.now() as unknown as Date
        user.isVerfy = false
        return user
    }
}