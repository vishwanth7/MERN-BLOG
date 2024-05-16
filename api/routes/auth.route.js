import express from 'express'
import { signup } from '../contollers/auth.controller.js'

const router=express.Router()


router.post('/signup',signup)

export default router