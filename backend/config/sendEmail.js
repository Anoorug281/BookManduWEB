import {Resend} from 'resend';
import dotenv from 'dotenv'
dotenv.config()

if(process.env.RESEND_API){
    console.log("Provide RESEND_API inside the .env file")
}

const resend = new RESEND(process.env.RESEND_API);

const sendEmail =- async ( {name,sendTo,subject,html})=>{
    try {
        const { data , error } = await resend.emails.send({
            from : 'BookMandu <bookmandu123@resend.dev>',
            to: sendTo,
            subject : subject,
            html : html
        })

        if(error){
            return console.error({ error })
        }
        return data
    } catch (error) {
        console.log(error)
    }
}

export default sendEmail