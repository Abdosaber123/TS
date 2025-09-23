import mongoose from "mongoose";
import { devConfig } from "../config/env/local.config";
// import { devConfig } from './../../config/env/local.config';
export const connectDB = async ()=>{
    await mongoose.connect(devConfig.DB_URL as string).then(()=>{
        console.log("DB Connection Succssefuly");
        
    }).catch((err)=>{
        console.log("FAIL to connect" , err);
        
    })
}