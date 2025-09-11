"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFectory = void 0;
const enum_1 = require("../../../utils/common/enum");
const hashpassword_1 = require("../../../utils/hashpassword");
const otp_1 = require("../../../utils/otp");
const etily_1 = require("../etily");
class AuthFectory {
    register(registerDTO) {
        const user = new etily_1.User;
        user.fullName = registerDTO.fullName;
        user.email = registerDTO.email;
        user.password = (0, hashpassword_1.hashPassword)(registerDTO.password);
        user.phoneNumber = registerDTO.phoneNumber;
        user.gender = registerDTO.gender;
        user.otp = (0, otp_1.generateOtp)();
        user.expireOtp = (0, otp_1.expirteOtp)(10 * 60 * 1000);
        user.role = enum_1.SYS_ROLE.user;
        user.userAgent = enum_1.USER_AGENT.local;
        user.credentialUpdateAt = Date.now();
        user.isVerfy = false;
        return user;
    }
}
exports.AuthFectory = AuthFectory;
