"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRipository = void 0;
const abstract_reporesoritory_1 = require("../abstract.reporesoritory");
const chat_model_1 = require("./chat.model");
class ChatRipository extends abstract_reporesoritory_1.AbstractReporistory {
    constructor() {
        super(chat_model_1.Chat);
    }
}
exports.ChatRipository = ChatRipository;
