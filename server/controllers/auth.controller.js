import { registerSchema } from "../middlewares/validator"

export const register = async (req,res)=>{
     const {email,password,username} = req.body
     if(!email || !password || !username)
        return res.status(400).json({
            message:"Please provide form"
        })
    try {
        const {error,value} = registerSchema.validate({email,password,username})
        if(error)
            return res.status(400).json({message:error.details[0].message})
    } catch (error) {
        
    }
}