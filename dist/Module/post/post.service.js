"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const factrory_1 = require("./factrory");
const postRiposotry_1 = require("../../DB/post/postRiposotry");
const error_1 = require("../../utils/error");
const reaction_provider_1 = require("../../utils/provider/reaction.provider");
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
        const userId = req.user.id;
        await (0, reaction_provider_1.addReactionProvider)(this.postRepostory, id, userId, reaction);
        return res.sendStatus(204);
    };
    getSpectafic = async (req, res) => {
        const { id } = req.params;
        const post = await this.postRepostory.getOne({ _id: id }, {}, {
            populate: [
                { path: "userId", select: "fullName firstName lastName" },
                { path: "reaction.userId", select: "fullName firstName lastName" },
                { path: "comments", match: { parentId: null } }, // hya el mrfrod match: {parentId :[]} bs DB 34an 3mlt el esm mn
            ]
        });
        return res.status(201).json({ message: "succsess", success: true, data: { post } });
    };
    deletePost = async (req, res) => {
        const { id } = req.params;
        const postExists = await this.postRepostory.exists({ _id: id });
        if (!postExists)
            throw new error_1.NotFoundExpection("Post Not Found");
        if (postExists.userId.toString() != req.user._id.toString())
            throw new error_1.NotAuthriztionExpection("Check Authrizition");
        await this.postRepostory.delte({ _id: id });
        return res.status(201).json({ message: "Done Deleted", Succsess: true });
    };
    updatePost = async (req, res) => {
        const { id } = req.params;
        const updatePostDTO = req.body;
        const postExists = await this.postRepostory.exists({ _id: id });
        if (!postExists)
            throw new error_1.NotFoundExpection("post Not Found");
        if (postExists.userId.toString() != req.user._id.toString() && postExists.userId._id.toString() != req.user._id.toString())
            throw new error_1.NotAuthriztionExpection("Check Authrizition");
        await this.postRepostory.update({ _id: id }, { content: updatePostDTO.content });
        return res.status(201).json({ message: "Updated Done", Success: true });
    };
    freezePost = async (req, res) => {
        const { id } = req.params;
        const postExists = await this.postRepostory.exists({ _id: id });
        if (!postExists)
            throw new error_1.NotFoundExpection("Post Not Found");
        if (postExists.userId.toString() != req.user._id.toString())
            throw new error_1.NotAuthriztionExpection("Check Authrizition");
        await this.postRepostory.update({ _id: id }, { isFreeze: true });
        return res.status(201).json({ message: "Done Freezed", Succsess: true });
    };
}
exports.default = new postService();
