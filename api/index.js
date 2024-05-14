import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const app=express()
mongoose.
connect(process.env.MONGO)
.then(()=>{
    console.log('Mongo DB is connected')
})
.catch((err)=>{
    console.log("error is occurred",err)
})
app.listen(3000, ()=>{console.log("server listening on port 3000...")})