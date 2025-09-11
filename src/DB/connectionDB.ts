import mongoose from "mongoose";
export const connectDB = async ()=>{
    await mongoose.connect(process.env.DB_URL as string).then(()=>{
        console.log("DB Connection Succssefuly");
        
    }).catch((err)=>{
        console.log("FAIL to connect" , err);
        
    })
}