
const dotenv = require('dotenv').config()

const nodemailer = require('nodemailer')
const ErrorResponse = require('../../utils/ErrorResponse')



const transporter = nodemailer.createTransport({
    service:'gmail',   
    host:'smtp.gmail.com',
    port:25
,    secure:true, 
    auth:{
        user:process.env.SERVICE_MAIL_EMAIL,
        pass:process.env.SERVICE_MAIL_PASS,
    },
})

const sendForgetPasswordToken = async (email,resetToken,origin) => {
    const url = `${origin}/password/change?token=${resetToken}`
    try{
    const response = await transporter.sendMail({

            from:process.env.SERVICE_MAIL_EMAIL,
            to:email,
            subject:'Eku Eku Reset Password',
            text:`
                Reset Password Link : ${url}
            `,
            html:`<p> You can use this link to reset password <a href=${url}> Goto Link </a>>`,
        })
        if(response.accepted){
            return response
        }
    }
    catch(err){ 
        throw new ErrorResponse('Failed to Send Email!',500)
    }
    

}


exports.sendForgetPasswordToken = sendForgetPasswordToken
exports.transporter = transporter

