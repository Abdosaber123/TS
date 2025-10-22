import { NextFunction, Request, Response } from "express"
import { ZodType } from "zod"
import { BadRequestExpection } from "../utils/error"

export const isValidGraph = (schema: ZodType, args: any) => {
    const reselt = schema.safeParse(args)
    if (reselt.success == false) {
        let errorMsg = reselt.error.issues.map((issue) => ({
            path: issue.path[0],
            message: issue.message
        }))

        throw new BadRequestExpection(JSON.stringify(errorMsg) , errorMsg)
    }


}