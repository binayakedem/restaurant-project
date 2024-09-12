import connectDb from './Connections/ConnectDb.js'
import dotenv from 'dotenv'
import express from 'express'
import userRoute from './Routes/userRoute.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app=express();
dotenv.config();
connectDb()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use('/uploads', express.static('uploads'));
app.use('/',userRoute)
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is listening in port ${process.env.PORT}`)
})