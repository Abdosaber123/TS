import { IAttachment } from "../../utils/common/interface";

export interface commentDTO {
    content:string,
    attachment?:IAttachment[]
}