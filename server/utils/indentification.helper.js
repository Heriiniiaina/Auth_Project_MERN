import TokenHelper from "./token.helper.js";

class Identification{
    static UserIdentification (req,res){
        let token;
        if(req.headers.client=="not-browse"){
            token = req.headers.authorization
        }
        else token = req.cookie["Authorization"]
        if(!token)
           return res.status(403).json({
                success:false,
                message:"Unauthorized"
            })
        try {
            const userToken = token.split(" ")[1]
            const isToken = TokenHelper.verifiedToken(userToken)
        } catch (error) {
            
        }
    }
}