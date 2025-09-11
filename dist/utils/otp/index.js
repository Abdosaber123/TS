"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expirteOtp = exports.generateOtp = void 0;
const generateOtp = () => {
    return Math.floor(Math.random() * 90000 + 10000);
};
exports.generateOtp = generateOtp;
const expirteOtp = (time) => {
    return Date.now() + time;
};
exports.expirteOtp = expirteOtp;
