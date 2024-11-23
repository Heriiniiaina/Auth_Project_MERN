import jwt from "jsonwebtoken"
import crypto from "crypto"
class TokenHelper{
    static async generateToken(user){
        const payload ={
            userId:user._id,
            email:user.email,
            verified:user.verified
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:"8h"})
        return token
    }
    static  generateResetPasswordToken(){
        const result =  crypto.randomBytes(20).toString("hex")
        return result
    }

    static verifiedToken(token){
        const isToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
        return isToken
    }
}
export default TokenHelper