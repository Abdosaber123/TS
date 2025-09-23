"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_reporistory_1 = require("../../DB/model/userModel/user.reporistory");
const error_1 = require("../../utils/error");
const console_1 = require("console");
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
}
exports.default = new userService;
