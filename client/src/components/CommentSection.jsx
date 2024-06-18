import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link,useNavigate } from 'react-router-dom'
import {Alert, Button, Textarea} from 'flowbite-react'
import Comment from './Comment'

function CommentSection({postId}) {
    const navigate=useNavigate()
    const {currentUser}=useSelector((state)=>state.user)
    const[comment,setComment]=useState('')
    const[commentError,setCommentError]=useState(null)
    const[comments,setComments]=useState([])
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
            setComments([data,...comments])
        }
    }
    catch(e){
        setCommentError(e.message)
    }
    }
//useEffect for getting comment for selecting every post page
    useEffect(()=>{
        const getComments= async()=>{
            try{
                const res= await fetch(`http://localhost:3000/api/comment/getPostComments/${postId}`)
                if(res.ok){
                    const data= await res.json()
                    setComments(data)
                } 
            }
            catch(e){
                console.log(e)
            }
        }
        getComments()
    },[postId])
    const handleLike=async(commentId)=>{
            try{
                if(!currentUser){
                        navigate('/signin')
                        return
                }
                const token=localStorage.getItem('access_token')
                const res = await fetch(`http://localhost:3000/api/comment/likeComment/${commentId}`,{
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify({token})
                })
                if(res.ok){
                    const data=await res.json()
                    setComments(comments.map((comment)=>{
                        return(comment._id === commentId 
                            ?
                            {
                                ...comment,
                                likes:data.likes,
                                numberOfLikes:data.likes.length
                            } 
                            :
                            comment)
                    }
                    ))
                }
            }
            catch(e){
                console.log(e.message)
            }
    }
    const handleEdit=async(comment,editedContent)=>{
        setComments(
            comments.map((c)=>
                c._id ===comment._id ? {...c,content:editedContent} :c
                )
        )
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
    {comments.length === 0 ? (<p className='text-sm my-5'>No Comments Yet!</p>) : (
        <>
        <div className=" text-sm my-5 flex items-center gap-1">
            <p>Comments</p>
            <div className='border border-gray-400 py-1 px-2 rounded-sm'>
                    <p>{comments.length}</p>
            </div>
        </div>
        {/* {console.log("Hi",comments)} */}
        {comments.map((comment)=>{
            return(
            <Comment key={comment._id} comment={comment} onLike={handleLike} onEdit={handleEdit}/>
            )
        })}
        </>
    )}
    </div>
  )
}

export default CommentSection