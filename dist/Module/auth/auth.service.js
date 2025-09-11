"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../../utils/error");
const user_reporistory_1 = require("../../DB/model/userModel/user.reporistory");
const factory_1 = require("./factory");
const sendEmail_1 = require("../../utils/sendEmail");
const hashpassword_1 = require("../../utils/hashpassword");
const otp_1 = require("../../utils/otp");
class AuthService {
    userRepository = new user_reporistory_1.UserRepository();
    authFectory = new factory_1.AuthFectory();
    constructor() { }
    register = async (req, res, next) => {
        const registerDTO = req.body;
        const userExists = await this.userRepository.exists({ email: registerDTO.email });
        if (userExists) {
            throw new error_1.ConflictExpection("user is Exitst");
        }
        const user = this.authFectory.register(registerDTO);
        await (0, sendEmail_1.sendEmail)({
            to: registerDTO.email,
            subject: "verfy your account",
            html: `<p> Your otp to verfy your account ${user.otp}</p>`
        });
        const createdUser = await this.userRepository.create(user);
        return res.status(200).json({ message: "register", success: true, data: createdUser });
    };
    verfyAccount = async (req, res, next) => {
        const verfy = req.body;
        console.log(verfy.email, verfy.otp);
        const userExists = await this.userRepository.getOne({ email: verfy.email, otp: verfy.otp });
        if (!userExists) {
            throw new error_1.NotFoundExpection("user Not Found");
        }
        userExists.isVerfy = true;
        userExists.otp = undefined;
        userExists.expireOtp = undefined;
        await userExists.save();
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
        return res.status(201).json({ message: "Login is Success", Succsess: true });
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
        userExists.otp = otp;
        userExists.expireOtp = expire;
        await userExists.save();
        return res.status(201).json({ message: "Done Resend", Succsess: true });
    };
}
exports.default = new AuthService();
