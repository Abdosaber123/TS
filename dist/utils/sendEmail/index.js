"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const local_config_1 = require("../../config/env/local.config");
const sendEmail = async (mailOptin) => {
    const transport = nodemailer_1.default.createTransport({
        // host:"smtp.gmail.com",
        // port:587,
        service: "gmail",
        auth: {
            user: local_config_1.devConfig.EMAIL_USER,
            pass: "gngcqaiaagejlgrh"
        }
    });
    mailOptin.from = `Social App <${local_config_1.devConfig.EMAIL_USER}`;
    await transport.sendMail(mailOptin);
};
exports.sendEmail = sendEmail;
