export const generateOtp =()=>{
    return Math.floor(Math.random() * 90000 + 10000)
}
export const expirteOtp = (time:number)=>{
    return Date.now() + time
}