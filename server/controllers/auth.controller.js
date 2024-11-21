import { registerSchema } from "../middlewares/validator.js"
import { User } from "../models/user.model.js"
import { transport } from "../services/sendMail.service.js"
import PasswordHelper from "../utils/password.helper.js"
import TokenHelper from "../utils/token.helper.js"
import VerificationCodeService from "../utils/verificationCode.helper.js"

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
        let info = await transport.sendMail({
            from:process.env.NODE_CODE_SENDING_EMAIL_ADRESS,
            to:user.email,
            subject:"<h2> Verification code </h2>",
            html:"<h1>" + verificationCode + "</h1>"
        })

        if(info.accepted && info.accepted[0]==user.email){
            const hashedCode = VerificationCodeService.hmacProccess(verificationCode,process.env.HMAC_CODE_VERIFICATION_SECRET)
            user.verificationCode = hashedCode
            user.verificationCodeValidity = Date.now()

            await user.save()
           return res.status(200).json({
                success:true,
                message:"Code sent to " + user.email
            })
        }

        res.status(400).json({
            success:false,
            message:"Code not sent verify your email"
        })
    } catch (error) {
        next(error)
    }
}

export const verifyVerificationCode = async(req,res,next)=>{
    const {email,providedCode} = req.body
    if(!email || !providedCode)
        return res.status(400).json({
            success:true,
            message:"Please provide code"
        })
    try {
        const user = await User.findOne({email}).select("+verificationCode +verificationCodeValidity")
        
        if(!user)
            return res.status(404).json({
                success:false,
                message:"User not found"
            })

        if(user.verified)
            return res.status(400).json({
                success:false,
                message:"User is already verified"
            })

        if(!user.verificationCode || !user.verificationCodeValidity)
            return res.status(400).json({
                success:false,
                message:"Something wrong"
            })

        if(Date.now() - user.verificationCodeValidity > 5*60*1000)
            res.status(400).json({
                success:false,
                message:"code validity expire"
            })
        const hashedCode = VerificationCodeService.hmacProccess(providedCode,process.env.HMAC_CODE_VERIFICATION_SECRET)
        if(hashedCode===user.verificationCodeValidity){
            user.verified = true,
            user.verificationCode = undefined,
            user.verificationCodeValidity = undefined
            await user.save()
            return res.status(200).json({
                success:true,
                message:"User verified successfull"
            })
       
        }
        res.status(400).json({
            success:false,
            message:"Wrong validation code. Please verify to your email"
        })
    } catch (error) {
        console.log(error);
    }
}