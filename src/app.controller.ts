import type {Express} from "express"
import authRouter from "./Module/auth/auth.controller"
import { connectDB } from "./DB/connectionDB"
export function bootsrap(app:Express , express:any){
    app.use(express.json())
    app.use("/auth" , authRouter)
    app.use('/{*dummy}',(req , res , next)=>{
        return res.status(404).json({message:"Not Found"})
    })
    connectDB()
}