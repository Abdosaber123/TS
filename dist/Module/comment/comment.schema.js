"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const mongoose_1 = require("mongoose");
const post_shema_1 = require("../../DB/post/post.shema");
exports.commentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    parentId: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Comment",
            required: true
        }],
    content: {
        type: String
    },
    attachment: {},
    reaction: [post_shema_1.reactionSchema]
}, { timestamps: true });
