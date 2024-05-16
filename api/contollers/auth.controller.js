import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/erros.js"
export const signup=async (req,res,next)=>{
    const {username,email,password}=req.body
    if (!username||!email||!password||username===""||email===""||password===""){
        next(errorHandler(400,"all fields are required"))
    }
    //hashing password
    const hashedpassword=bcryptjs.hashSync(password,10)

    const newUser=new User({
        username:username,
        email:email,
        password:hashedpassword,
    })
    try{
        await newUser.save()
        res.json('signup succesful')
    }
    catch(error){
        next(error)
    }
    
}