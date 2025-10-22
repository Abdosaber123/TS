import { NextFunction, Request, Response } from "express";
import { verfyToken } from "../utils/token";
import { UserRepository } from "../DB/model/userModel/user.reporistory";
import { NotFoundExpection } from "../utils/error";

export const isAuthenticatedGraph = async (context: any) => {

  const token = context.token
  const { _id } = verfyToken(token)
  const userRepository = new UserRepository()
  const user = await userRepository.exists({ _id }, {}, {
    populate: [
      { path: "friend", select: "fullName firstName lastName" }
    ]
  })
  if (!user) throw new NotFoundExpection("user Not Found")
  context.user = user



}