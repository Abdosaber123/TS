"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_reporistory_1 = require("../../DB/model/userModel/user.reporistory");
const error_1 = require("../../utils/error");
const console_1 = require("console");
const hashpassword_1 = require("../../utils/hashpassword");
class userService {
    userRepository = new user_reporistory_1.UserRepository();
    getProfile = async (req, res, next) => {
        const user = await this.userRepository.getOne({ _id: req.params.id });
        (0, console_1.log)(req.params.id);
        if (!user) {
            throw new error_1.NotFoundExpection("user Not Found");
        }
        res.status(201).json({ message: "done", success: true, data: user });
    };
    updatePassowrd = async (req, res) => {
        const updatePasswordDto = req.body;
        const emailExists = await this.userRepository.exists({ email: updatePasswordDto.email });
        if (!emailExists)
            throw new error_1.NotFoundExpection("user Not Found");
        const match = (0, hashpassword_1.comparePassword)(updatePasswordDto.oldPassword, emailExists.password);
        if (!match) {
            throw new error_1.NotAuthriztionExpection("user Not Found");
        }
        emailExists.password = (0, hashpassword_1.hashPassword)(updatePasswordDto.newPassword);
        await emailExists.save();
        return res.status(201).json({ message: "updateSuccessfuly", Succsess: true });
        //         await this.userRepository.update({ email: updatePasswordDto.email }, { password:newPassword})
    };
    updateInfo = async (req, res) => {
        const update = req.body;
        const emailExists = await this.userRepository.exists({ email: update.email });
        if (!emailExists)
            throw new error_1.NotFoundExpection("user Not Found");
        const match = (0, hashpassword_1.comparePassword)(update.password, emailExists.password);
        if (!match) {
            throw new error_1.NotAuthriztionExpection("check your password");
        }
        await this.userRepository.update({ email: update.email }, { firstName: update.firstName, lastName: update.lastName });
        return res.status(201).json({ message: "Success Change", Success: true });
    };
}
exports.default = new userService;
