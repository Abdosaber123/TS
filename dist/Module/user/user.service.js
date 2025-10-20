"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_reporistory_1 = require("../../DB/model/userModel/user.reporistory");
const error_1 = require("../../utils/error");
const hashpassword_1 = require("../../utils/hashpassword");
class userService {
    userRepository = new user_reporistory_1.UserRepository();
    getProfile = async (req, res, next) => {
        const user = await this.userRepository.getOne({ _id: req.params.id }, { email: 0 }, { populate: [
                { path: "friend", select: "fullName firstName lastName" }
            ] });
        // log(req.params.id)
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
    addRequest = async (req, res, next) => {
        const { friendId } = req.params;
        const friend = await this.userRepository.exists({ _id: friendId }); // isDeleted : false
        if (!friend)
            return next(new Error("user not found", { cause: 400 }));
        const user = req.user;
        const isFriend = user.friend.map(String).includes(friendId);
        if (isFriend) {
            return next(new Error("is Already Friend", { cause: 400 }));
        }
        const haveRequest = user.friendRequest.map(String).includes(friendId);
        if (haveRequest) {
            return next(new Error("is Already send request", { cause: 400 }));
        }
        await this.userRepository.update({ _id: friendId }, {
            $addToSet: { friendRequest: req.user._id } // addTo set hya hya zy el $push bs el fr2 enha m4 bt3ml lel klam copy
        });
        return res.status(200).json({ message: "Success send Request" });
    };
    acceptRequest = async (req, res, next) => {
        const { friendId } = req.params;
        const promis = Promise.all([
            this.userRepository.update({ _id: req.user._id }, {
                $pull: { friendRequest: friendId },
                $addToSet: { friend: friendId }
            }),
            this.userRepository.update({ _id: friendId }, {
                $addToSet: { friend: req.user._id }
            })
        ]);
        await promis;
        return res.status(201).json({ message: "Accepted", Success: true });
    };
}
exports.default = new userService;
