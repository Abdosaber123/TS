import type { NextFunction, Request, Response } from "express"
import { UserRepository } from "../../DB/model/userModel/user.reporistory"
import { NotFoundExpection } from "../../utils/error"
import { log } from "console"

class userService {
    
    private readonly userRepository = new UserRepository()
    getProfile = async (req:Request , res:Response , next:NextFunction)=>{
        const user = await this.userRepository.getOne({_id:req.params.id})
        log(req.params.id)
        if(!user){
            throw new NotFoundExpection("user Not Found")
        }
        res.status(201).json({message:"done" , success:true , data:user})
    }
}
export default new userService