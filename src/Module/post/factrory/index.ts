import { IUser } from "../../../utils/common/interface";
import { Post } from "../emtity";
import { createPostDTO } from "../post.dto";


export class PostFactory {
    createPost(createPostDTO :createPostDTO , user:IUser){
        const newPost = new Post 
        newPost.content = createPostDTO.content
        newPost.userId = user._id
        newPost.attashment = []
        newPost.reaction = []
        return newPost
    }
}