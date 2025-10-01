"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRipository = void 0;
const abstract_reporesoritory_1 = require("../abstract.reporesoritory");
const post_model_1 = require("./post.model");
class postRipository extends abstract_reporesoritory_1.AbstractReporistory {
    constructor() {
        super(post_model_1.Post);
    }
}
exports.postRipository = postRipository;
