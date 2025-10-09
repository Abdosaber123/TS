import  nodemailer from "nodemailer"
import { devConfig } from "../../config/env/local.config"
import { MailOptions } from "nodemailer/lib/json-transport"
export const sendEmail = async (mailOptin:MailOptions)=>{
    const transport = nodemailer.createTransport({
        // host:"smtp.gmail.com",
        // port:587,
        service:"gmail",
        auth:{
            user:devConfig.EMAIL_USER,
            pass:"gngcqaiaagejlgrh"
        },
    })
    mailOptin.from = `Social App <${devConfig.EMAIL_USER}`

    await transport.sendMail(mailOptin)
}

