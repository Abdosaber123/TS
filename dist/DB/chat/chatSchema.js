"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chateSchema = void 0;
const mongoose_1 = require("mongoose");
exports.chateSchema = new mongoose_1.Schema({
    users: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    message: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Message" }]
}, { timestamps: true });
