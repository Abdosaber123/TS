"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chat_ripository_1 = require("../../DB/chat/chat.ripository");
class ChatService {
    chatRipository = new chat_ripository_1.ChatRipository();
    getChat = async (req, res) => {
        const { userId } = req.params;
        const loginUser = req.user._id;
        const chat = await this.chatRipository.getOne({
            users: { $all: [userId, loginUser] }
        }, {}, { populate: [
                { path: "message" }
            ] });
        return res.status(201).json({ message: "done", success: true, data: { chat } });
    };
}
exports.default = new ChatService();
