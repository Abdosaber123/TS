import { NextFunction, Request, Response } from "express";
import { verfyToken } from "../utils/token";
import { UserRepository } from "../DB/model/userModel/user.reporistory";
import { NotFoundExpection } from "../utils/error";

export const isAuthenticated = ()=>{
    return async (req:Request , res:Response , next:NextFunction)=>{
    const token = req.headers.authorization as string
  const {_id} = verfyToken(token)
  const userRepository = new UserRepository()
 const user = await userRepository.exists({_id})
 if(!user) throw new NotFoundExpection("user Not Found")
    req.user = user
  next()

}
}