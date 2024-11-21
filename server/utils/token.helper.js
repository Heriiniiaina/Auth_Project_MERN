import jwt from "jsonwebtoken"

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
}
export default TokenHelper