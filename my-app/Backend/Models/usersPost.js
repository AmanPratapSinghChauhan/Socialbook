import mongoose from "mongoose";
import validator from "validator";
const {ObjectId} =mongoose.Schema.Types;


const schema =mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String,
        required:true,
    },
    description:{
        type:String,

        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    likes:[{type:ObjectId,ref:"User" }],
})
export const Post =mongoose.model('Post',schema);