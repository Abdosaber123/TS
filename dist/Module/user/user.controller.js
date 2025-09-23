"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_js_1 = __importDefault(require("./user.service.js"));
const router = (0, express_1.Router)();
router.get("/profile/:id", user_service_js_1.default.getProfile);
exports.default = router;
