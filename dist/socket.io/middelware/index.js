"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socektAuth = void 0;
const token_1 = require("../../utils/token");
const user_reporistory_1 = require("../../DB/model/userModel/user.reporistory");
const error_1 = require("../../utils/error");
const socektAuth = async (socket, next) => {
    try {
        const { token } = socket.handshake.auth;
        const { _id } = (0, token_1.verfyToken)(token);
        const userRiposotory = new user_reporistory_1.UserRepository();
        const user = await userRiposotory.exists({ _id });
        if (!user)
            throw new error_1.NotFoundExpection("user not found");
        socket.data.user = user;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.socektAuth = socektAuth;
