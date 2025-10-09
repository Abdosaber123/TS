"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionSchema = void 0;
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
