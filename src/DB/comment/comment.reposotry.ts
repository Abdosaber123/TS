import { IComment } from "../../utils/common/interface";
import { AbstractReporistory } from "../abstract.reporesoritory";
import { Comment } from "./comment.model";

export class CommentRiposotry extends AbstractReporistory <IComment> {
    constructor(){
        super(Comment)
    }
}