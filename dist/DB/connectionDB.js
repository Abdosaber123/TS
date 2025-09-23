"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const local_config_1 = require("../config/env/local.config");
// import { devConfig } from './../../config/env/local.config';
const connectDB = async () => {
    await mongoose_1.default.connect(local_config_1.devConfig.DB_URL).then(() => {
        console.log("DB Connection Succssefuly");
    }).catch((err) => {
        console.log("FAIL to connect", err);
    });
};
exports.connectDB = connectDB;
