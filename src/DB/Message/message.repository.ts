import { IMessage } from "../../utils/common/interface";
import { AbstractReporistory } from "../abstract.reporesoritory";
import { Message } from "./message.model";

export class MessageRipository extends AbstractReporistory<IMessage>{
    constructor(){
        super(Message)
    }
}