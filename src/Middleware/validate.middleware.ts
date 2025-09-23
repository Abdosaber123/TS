import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"
import { BadRequestExpection } from "../utils/error"

export const isValid = (schema: ZodType)=>{
    return (req : Request , res : Response , next : NextFunction)=>{
        let data = {...req.body , ...req.params , ...req.query}
        const reselt = schema.safeParse(data)
                if(reselt.success == false ){
                    let errorMsg = reselt.error.issues.map((issue)=>({
                        path: issue.path[0] ,
                        message: issue.message
                    }))
                    
                    throw new BadRequestExpection("Check Your Validation" ,errorMsg)
                }
                next()
    }
}