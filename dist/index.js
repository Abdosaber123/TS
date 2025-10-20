"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const console_1 = require("console");
const express_1 = __importDefault(require("express"));
const app_controller_1 = require("./app.controller");
const dotenv_1 = require("dotenv");
const local_config_1 = require("./config/env/local.config");
const socket_io_1 = require("./socket.io");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
(0, app_controller_1.bootsrap)(app, express_1.default);
const port = local_config_1.devConfig.DB_PORT;
const server = app.listen(port, () => {
    (0, console_1.log)("server is running on port ", port);
});
(0, socket_io_1.initSocket)(server);
