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
            return next(errorHandler(404,'Invalid username'))
        }
        const validPassword= bcryptjs.compareSync(password,validUser.password)
        if(!validPassword){
           return next(errorHandler(400,'Invalid passoword'))
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

export const google=async(req,res,next)=>{
   
    const{email,name,photourl}=req.body
    try{
         //if user exists or not
        const user =  await User.findOne({email})
        if(user){
            const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
            const {password,...rest}=user._doc
            res.status(200).cookie('access_token',token,{
                httpOnly:true,
            }).json(rest)
        }
        else{
            //if user doesnt exist we have to create user with a random password,later user can change it
            const generatedPassword= Math.random().toString(36).slice(-8)
            const newHashedPwd=bcryptjs.hashSync(generatedPassword,10)
            const newUser=new User({
                username: name.toLowerCase().split(" ").join('')+Math.random().toString(9).slice(-4),
                email,
                password:newHashedPwd,
                profilePicture:photourl
            })
            //save the user
            await newUser.save()
            const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET)
            const {password,...rest}=newUser._doc
            res.status(200).cookie('access_token',token,{
                httpOnly:true
            }).json(rest)
        }
    }
    catch(error){
        next(error)
    }
}