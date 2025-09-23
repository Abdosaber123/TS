import z from "zod"
import { IRegisterDTO } from "./auth.dto"
import { GENDER } from "../../utils/common/enum"
export const registerValidation = z.object<IRegisterDTO>({
fullName : z.string().min(2).max(50) as unknown as string,
email:z.email() as unknown as string,
password : z.string() as unknown as string,
phoneNumber: z.string() as unknown as string,
gender : z.enum(GENDER) as unknown as GENDER
})
export const loginValidation = z.object({
    email:z.email() as unknown as string,
    password: z.string() as unknown as string
})