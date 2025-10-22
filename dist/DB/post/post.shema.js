"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const comment_model_1 = require("../comment/comment.model");
const reaction_schema_1 = require("../reaction/reaction.schema");
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
    reaction: [reaction_schema_1.reactionSchema],
    isFreeze: { type: Boolean, default: false }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.postSchema.virtual("comments", {
    localField: "_id",
    foreignField: "postId",
    ref: "Comment"
});
exports.postSchema.pre("deleteOne", async function (next) {
    // const filter = typeof this.getFilter =='function'? this.getFilter():{}
    const filter = typeof this.getFilter == 'function' ? this.getFilter() : {};
    await comment_model_1.Comment.deleteMany({ postId: filter._id });
    next();
});
