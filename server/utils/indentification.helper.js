import TokenHelper from "./token.helper.js";

class Identification{
    static UserIdentification (req,res,next){
        let token;
        if(req.headers.client=="not-browse"){
            token = req.headers.authorization
        }
        else token = req.cookies["Authorization"]
        if(!token)
           return res.status(403).json({
                success:false,
                message:"Unauthorized"
            })
        try {
            const userToken = token.split(" ")[1]
            const isToken = TokenHelper.verifiedToken(userToken)
            if(!isToken)
                return res.status(400).json({
                    success:false,
                    message:"Invalid token"
                })
            req.user = userToken
            next()
        } catch (error) {
            next(error)
        }
    }
}
export default Identification