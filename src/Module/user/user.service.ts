import type { NextFunction, Request, Response } from "express"
import { UserRepository } from "../../DB/model/userModel/user.reporistory"
import { NotAuthriztionExpection, NotFoundExpection } from "../../utils/error"
import { log } from "console"
import { UpdateInfoDTO, UpdatePasswordDTO } from "./user.dto"
import { comparePassword, hashPassword } from "../../utils/hashpassword"


class userService {

    private readonly userRepository = new UserRepository()
    public getProfile = async (req: Request, res: Response, next: NextFunction) => {
        const user = await this.userRepository.getOne({ _id: req.params.id } ,{} , {populate:[
            {path:"friend" , select:"fullName firstName lastName"}
        ]})
        // log(req.params.id)
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
        await this.userRepository.update({ email: update.email }, { firstName: update.firstName, lastName: update.lastName })
        return res.status(201).json({ message: "Success Change", Success: true })


    }
    public addRequest = async (req: Request, res: Response, next: NextFunction) => {
        const { friendId } = req.params
        const friend = await this.userRepository.exists({ _id: friendId }) // isDeleted : false
        if (!friend)
            return next(new Error("user not found", { cause: 400 }))
        const user = req.user
        const isFriend = user.friend.map(String).includes(friendId)
        if (isFriend) {
            return next(new Error("is Already Friend", { cause: 400 }))
        }
        const haveRequest = user.friendRequest.map(String).includes(friendId)
        if (haveRequest) {
            return next(new Error("is Already send request", { cause: 400 }))
        }
        await this.userRepository.update({ _id: friendId }, {
            $addToSet: { friendRequest: req.user._id } // addTo set hya hya zy el $push bs el fr2 enha m4 bt3ml lel klam copy
        })
        return res.status(200).json({ message: "Success send Request" })
    }
    public acceptRequest = async (req: Request, res: Response, next: NextFunction) => {
        const { friendId } = req.params
        const promis = Promise.all([
            this.userRepository.update({ _id: req.user._id }, {
                $pull: { friendRequest: friendId },
                $addToSet: { friend: friendId }
            }),
            this.userRepository.update({ _id: friendId }, {
                $addToSet: { friend: req.user._id }
            })
        ])
        await promis
        return res.status(201).json({message:"Accepted" , Success:true})
    }
    public rejectRequest = async (req: Request, res: Response, next: NextFunction) => {
        const { friendId } = req.params
        const promis = Promise.all([
            this.userRepository.update({ _id: req.user._id }, {
                $pull: { friendRequest: friendId }
            }),
            this.userRepository.update({ _id: friendId }, {
                $pull: { friendRequest: req.user._id }
            })
        ])
        await promis
        return res.status(201).json({message:"Rejected" , Success:true})
    }
    public deleteFriend = async (req: Request, res: Response, next: NextFunction) => {
        const { friendId } = req.params
        const promis = Promise.all([
            this.userRepository.update({ _id: req.user._id }, {
                $pull: { friend: friendId }
            }),
            this.userRepository.update({ _id: friendId }, {
                $pull: { friend: req.user._id }
            })
        ])
        await promis
        return res.status(201).json({message:"Deleted" , Success:true})
    }
    public blockUser = async (req: Request, res: Response, next: NextFunction) => {
        const { friendId } = req.params
        const promis = Promise.all([
            this.userRepository.update({ _id: req.user._id }, {
                $addToSet: { block: friendId }
            }),
            this.userRepository.update({ _id: friendId }, {
                $addToSet: { block: req.user._id }
            })
        ])
        await promis
        return res.status(201).json({message:"Blocked" , Success:true})
    }


}
export default new userService