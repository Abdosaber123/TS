"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const postRiposotry_1 = require("../../DB/post/postRiposotry");
const error_1 = require("../../utils/error");
const comment_reposotry_1 = require("../../DB/comment/comment.reposotry");
const factory_1 = require("./factory");
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
}
exports.default = new CommentService;
