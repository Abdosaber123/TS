import { Server, Socket } from "socket.io"
import { Server as httpServer } from "node:http"
import { socektAuth } from "./middelware"
import { MessageRipository } from "../DB/Message/message.repository"
import { ChatRipository } from "../DB/chat/chat.ripository"
import { ObjectId } from "mongoose"
const connectedUser = new Map<string, string>()
let currentName = new Map<string, string>()
export const initSocket = (server: httpServer) => {
    const io = new Server(server, { cors: { origin: "*" } })
    io.use(socektAuth)
    io.on("connection", (socket: Socket) => {
        connectedUser.set(socket.data.user.id, socket.id)
        const users = io.of("/").sockets;
        const userMap = new Map<string, string>();
        for (const [, currentSocket] of users) {
            const user = currentSocket.data.user;
            if (!user) continue;
            userMap.set(user.id, user.fullName); // Map يمنع التكرار
        }
        const onlineUsers = Array.from(userMap.values()).map(name => ({ username: name }));
        socket.emit("users", onlineUsers)
        socket.emit("user", socket.data.user.id)
        socket.on("send_message", async (data: { message: string, destId: string }) => {
            const destSocket = connectedUser.get(data.destId)
            socket.emit("successMessage", data);
            io.to(destSocket).emit("reciverMessage", data)
            //message
            const sender = socket.data.user._id
            const message = new MessageRipository()
            const createdMessage = await message.create({ sender, content: data.message })
            const chatrepo = new ChatRipository()
            const chat = await chatrepo.getOne({ users: { $all: [data.destId, sender] } })
            if (!chat) {
                await chatrepo.create({
                    users: [data.destId, sender],
                    message:[createdMessage._id as unknown as ObjectId]
                })
            }else{
                await chatrepo.update({_id:chat._id},{$push:{message:createdMessage._id}})
            }
        })

    })
}