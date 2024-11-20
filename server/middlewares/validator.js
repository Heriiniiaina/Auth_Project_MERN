import Joi from "joi";

export const registerSchema = Joi.object({
    username:Joi.string().min(4).required(),
    password:Joi.string().min(8).required(),
    email:Joi.string().email()
}) 
