import { Request, Response } from "express"
import { ChatRipository } from "../../DB/chat/chat.ripository"

class ChatService {
    private readonly  chatRipository = new ChatRipository()
    getChat = async (req:Request , res:Response) => {
        const {userId} = req.params
        const loginUser = req.user._id
        const chat = await this.chatRipository.getOne({
            users:{$all:[userId , loginUser]}
        },{},{populate:[
            {path:"message"}
        ]})
        return res.status(201).json({message:"done" , success:true , data:{chat}})
     }
}
export default new ChatService()