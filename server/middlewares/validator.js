import Joi from "joi";

export const registerSchema = Joi.object({
    username:Joi.string().min(4).required().messages({
        "string.base":"Username must be a string",
        "string.min":"Username must be at least 4 characters long.",
        "string.empty":"Username is required"
    }),
    password:Joi.string().min(8).required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'))
    .message({
        "string.base":"Password must be a string",
        "string.min":"Password must be at least 8 characters long.",
        "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character."

    }),
    email:Joi.string().email().messages({
        "string.email":"Please provid a valid email adress"
    })
}) 
