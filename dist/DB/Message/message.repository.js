"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRipository = void 0;
const abstract_reporesoritory_1 = require("../abstract.reporesoritory");
const message_model_1 = require("./message.model");
class MessageRipository extends abstract_reporesoritory_1.AbstractReporistory {
    constructor() {
        super(message_model_1.Message);
    }
}
exports.MessageRipository = MessageRipository;
