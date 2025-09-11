export class AppError extends Error {
    constructor(message:string , public statusCode:number){
        super(message)
    }
}
export class ConflictExpection extends AppError {
    constructor(message:string){
        super(message , 409)
    }
}
export class NotFoundExpection extends AppError {
    constructor(message:string){
        super(message , 404)
    }
}
export class NotAuthriztionExpection extends AppError {
    constructor(message:string){
        super(message , 401)
    }
}
export class BadRequestExpection extends AppError {
    constructor(message:string){
        super(message , 400)
    }
}