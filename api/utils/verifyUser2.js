import jwt from 'jsonwebtoken'
import {errorHandler} from './erros.js'
export const verifyToken2 =(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token1 = authHeader.split(' ')[1];
    if(!token1){
        return(next(errorHandler(401,"Unauthorized")))
    }
    jwt.verify(token1,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(401,"Unauthorized"))
        }
        //add user given by jwt token request body
        req.user=user
        next()
    })
}
