import { IChat } from "../../utils/common/interface";
import { AbstractReporistory } from "../abstract.reporesoritory";
import { Chat } from "./chat.model";


export class ChatRipository extends AbstractReporistory<IChat>{
    constructor(){
        super(Chat)
    }
}