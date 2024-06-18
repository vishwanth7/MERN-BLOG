import express from 'express'
import { createComment } from '../contollers/comment.controller.js'
import {verifyToken} from '../utils/verifyUser.js'
 
const router=express.Router()

router.post('/create',verifyToken,createComment)

export default router