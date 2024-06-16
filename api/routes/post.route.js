import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createPost,getPost } from "../contollers/post.controller.js";
const router=express.Router()

router.post('/create-post',verifyToken,createPost)
router.get('/get-post',getPost)
export default router