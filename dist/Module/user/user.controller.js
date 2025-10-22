"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_service_js_1 = __importDefault(require("./user.service.js"));
const authViryFy_js_1 = require("../../Middleware/authViryFy.js");
const router = (0, express_1.Router)();
router.get("/profile/:id", user_service_js_1.default.getProfile);
router.post("/update-password", (0, authViryFy_js_1.isAuthenticated)(), user_service_js_1.default.updatePassowrd);
router.post("/updateInfo", (0, authViryFy_js_1.isAuthenticated)(), user_service_js_1.default.updateInfo);
router.post("/send-request/:friendId", (0, authViryFy_js_1.isAuthenticated)(), user_service_js_1.default.addRequest);
router.put("/accept-request/:friendId", (0, authViryFy_js_1.isAuthenticated)(), user_service_js_1.default.acceptRequest);
router.put("/reject-request/:friendId", (0, authViryFy_js_1.isAuthenticated)(), user_service_js_1.default.rejectRequest);
router.put("/delete-friend/:friendId", (0, authViryFy_js_1.isAuthenticated)(), user_service_js_1.default.deleteFriend);
router.put("/block-user/:friendId", (0, authViryFy_js_1.isAuthenticated)(), user_service_js_1.default.blockUser);
exports.default = router;
