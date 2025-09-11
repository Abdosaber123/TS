"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userShema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../../utils/common/enum");
exports.userShema = new mongoose_1.Schema({
    firstName: {
        type: String,
        minLength: 3,
        maxlength: 20,
        trim: true
    },
    lastName: {
        type: String,
        minLength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function () {
            if (this.userAgent == enum_1.USER_AGENT.google) {
                return false;
            }
            else {
                return true;
            }
        },
        trim: true
    },
    credentialUpdateAt: {
        type: Date
    },
    phoneNumber: String,
    role: {
        type: String,
        enum: enum_1.SYS_ROLE,
        default: enum_1.SYS_ROLE.user
    },
    gender: {
        type: String,
        enum: enum_1.GENDER,
        default: enum_1.GENDER.male
    },
    userAgent: {
        type: String,
        enum: enum_1.USER_AGENT,
        default: enum_1.USER_AGENT.local
    },
    isVerfy: { type: Boolean, default: false },
    otp: { type: String },
    expireOtp: { type: Date }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.userShema.virtual("fullName").get(function () {
    return this.firstName + " " + this.lastName;
}).set(function (value) {
    const [fName, lName] = value.split(" ");
    this.firstName = fName;
    this.lastName = lName;
});
