import connectDb from './Connections/ConnectDb.js'
import dotenv from 'dotenv'
import express from 'express'
import foodRouter from './Routes/foodRoute.js'
import orderRoute from './Routes/orderRoute.js'
import contactRoute from './Routes/contactRoute.js'
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
app.use('/api',foodRouter)
app.use('/api',orderRoute)
app.use('/api',contactRoute)
app.use('/',userRoute)
const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is listening in port ${process.env.PORT}`)
})