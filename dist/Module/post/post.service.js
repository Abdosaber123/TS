"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factrory_1 = require("./factrory");
const postRiposotry_1 = require("../../DB/post/postRiposotry");
const error_1 = require("../../utils/error");
const enum_1 = require("../../utils/common/enum");
class postService {
    postFactory = new factrory_1.PostFactory();
    postRepostory = new postRiposotry_1.postRipository();
    createPost = async (req, res) => {
        const createPostDTO = req.body;
        const post = this.postFactory.createPost(createPostDTO, req.user);
        const createPost = await this.postRepostory.create(post);
        return res
            .status(201)
            .json({
            message: "Succsses Create Post",
            Success: true,
            data: { createPost },
        });
    };
    addReaction = async (req, res) => {
        const { id } = req.params;
        const { reaction } = req.body;
        const userId = req.user._id;
        const postExists = await this.postRepostory.exists({ _id: id });
        if (!postExists) {
            throw new error_1.NotFoundExpection("post not found");
        }
        let userReactionPostIndex = postExists.reaction.findIndex((reactions) => {
            return reactions.userId.toString() == userId.toString();
        });
        if (userReactionPostIndex == -1) {
            await this.postRepostory.update({ _id: id }, {
                $push: {
                    reaction: {
                        reaction: [null, undefined, ""].includes(reaction)
                            ? enum_1.REACTION.like
                            : reaction,
                        userId,
                    },
                },
            });
        }
        else if ([undefined, null, ""].includes(reaction)) { //lazem a send null 34an ams7 ek like
            await this.postRepostory.update({ _id: id }, {
                $pull: { reaction: postExists.reaction[userReactionPostIndex] }
            });
        }
        else {
            await this.postRepostory.update({ _id: id, "reaction.userId": userId }, { "reaction.$.reaction": reaction });
        }
        return res.sendStatus(204);
    };
    getSpectafic = async (req, res) => {
        const { id } = req.params;
        const post = await this.postRepostory.getOne({ _id: id }, {}, { populate: [
                { path: "userId", select: "fullName firstName lastName" },
                { path: "reaction.userId", select: "fullName firstName lastName" },
                { path: "comments", match: { parentId: [] } }, // hya el mrfrod match: {parentId :[]} bs DB 34an 3mlt el esm mn
            ] });
        return res.status(201).json({ message: "succsess", success: true, data: { post } });
    };
}
exports.default = new postService();
