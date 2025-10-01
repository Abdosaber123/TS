import { IPost } from "../../utils/common/interface";
import { AbstractReporistory } from "../abstract.reporesoritory";
import { Post } from "./post.model";

export class postRipository extends AbstractReporistory<IPost> {
    constructor(){
        super(Post)
    }
}