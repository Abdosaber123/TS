import { Socket } from "socket.io";
import { verfyToken } from "../../utils/token";
import { UserRepository } from "../../DB/model/userModel/user.reporistory";
import { NotFoundExpection } from "../../utils/error";

export const socektAuth = async (socket: Socket, next: Function) => {
    try {
        const { token } = socket.handshake.auth
        const { _id } = verfyToken(token)
        const userRiposotory = new UserRepository()
        const user = await userRiposotory.exists({ _id })
        if (!user) throw new NotFoundExpection("user not found")
        socket.data.user = user
        next()
    } catch (error) {
        next(error)
    }

}