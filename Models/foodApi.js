import mongoose, { Schema } from "mongoose";

const foodapiSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    love:
    {
        type:Number,
        default:0
        
    },
    image:{
        type:String,
        required:true
    }
});
export default mongoose.model('foodapi',foodapiSchema)