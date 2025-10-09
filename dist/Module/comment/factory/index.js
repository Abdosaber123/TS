"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryComment = void 0;
const utlis_1 = require("../utlis");
class FactoryComment {
    createComment(creatComment, post, user, comment) {
        const newComment = new utlis_1.Comment();
        newComment.content = creatComment.content;
        newComment.postId = post._id || comment.postId;
        newComment.userId = user._id;
        newComment.reaction = [];
        newComment.parentId = comment?._id;
        return newComment;
    }
}
exports.FactoryComment = FactoryComment;
