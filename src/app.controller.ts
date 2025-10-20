import type {Express, NextFunction, Request, Response} from "express"
import authRouter from "./Module/auth/auth.controller"
import postRouter from "./Module/post/post.controller"
import { connectDB } from "./DB/connectionDB"
import { AppError } from "./utils/error"
import routerUser from "./Module/user/user.controller"
import routerComment from "./Module/comment/comment.controller"
import routerChat from "./Module/chat/chat.controller"
import cors from "cors"
export function bootsrap(app:Express , express:any){
//     app.use(cors({
//   origin: "http://localhost:3000", // ده عنوان الـ frontend     lw h7t akrer mn linl ["link1" , "link 2"]
//   credentials: true, // لو بتستخدم cookies أو jwt في header
// }));
app.use(cors({origin:"*"}))
    app.use(express.json())
    app.use("/auth" , authRouter)
    app.use("/user" , routerUser)
    app.use("/post" , postRouter)
    app.use("/comment" , routerComment)
    app.use("/chat" , routerChat)
    app.use('/{*dummy}',(req , res , next)=>{
        return res.status(404).json({message:"Not Found URL"})
    })
    
    connectDB()
    app.use((err : AppError , req :Request , res :Response , next : NextFunction)=>{
        // if(err.message == "jwt must be provided"){
        //      res.json({message: "Go TO Login"})
             
        // }
        return res.status(err.statusCode || 500).json({message : err.message, Success: false , errorDetals : err.errorDetails } )
    })
}