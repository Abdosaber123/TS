"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const user_reporistory_1 = require("../../DB/model/userModel/user.reporistory");
const factory_1 = require("./factory");
const sendEmail_1 = require("../../utils/sendEmail");
const hashpassword_1 = require("../../utils/hashpassword");
const otp_1 = require("../../utils/otp");
const token_1 = require("../../utils/token");
const console_1 = require("console");
const provider_1 = require("./provider");
class AuthService {
    userRepository = new user_reporistory_1.UserRepository();
    authFectory = new factory_1.AuthFectory();
    constructor() { }
    register = async (req, res, next) => {
        const registerDTO = req.body;
        (0, console_1.log)("wsl l hna");
        const userExists = await this.userRepository.exists({ email: registerDTO.email });
        if (userExists) {
            throw new error_1.ConflictExpection("user is Exitst");
        }
        const user = this.authFectory.creat(registerDTO);
        const createdUser = await this.userRepository.create(user);
        return res.status(200).json({ message: "register", success: true, data: { id: createdUser.id } });
    };
    verfyAccount = async (req, res, next) => {
        const verfy = req.body;
        await provider_1.authProvider.checkOTP(verfy);
        this.userRepository.update({ email: verfy.email }, { isVerfy: true, $unset: { otp: "", expireOtp: "" } });
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
        return res.status(200).json({ message: "Verfy is Successfuly", success: true });
    };
    login = async (req, res, next) => {
        const loginDTO = req.body;
        const userExists = await this.userRepository.getOne({ email: loginDTO.email });
        if (!userExists) {
            throw new error_1.NotFoundExpection("user Not Found");
        }
        const match = (0, hashpassword_1.comparePassword)(loginDTO.password, userExists.password);
        if (!match) {
            throw new error_1.NotFoundExpection("Check Your Password");
        }
        if (userExists.isVerfy == false) {
            throw new error_1.NotAuthriztionExpection("plese Verfy your Account");
        }
        if (userExists.isVerfy == false) {
            throw new error_1.NotAuthriztionExpection("plese Verfy your Account");
        }
        const accsessToken = (0, token_1.geralToken)({ payload: { _id: userExists.id, role: userExists.role }, option: { expiresIn: "1h" } });
        return res.status(201).json({ message: "Login is Success", Succsess: true, token: { accsessToken } });
    };
    resendOTP = async (req, res, next) => {
        const resend = req.body;
        const userExists = await this.userRepository.exists({ email: resend.email });
        if (!userExists) {
            throw new error_1.NotFoundExpection("user is notFound");
        }
        const otp = (0, otp_1.generateOtp)();
        const expire = (0, otp_1.expirteOtp)(15 * 60 * 1000);
        await (0, sendEmail_1.sendEmail)({
            to: resend.email,
            subject: "verfy your account",
            html: `<p> Succsess Resend OTP ${otp}</p>`
        });
        // this.userRepository.update({email:userExists.email }, {otp , expireOtp:expire})
        userExists.otp = otp;
        userExists.expireOtp = expire;
        await userExists.save();
        return res.status(201).json({ message: "Done Resend", Succsess: true });
    };
}
exports.default = new AuthService();
