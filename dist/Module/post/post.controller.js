"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_service_1 = __importDefault(require("./post.service"));
const authViryFy_1 = require("../../Middleware/authViryFy");
const comment_controller_1 = __importDefault(require("../comment/comment.controller"));
const router = (0, express_1.Router)();
router.use("/:postId/comment", comment_controller_1.default);
router.post("/", (0, authViryFy_1.isAuthenticated)(), post_service_1.default.createPost);
router.patch("/:id", (0, authViryFy_1.isAuthenticated)(), post_service_1.default.addReaction);
router.get("/:id", post_service_1.default.getSpectafic);
router.delete("/:id", (0, authViryFy_1.isAuthenticated)(), post_service_1.default.deletePost);
exports.default = router;
