
import { boolean } from "joi";
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:boolean,
        default:false
    },
    verificationCode:{
        type:String,
        select:false
    },
    verificationCodeValidity:{
        type:Number,
        select:false
    }
},
{
    timestamps:true
})