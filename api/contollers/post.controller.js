import Post from "../models/post.model.js"
import { errorHandler } from "../utils/erros.js"

export const createPost=async (req,res,next)=>{
        if(!req.user.isAdmin){
            return next(errorHandler(403,"You are not allowed to create a post"))
        }
        if(!req.body.title || !req.body.content){
            return next(errorHandler(400,"Please fill out all the fields"))
        }
        const slug = req.body.title
        .split(' ')
        .join('')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g,'')
        const newPost=new Post({
            ...req.body,slug,userId:req.user.id
        })
        try{
            const savedPost= await newPost.save()
            res.status(201).json(savedPost)
        }
        catch(e){
            next(e)
        }
}

export const getPost= async (req,res,next)=>{
    try{
        const startIndex=parseInt(req.query.startIndex) || 0
        const limit=parseInt(req.query.limit ) || 9
        const sortDirection=req.query.order === 'asc' ? 1 : -1
        const posts = await Post.find({
            ...(req.query.userId && {userId:req.query.userId}),
            ...(req.query.category && {category:req.query.category}),
            ...(req.query.slug && {slug:req.query.slug}),

            ...(req.query.postId && {_id:req.query.postId}),
            ...(req.query.searchTerm && {
                $or:[
                    {title:{$regex:req.query.searchTerm,$options:'i'}},//i means case insensitive
                    {content:{$regex:req.query.searchTerm,$options:'i'}},
                ],
            }),   
        }).sort({ updatedAt : sortDirection}).skip(startIndex).limit(limit)

        const totalPosts=await Post.countDocuments()

        const now =new Date()
        const oneMonthAgo= new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        )
        //console.log(oneMonthAgo)
        const lastMonthPosts=await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        })
        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        })
    }
    catch(error){
        next(error)
    }
}

export const deletePost=async(req,res,next)=>{
    if( !req.user.isAdmin || req.user.id !== req.params.userId ){
        return next(errorHandler("You are not allowed to delete this post"))
    }
    try{
        await Post.findByIdAndDelete(req.params.postId)
        res.status(200).json("Post has been deleted")
    }
    catch(e){
        next(e)
    }
}

export const updatePost=async(req,res,next)=>{
    if( !req.user.isAdmin || req.user.id !== req.params.userId )
        {
        return next(errorHandler(403,"You are not allowed to Update this post"))
    }
    const updatedFields={}
    if (req.body.title){
        const newTitle=req.body.title
        updatedFields.title=newTitle
    }
    if (req.body.content){
        const newContent=req.body.content
        updatedFields.content=newContent
    }
    if (req.body.category){
        const newCategory=req.body.category
        updatedFields.category=newCategory
    }
    if (req.body.image){
        const newImage=req.body.image
        updatedFields.image=newImage
    }
    try{
        const updatedpost=await Post.findByIdAndUpdate(
            req.params.postId,
            {$set:updatedFields},{new:true})
            res.status(200).json(updatedpost)    
    }
    catch(e){
        next(e)
    }
}