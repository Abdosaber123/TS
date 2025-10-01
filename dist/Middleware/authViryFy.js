"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const token_1 = require("../utils/token");
const user_reporistory_1 = require("../DB/model/userModel/user.reporistory");
const error_1 = require("../utils/error");
const isAuthenticated = () => {
    return async (req, res, next) => {
        const token = req.headers.authorization;
        const { _id } = (0, token_1.verfyToken)(token);
        const userRepository = new user_reporistory_1.UserRepository();
        const user = await userRepository.exists({ _id });
        if (!user)
            throw new error_1.NotFoundExpection("user Not Found");
        req.user = user;
        next();
    };
};
exports.isAuthenticated = isAuthenticated;
