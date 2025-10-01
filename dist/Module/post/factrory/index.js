"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFactory = void 0;
const emtity_1 = require("../emtity");
class PostFactory {
    createPost(createPostDTO, user) {
        const newPost = new emtity_1.Post;
        newPost.content = createPostDTO.content;
        newPost.userId = user._id;
        newPost.attashment = [];
        newPost.reaction = [];
        return newPost;
    }
}
exports.PostFactory = PostFactory;
