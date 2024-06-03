import mongoose from "mongoose";
import dotenv from 'dotenv'
 
dotenv.config()

const connectDB=async()=>{
    try{
       await mongoose.connect(process.env.URI)
        console.log("Mongo db connected successfully")
    }catch(err){
        console.log("Connection failed due to some error as :", err)

    }
}

export default connectDB;