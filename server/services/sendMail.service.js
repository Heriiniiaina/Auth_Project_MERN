import nodemail from "nodemailer"
import dotenv from "dotenv"

dotenv.config()
export const transport = nodemail.createTransport({
    service:"gmail",
    auth:{
        user:process.env.NODE_CODE_SENDING_EMAIL_ADRESS,
        pass:process.env.NODE_CODE_SENDING_EMAIL_PASS

    }
})