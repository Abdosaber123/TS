"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const enum_1 = require("../../utils/common/enum");
exports.registerValidation = zod_1.default.object({
    fullName: zod_1.default.string().min(2).max(50),
    email: zod_1.default.email(),
    password: zod_1.default.string(),
    phoneNumber: zod_1.default.string(),
    gender: zod_1.default.enum(enum_1.GENDER)
});
