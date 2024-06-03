import mongoose, { Schema } from "mongoose";
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    
    role:
    {
        type:String,
        default:'user'
        
    },
    image:{
        type:String,
        required:true
    },
});
export default mongoose.model('users',userSchema)