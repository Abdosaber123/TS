"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verfyToken = exports.geralToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const geralToken = ({ payload, sec = "adfadfadfasdasdasdasdafadf", option }) => {
    return jsonwebtoken_1.default.sign(payload, sec, option);
};
exports.geralToken = geralToken;
const verfyToken = ({ token, sec = "adfadfadfasdasdasdasdafadf" }) => {
    return jsonwebtoken_1.default.verify(token, sec);
};
exports.verfyToken = verfyToken;
