import  nodemailer from "nodemailer"
export const sendEmail = async ({to, subject, html}: {to: string, subject: string, html: string})=>{
    const transport = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        auth:{
            user:"blaza.cf0@gmail.com",
            pass:"gngcqaiaagejlgrh"
        }
    })
    await transport.sendMail({
        from:"Saraha <blaza.cf0@gmail.com",
        to,
        subject,
        html
    })
}

