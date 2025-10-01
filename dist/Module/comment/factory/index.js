"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactoryComment = void 0;
const utlis_1 = require("../utlis");
class FactoryComment {
    createComment(creatComment, post, user, comment) {
        const newComment = new utlis_1.Comment();
        newComment.content = creatComment.content;
        newComment.postId = post._id;
        newComment.userId = user._id;
        newComment.reaction = [];
        comment ? newComment.parentId = comment.parentId : [];
        comment ? newComment.parentId.push(comment._id) : [];
        return newComment;
    }
}
exports.FactoryComment = FactoryComment;
