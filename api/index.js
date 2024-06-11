import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cors from 'cors'
dotenv.config()
const app=express()
app.use(express.json())


app.use(cors())

//connecting to database
mongoose.
connect(process.env.MONGO)
.then(()=>{
    console.log('Mongo DB is connected')
})
.catch((err)=>{
    console.log("error is occurred",err)
})
app.listen(3000, ()=>{console.log("server listening on port 3000...")})


//test api
app.use('/api/user',userRoutes);

//signup api
app.use('/api/auth',authRoutes)

//middleware for error handling
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500
    const errMessage=err.message || 'internal server error'
    res.status(statusCode).json({
        success:false,
        message:errMessage,
        statuscode:statusCode
    })
})