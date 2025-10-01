"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devConfig = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.devConfig = {
    DB_URL: process.env.DB_URL,
    EMAIL_USER: process.env.EMAIL_USER,
    DB_PORT: process.env.DB_PORT,
    JWP_SECRET: process.env.JWP_SECRET
};
