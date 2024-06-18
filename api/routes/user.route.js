import express from "express";
import { test,updateUser,deleteUser,getUsers,getUser } from "../contollers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import { verifyToken2 } from "../utils/verifyUser2.js";

const router=express.Router()

router.get('/test',test)
router.put('/update/:userId',verifyToken,updateUser)
router.delete('/delete/:userId',verifyToken,deleteUser)
router.get('/getusers',verifyToken2,getUsers)

//api route for getting users, this is for everybody
router.get('/:userId',getUser)
// router.post('/signout',signout)
export default router