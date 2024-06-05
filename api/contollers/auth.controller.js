import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/erros.js"
import jwt from 'jsonwebtoken'
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

export const signin=async(req,res,next)=>{
    const {email,password}=req.body
    if(!email||!password||email===' '||email===' '){
      next(errorHandler(400,'All fields are required'))  
    }
    try{
        const validUser= await User.findOne({email})
        if(!validUser){
           return next(errorHandler(404,'Invalid username/password'))
        }
        const validPassword=bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
            return next(errorHandler(400,'Invalid username/passoword'))
        }
        
        //if both are correct we need to authenticate the user using jsonwebtoken
        const token=jwt.sign(
            {id:validUser._id},process.env.JWT_SECRET//secret key 
        )
        //separate password from the user
        const{ password : pass,...rest}=validUser._doc
        res.status(200).cookie('access_token',token,{
            httpOnly:true
        }).json(rest)
    }
    catch(error){
        next(error)
    }
}