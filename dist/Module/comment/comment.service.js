"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postRiposotry_1 = require("../../DB/post/postRiposotry");
const error_1 = require("../../utils/error");
const comment_reposotry_1 = require("../../DB/comment/comment.reposotry");
const factory_1 = require("./factory");
const reaction_provider_1 = require("../../utils/provider/reaction.provider");
class CommentService {
    postRiposotry = new postRiposotry_1.postRipository();
    commentRiposotry = new comment_reposotry_1.CommentRiposotry();
    commentFactory = new factory_1.FactoryComment();
    create = async (req, res) => {
        const { postId, id } = req.params;
        console.log(postId, id);
        const commentDTO = req.body;
        const postExists = await this.postRiposotry.exists({ _id: postId });
        if (!postExists)
            throw new error_1.NotFoundExpection("Post Not Found");
        let commentExists;
        if (id) {
            commentExists = await this.commentRiposotry.exists({ _id: id });
            if (!commentExists)
                throw new error_1.NotFoundExpection("Post Not Found");
        }
        const comment = this.commentFactory.createComment(commentDTO, postExists, req.user, commentExists);
        const createdComment = await this.commentRiposotry.create(comment);
        return res.status(201).json({ message: "create comment Succsess", Success: true, data: { createdComment } });
    };
    getSpectific = async (req, res) => {
        const { id } = req.params;
        const commentExists = await this.commentRiposotry.exists({ _id: id }, {}, {
            populate: [
                // { path: "replaies" },
                { path: "postId", select: "userId" }
            ]
        });
        if (!commentExists)
            throw new error_1.NotFoundExpection("Post Not Found");
        return res.status(201).json({ message: "done", succsess: true, data: { commentExists } });
    };
    deleteComment = async (req, res) => {
        const { id } = req.params;
        const commentExists = await this.commentRiposotry.exists({ _id: id });
        if (commentExists.userId.toString() != req.user._id.toString() && commentExists.postId.userId.toString() != req.user._id.toString())
            throw new error_1.NotAuthriztionExpection("Check Authrizition");
        if (!commentExists)
            throw new error_1.NotFoundExpection("post Not Found");
        this.commentRiposotry.delte({ _id: id });
        return res.status(201).json({ Message: "Deleted Done", Success: true });
    };
    addReaction = async (req, res) => {
        const { id } = req.params;
        const { reaction } = req.body;
        const userId = req.user.id;
        await (0, reaction_provider_1.addReactionProvider)(this.commentRiposotry, id, userId, reaction);
        return res.sendStatus(204);
    };
    updateComment = async (req, res) => {
        const { id } = req.params;
        const updateCommentDTO = req.body;
        const commentExists = await this.commentRiposotry.exists({ _id: id });
        if (!commentExists)
            throw new error_1.NotFoundExpection("post Not Found");
        if (commentExists.userId.toString() != req.user._id.toString() && commentExists.postId.userId.toString() != req.user._id.toString())
            throw new error_1.NotAuthriztionExpection("Check Authrizition");
        await this.commentRiposotry.update({ _id: id }, { content: updateCommentDTO.content });
        return res.status(201).json({ message: "Updated Done", Success: true });
    };
    freezeComment = async (req, res) => {
        const { id } = req.params;
        const commentExists = await this.commentRiposotry.exists({ _id: id });
        if (!commentExists)
            throw new error_1.NotFoundExpection("post Not Found");
        if (commentExists.userId.toString() != req.user._id.toString() && commentExists.postId.userId.toString() != req.user._id.toString())
            throw new error_1.NotAuthriztionExpection("Check Authrizition");
        await this.commentRiposotry.update({ _id: id }, { isFreeze: true });
        return res.status(201).json({ message: "Freezed Done", Success: true });
    };
}
exports.default = new CommentService;
