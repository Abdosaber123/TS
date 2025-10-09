import { Schema } from "mongoose";
import { IUser } from "../../../utils/common/interface";
import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { sendEmail } from "../../../utils/sendEmail";

export const userShema = new Schema<IUser>({
    firstName:{
        type:String,
        minLength:3,
        maxlength:20,
        trim:true
    },
    lastName:{
         type:String,
        minLength:3,
        maxlength:20,
       
        trim:true
    }
    ,
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:function(){
            if(this.userAgent == USER_AGENT.google ){
                return false
            }else{
                return true
            }
        },
        trim:true
    },
    credentialUpdateAt:{
        type:Date
    },
    phoneNumber:String,
    role:{
        type:String,
        enum:SYS_ROLE,
        default:SYS_ROLE.user
    },
    gender:{
        type:String,
        enum:GENDER,
        default:GENDER.male
    },
    userAgent:{
        type:String,
        enum:USER_AGENT,
        default:USER_AGENT.local
    },
    isVerfy:{type:Boolean , default:false}
    ,
    otp:{type:String},
    expireOtp:{type:Date}
},{timestamps :true , toJSON:{virtuals:true} , toObject:{virtuals:true}})
userShema.virtual("fullName").get(function () {
return this.firstName + " " + this.lastName
}).set(function(value:string){
    const [fName , lName] = value.split(" ")
    this.firstName = fName as string
    this.lastName = lName as string
})
userShema.pre("save", async function (next){
    if(this.userAgent !=USER_AGENT.google && this["isNew"] ==true){
   await sendEmail({to : this.email , subject :"Confirm Verfy Your Accound" , html : `<h1>Verfy your Acoount is otp ${this.otp} 📩</h1>`})
   next()
   }
})
