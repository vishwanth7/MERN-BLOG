import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {Alert, Button, TextInput, Textarea} from 'flowbite-react'
function CommentSection({postId}) {
    const {currentUser}=useSelector((state)=>state.user)
    const[comment,setComment]=useState('')
    const[commentError,setCommentError]=useState(null)
    const handleSubmit=async (e)=>{
        e.preventDefault()
        if(comment.length>200){
            return 
        }
        try{
            const token=localStorage.getItem('access_token')
        const res= await fetch('http://localhost:3000/api/comment/create',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({content:comment,postId,userId:currentUser._id,token})
        })
        const data=await res.json()
        if(res.ok){
            setComment('')
            setCommentError(null)
        }
    }
    catch(e){
        setCommentError(e.message)
    }
        
    }
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser?(
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
            <p>Signed in as:</p>
            <img src={currentUser.profilePicture} alt="" className='h-5 w-5 object-cover rounded-full' />
            <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>@{currentUser.username}</Link>
        </div>
    ):(
        <div className="text-sm text-teal-500 my-5 flex gap-1">
            You must be signed in to comment
            <Link to={'/signin'} className='text-blue-500 hover:underline'>Sign in</Link>
        </div>
    )}
    {currentUser && (
        <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
            <Textarea
            placeholder='Add a comment...'
            rows='3'
            maxLength='200' 
            onChange={(e)=>{setComment(e.target.value)}}
            value={comment}
            />
            <div className='flex justify-between items-center mt-5'>
                <p className='text-gray-500 text-sm'>{200-comment.length} characters remaining</p>
                <Button outline gradientDuoTone='purpleToBlue' type='submit'>Submit </Button>
            </div>
            {commentError && 
            <Alert color='failure' className='mt-5'>{commentError && (<p>{commentError}</p>)}</Alert> }
        </form>
        
    )}

    </div>
  )
}

export default CommentSection