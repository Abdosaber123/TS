import { GENDER } from "../../utils/common/enum";

export interface IRegisterDTO {
        fullName:string,
        email:string,
        password:string,
        gender:GENDER,
        phoneNumber:string,
        otp?:string
}
export interface IUpdateDTO extends Partial <IRegisterDTO> {}
export interface IVerfy extends Partial <IRegisterDTO> {}
export interface ILogin extends Partial <IRegisterDTO> {}
export interface IResendOTP extends Partial <IRegisterDTO> {}
