import { registerSchema } from "../middlewares/validator.js"
import { User } from "../models/user.model.js"
import PasswordHelper from "../utils/password.helper.js"

export const register = async (req,res)=>{
     const {email,password,username} = req.body
     if(!email || !password || !username)
        return res.status(400).json({
            message:"Please provide form"
        })
    try {
        const {error,value} = registerSchema.validate({email,password,username})
        if(error){
            console.log(error.name)
            return res.status(400).json({message:error.details[0].message})

        }
        const hashedPassword =await PasswordHelper.hashPassword(password)
        const newUser = new User({email,password:hashedPassword,username})
        await newUser.save()
        res.status(201).json({
            success:true,
            message:"User registered"
        })
    } catch (error) {
        console.log(error)
    }
}