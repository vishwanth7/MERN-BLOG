import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
dotenv.config()
const app=express()
app.use(express.json())

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