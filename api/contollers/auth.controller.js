import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
export const signup=async (req,res)=>{
    const {username,email,password}=req.body
    if (!username||!email||!password||username===""||email===""||password===""){
        return res.json({message:"all fields are required"})
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
    catch(err){
        res.json({message:err.message})
    }
    
}