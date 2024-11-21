import nodemail from "nodemailer"

export const transport = nodemail.createTransport({
    service:"gmail",
    auth:{
        user:process.env.NODE_CODE_SENDING_EMAIL_ADRESS,
        pass:process.env.NODE_CODE_SENDING_EMAIL_PASS

    }
})