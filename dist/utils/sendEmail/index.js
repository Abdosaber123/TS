"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = async ({ to, subject, html }) => {
    const transport = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: "blaza.cf0@gmail.com",
            pass: "gngcqaiaagejlgrh"
        }
    });
    await transport.sendMail({
        from: "Saraha <blaza.cf0@gmail.com",
        to,
        subject,
        html
    });
};
exports.sendEmail = sendEmail;
