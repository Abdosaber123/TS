"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootsrap = bootsrap;
const auth_controller_1 = __importDefault(require("./Module/auth/auth.controller"));
const connectionDB_1 = require("./DB/connectionDB");
function bootsrap(app, express) {
    app.use(express.json());
    app.use("/auth", auth_controller_1.default);
    app.use('/{*dummy}', (req, res, next) => {
        return res.status(404).json({ message: "Not Found" });
    });
    (0, connectionDB_1.connectDB)();
}
