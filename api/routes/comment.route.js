import express from 'express'
import { createComment,getPostComments,likeComment,editComment,deleteComment,getComments } from '../contollers/comment.controller.js'
import {verifyToken} from '../utils/verifyUser.js'
import {verifyToken2} from '../utils/verifyUser2.js'
 
const router=express.Router()

router.post('/create',verifyToken,createComment)
router.get('/getPostComments/:postId',getPostComments)
router.put('/likeComment/:commentId',verifyToken,likeComment)
router.put('/editComment/:commentId',verifyToken,editComment)
router.delete('/deleteComment/:commentId',verifyToken,deleteComment)
router.get('/getComments',verifyToken2,getComments)
export default router