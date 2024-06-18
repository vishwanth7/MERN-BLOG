import User from "../models/user.model.js";
import { errorHandler } from "../utils/erros.js";
import bcryptjs from 'bcryptjs'

export const test=((req,res)=>{
    res.json({message:"api is working"})
});

export const updateUser=async (req,res,next)=>{
    //this req contains user which is verified by jwt 
    // console.log(req.user.id,req.params.userId)
    let updatedFields = {};
    if(req.user.id!==req.params.userId){
        return next(errorHandler(403,"You are not allowed to update this user"))
    }
    if(req.body.password){
        if(req.body.password.length<6){
            return next(errorHandler(400,"Password must be at least 6 characters"))
        }
        //if passwords satisfies the condition, then we need to encrypt the password inorder to update into database
        const newPassword=bcryptjs.hashSync(req.body.password,10)
        updatedFields.password=newPassword
    }
    //errors related to username
    if(req.body.username){
        if(req.body.username.length<7 || req.body.username.length>20){
            return next(errorHandler(400,"username must be in between 7 and 20 characters"))
        }
        if(req.body.username.includes(' ')){
            return next(errorHandler(400,"username cannot contain whitespaces"))
        }
        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return(next(errorHandler(400,'username can only contain letters and numbers')))
        }
        updatedFields.username = req.body.username
    }
    if (req.body.email) updatedFields.email = req.body.email;
    if (req.body.profilePicture) updatedFields.profilePicture = req.body.profilePicture;
    //now we want to update the user
        try{
            const updatedUser= await User.findByIdAndUpdate(req.params.userId,
            {
            $set:updatedFields
            },{new:true})
            //console.log(updatedUser)
            const {password,...rest}=updatedUser._doc
            res.status(200).json(rest)
        }
        catch(e){
            next(e)
        }
    }   

export const deleteUser=async (req,res,next)=>{
    if(!req.user.isAdmin && req.user.id !== req.params.userId){
        return next(errorHandler(403,"You are not allowed to delete this user"))
    }
    try{
        await User.findByIdAndDelete(req.params.userId)
        res.status(200).json("User has been deleted Successfully ")
    }
    catch(e){
        next(e)
    }
}


export const getUsers=async(req,res,next)=>{
    if(!req.user.isAdmin){
        return next(errorHandler(403,"You are not allowed to see all the users"))
    }
    try{
        const startIndex=parseInt(req.query.startIndex)||0
        const limit=parseInt(req.query.limit) ||9
        const sortDirection=req.query.sort==='asc'?1:-1
        const users= await User.find().sort({createdAt:sortDirection}).skip(startIndex).limit(limit)
        const usersWithoutPass=users.map((user)=>{
            const{password, ...rest}=user._doc
            return rest
        })
        const totalUsers=await User.countDocuments()

        const now=new Date()
        const oneMonthAgo= new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )
        const lastMonthUsers=await User.countDocuments({
            createdAt:{$gte: oneMonthAgo}
        })
        res.status(200).json({
            users:usersWithoutPass,
            totalUsers,
            lastMonthUsers
        })
    }
    catch(e){
        next(e)
    }
}

export const getUser=async(req,res,next)=>{
    try{
        const user = await User.findById(req.params.userId)
        if(!user){
            return next(errorHandler(404,"User not found"))
        }
        const {password,...rest}=user._doc
        res.status(200).json(rest)
    }
    catch(e)
    {
        next(e)
    }
}