"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat = void 0;
const mongoose_1 = require("mongoose");
const chatSchema_1 = require("./chatSchema");
exports.Chat = (0, mongoose_1.model)("Chat", chatSchema_1.chateSchema);
