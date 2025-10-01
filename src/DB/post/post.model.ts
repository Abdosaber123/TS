import { model } from "mongoose";
import { postSchema } from "./post.shema";

export const Post = model("Post",postSchema)