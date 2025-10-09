"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootsrap = bootsrap;
const auth_controller_1 = __importDefault(require("./Module/auth/auth.controller"));
const post_controller_1 = __importDefault(require("./Module/post/post.controller"));
const connectionDB_1 = require("./DB/connectionDB");
const user_controller_1 = __importDefault(require("./Module/user/user.controller"));
const comment_controller_1 = __importDefault(require("./Module/comment/comment.controller"));
const cors_1 = __importDefault(require("cors"));
function bootsrap(app, express) {
    app.use((0, cors_1.default)({
        origin: "http://localhost:5173", // ده عنوان الـ frontend
        credentials: true, // لو بتستخدم cookies أو jwt في header
    }));
    app.use(express.json());
    app.use("/auth", auth_controller_1.default);
    app.use("/user", user_controller_1.default);
    app.use("/post", post_controller_1.default);
    app.use("/comment", comment_controller_1.default);
    app.use('/{*dummy}', (req, res, next) => {
        return res.status(404).json({ message: "Not Found URL" });
    });
    (0, connectionDB_1.connectDB)();
    app.use((err, req, res, next) => {
        // if(err.message == "jwt must be provided"){
        //      res.json({message: "Go TO Login"})
        // }
        return res.status(err.statusCode || 500).json({ message: err.message, Success: false, errorDetals: err.errorDetails });
    });
}
