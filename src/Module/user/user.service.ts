import type { NextFunction, Request, Response } from "express"
import { UserRepository } from "../../DB/model/userModel/user.reporistory"
import { NotAuthriztionExpection, NotFoundExpection } from "../../utils/error"
import { log } from "console"
import { UpdateInfoDTO, UpdatePasswordDTO } from "./user.dto"
import { comparePassword, hashPassword } from "../../utils/hashpassword"


class userService {

    private readonly userRepository = new UserRepository()
    public getProfile = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.userRepository.getOne({ _id: req.params.id })
        log(req.params.id)
        if (!user) {
            throw new NotFoundExpection("user Not Found")
        }
        res.status(201).json({ message: "done", success: true, data: user })
    }
    public updatePassowrd = async (req: Request, res: Response) => {
        const updatePasswordDto: UpdatePasswordDTO = req.body
        const emailExists = await this.userRepository.exists({ email: updatePasswordDto.email })
        if (!emailExists) throw new NotFoundExpection("user Not Found")
        const match = comparePassword(updatePasswordDto.oldPassword, emailExists.password)
        if (!match) { throw new NotAuthriztionExpection("user Not Found") }
        emailExists.password = hashPassword(updatePasswordDto.newPassword)
        await emailExists.save()
        return res.status(201).json({ message: "updateSuccessfuly", Succsess: true })
        //         await this.userRepository.update({ email: updatePasswordDto.email }, { password:newPassword})
    }
    public updateInfo = async (req: Request, res: Response) => {
        const update: UpdateInfoDTO = req.body
        const emailExists = await this.userRepository.exists({ email: update.email })
        if (!emailExists) throw new NotFoundExpection("user Not Found")
        const match = comparePassword(update.password, emailExists.password)
        if (!match) { throw new NotAuthriztionExpection("check your password") }
        await this.userRepository.update({email:update.email},{firstName:update.firstName , lastName:update.lastName})
        return res.status(201).json({message:"Success Change" , Success:true})


    }

}
export default new userService