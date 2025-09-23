"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProvider = void 0;
const user_reporistory_1 = require("../../../DB/model/userModel/user.reporistory");
const error_1 = require("../../../utils/error");
exports.authProvider = {
    async checkOTP(IVerfy) {
        const userRepository = new user_reporistory_1.UserRepository();
        const userExists = await userRepository.getOne({ email: IVerfy.email, otp: IVerfy.otp });
        if (!userExists) {
            throw new error_1.NotFoundExpection("user Not Found");
        }
        if (userExists.otp != IVerfy.otp) {
            throw new error_1.BadRequestExpection("invalid OTP");
        }
        if (userExists.expireOtp < new Date()) {
            throw new error_1.BadRequestExpection("invalid OTP");
        }
    }
};
