"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verfyToken = exports.geralToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const local_config_1 = require("../../config/env/local.config");
const geralToken = ({ payload, sec = local_config_1.devConfig.JWP_SECRET, option }) => {
    return jsonwebtoken_1.default.sign(payload, sec, option);
};
exports.geralToken = geralToken;
const verfyToken = (token, sec = local_config_1.devConfig.JWP_SECRET) => {
    return jsonwebtoken_1.default.verify(token, sec);
};
exports.verfyToken = verfyToken;
