"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
const middelware_1 = require("./middelware");
const message_repository_1 = require("../DB/Message/message.repository");
const chat_ripository_1 = require("../DB/chat/chat.ripository");
const connectedUser = new Map();
let currentName = new Map();
const initSocket = (server) => {
    const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
    io.use(middelware_1.socektAuth);
    io.on("connection", (socket) => {
        connectedUser.set(socket.data.user.id, socket.id);
        const users = io.of("/").sockets;
        const userMap = new Map();
        for (const [, currentSocket] of users) {
            const user = currentSocket.data.user;
            if (!user)
                continue;
            userMap.set(user.id, user.fullName); // Map يمنع التكرار
        }
        const onlineUsers = Array.from(userMap.values()).map(name => ({ username: name }));
        socket.emit("users", onlineUsers);
        socket.emit("user", socket.data.user.id);
        socket.on("send_message", async (data) => {
            const destSocket = connectedUser.get(data.destId);
            socket.emit("successMessage", data);
            io.to(destSocket).emit("reciverMessage", data);
            //message
            const sender = socket.data.user._id;
            const message = new message_repository_1.MessageRipository();
            const createdMessage = await message.create({ sender, content: data.message });
            const chatrepo = new chat_ripository_1.ChatRipository();
            const chat = await chatrepo.getOne({ users: { $all: [data.destId, sender] } });
            if (!chat) {
                await chatrepo.create({
                    users: [data.destId, sender],
                    message: [createdMessage._id]
                });
            }
            else {
                await chatrepo.update({ _id: chat._id }, { $push: { message: createdMessage._id } });
            }
        });
    });
};
exports.initSocket = initSocket;
