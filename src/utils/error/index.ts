export class AppError extends Error {
    constructor(message:string , public statusCode:number , public errorDetails? : object[]){ // or Record<string , string>[] hya hya bs de b3rf key value
        super(message)
    }
}
export class ConflictExpection extends AppError {
    constructor(message:string , errorDetails? : object[]){
        super(message , 409 , errorDetails)
    }
}
export class NotFoundExpection extends AppError {
    constructor(message:string , errorDetails? : object[]){
        super(message , 404, errorDetails)
    }
}
export class NotAuthriztionExpection extends AppError {
    constructor(message:string ,  errorDetails? : object[]){
        super(message , 401 , errorDetails)
    }
}
export class BadRequestExpection extends AppError {
    constructor(message:string ,  errorDetails? : object[]){
        super(message , 400,errorDetails)
    }
}