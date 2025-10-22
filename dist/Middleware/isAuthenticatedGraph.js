"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticatedGraph = void 0;
const token_1 = require("../utils/token");
const user_reporistory_1 = require("../DB/model/userModel/user.reporistory");
const error_1 = require("../utils/error");
const isAuthenticatedGraph = async (context) => {
    const token = context.token;
    const { _id } = (0, token_1.verfyToken)(token);
    const userRepository = new user_reporistory_1.UserRepository();
    const user = await userRepository.exists({ _id }, {}, {
        populate: [
            { path: "friend", select: "fullName firstName lastName" }
        ]
    });
    if (!user)
        throw new error_1.NotFoundExpection("user Not Found");
    context.user = user;
};
exports.isAuthenticatedGraph = isAuthenticatedGraph;
