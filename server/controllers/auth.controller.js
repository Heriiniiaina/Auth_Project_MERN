import { registerSchema } from "../middlewares/validator.js"
import { User } from "../models/user.model.js"
import PasswordHelper from "../utils/password.helper.js"
import TokenHelper from "../utils/token.helper.js"

export const register = async (req,res,next)=>{
     const {email,password,username} = req.body
     if(!email || !password || !username)
        return res.status(400).json({
            message:"Please provide form"
        })
    try {
        const {error,value} = registerSchema.validate({email,password,username})
        if(error){
            throw error
        }
        const existUser = await User.findOne({email})
        if(existUser)
            return res.status(400).json({
                success:false,
                message:"Email is already used by another account"
            })

        const hashedPassword =await PasswordHelper.hashPassword(password)
        const newUser = new User({email,password:hashedPassword,username})
        await newUser.save()
        res.status(201).json({
            success:true,
            message:"User registered"
        })
    } catch (error) {
        return next(error)
    }
}

export const login = async (req,res,next)=>{
    const {email,password} = req.body
    if(!email ||  !password)
        return res.status(400).json({
            success:false,
            message:"Please fill out the form."
        })
    try {
        const user = await User.findOne({email})
        if(!user)
            return res.status(400).json({
                success:false,
                message:"There is no user with this email."
            })
        const isPasswordMatch = await PasswordHelper.comparePassword(password,user.password)
        if(!isPasswordMatch)
            return res.status(400).json({
                success:false,
                message:"Wrong password"
            })
        const token = await TokenHelper.generateToken(user)
        res.cookie("Authorization","Bearer " + token,
            {expires:new Date(Date.now() + 8* 3600000),secure:process.env.NODE_ENV=="production",httpOnly:process.env.NODE_ENV})
            .json({
                success:true,
                token,
                message:"Login successfull"
            })
    } catch (error) {
        return next(error)
    }
}

export const logout = async (req,res,next)=>{
    res.clearCookie("Authorization").status(200).json({
        success:true,
        message:"Logout successfull"
    })
}

export const sendValidationCode = async (req,res,next)=>{
    const {email} = req.body
    if(!email) return res.status(400).json({message:"Email not found"})
    try {
        const user = await User.findOne({email:email})
        if(!user)
            return res.status(400).json({
                success:false,
                message:"There is no user with this email."
        })
        if(user.verified)
            return res.status(400).json({
                success:false,
                message:"User already verified"
            })
        const verificationCode = Math.floor(Math.random() * 1000000).toString()
    } catch (error) {
        next(error)
    }
}
