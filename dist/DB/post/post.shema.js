"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = exports.reactionSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../utils/common/enum");
exports.reactionSchema = new mongoose_1.Schema({
    reaction: {
        type: Number,
        enum: enum_1.REACTION,
        default: enum_1.REACTION.like
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        require: true
    }
}, { timestamps: true });
exports.postSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    content: {
        type: String,
        // require:function (){
        //     if(this.attachments.length) return false
        //     return true
        // },
        required: true
    },
    reaction: [exports.reactionSchema]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.postSchema.virtual("comments", {
    localField: "_id",
    foreignField: "postId",
    ref: "Comment"
});
