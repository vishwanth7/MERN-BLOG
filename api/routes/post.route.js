import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createPost,getPost,deletePost } from "../contollers/post.controller.js";
const router=express.Router()

router.post('/create-post',verifyToken,createPost)
router.get('/get-post',getPost)
router.delete('/delete-post/:postId/:userId',verifyToken,deletePost)
export default router