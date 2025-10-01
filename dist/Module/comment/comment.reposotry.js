"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRiposotry = void 0;
const abstract_reporesoritory_1 = require("../../DB/abstract.reporesoritory");
const comment_model_1 = require("./comment.model");
class CommentRiposotry extends abstract_reporesoritory_1.AbstractReporistory {
    constructor() {
        super(comment_model_1.Comment);
    }
}
exports.CommentRiposotry = CommentRiposotry;
