import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow,Modal,Button } from 'flowbite-react'
import React, { useState } from 'react'
import { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {FaCheck,FaTimes} from 'react-icons/fa'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
function DashComments() {
    const{currentUser}=useSelector((state)=>state.user)
    const[comments,setComments]=useState([])
    const[showMore,setShowMore]=useState(true)
    const[showModal,setShowModal]=useState(false)
    const[commentIdToDelete,setCommentIdToDelete]=useState('')
    // console.log(userPosts)
    useEffect(()=>{
        const fetchComments=async()=>{
            try{
                const token=localStorage.getItem('access_token')
                const res=await fetch(`http://localhost:3000/api/comment/getComments`,{
                    method:'GET',
                    headers:{
                        'Authorization': `Bearer ${token}` 
                    },
                })
                const data=await res.json()
                if(res.ok){
                    setComments(data.comments)
                    if(data.comments.length<7){
                        setShowMore(false)
                    }
                }
            }
            catch(e){
                console.log(e.message)
            }
        }
        if(currentUser.isAdmin)
        {
            fetchComments()
        } 
    },[currentUser._id])

    const handleShowMore= async ()=>{
            const startIndex=comments.length
            try{
                const res= await fetch(`http://localhost:3000/api/comment/getcomments?startIndex=${startIndex}`)
                const data=await res.json()
                if(res.ok){
                    setComments((prev)=>[...prev,...data.comments])
                    if(data.comments.length<7){
                        setShowMore(false)
                    }
                }}
            catch(e){
                console.log(e)
            }
    }
    // console.log(userPosts)
    const handleDeleteComment= async()=>{
        setShowModal(false)
            try{
                const token=localStorage.getItem('access_token')
                const res= await fetch(`http://localhost:3000/api/comment/deleteComment/${commentIdToDelete}`,{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json' 
                  },
                body: JSON.stringify({ token })})
                if(res.ok){
                   setComments((prev)=>prev.filter((comment)=>comment._id !== commentIdToDelete))
                   setShowModal(false) 
                }
                else{
                    console.log(data.message)
                }
            }
            catch(e){
                console.log(e.message)
            }

    }
  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar
     scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
        {currentUser.isAdmin && (comments.length > 0) ? (
            <>
            <Table hoverable className='shadow-md'>
                <TableHead>
                    <TableHeadCell>Date Updated</TableHeadCell>
                    <TableHeadCell>Comment Content</TableHeadCell>
                    <TableHeadCell>Number of Likes</TableHeadCell>
                    <TableHeadCell>Post ID</TableHeadCell>
                    <TableHeadCell>User Id</TableHeadCell>
                    <TableHeadCell>Delete</TableHeadCell>
                </TableHead>
                {comments.map((comment)=>(
                    <TableBody className='divide-y ' key={comment._id}>
                        <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                            <TableCell>{new Date(comment.updatedAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                                {comment.content}                            
                            </TableCell>
                            <TableCell>
                                {comment.numberOfLikes}
                            </TableCell>
                            <TableCell>{comment.postId}</TableCell>
                            <TableCell>{comment.userId}</TableCell>
                            <TableCell>
                                <span onClick={()=>{
                                        setShowModal(true)
                                        setCommentIdToDelete(comment._id)
                                }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                                    Delete
                                </span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ))}
            </Table>
            {
                showMore && (
                    <button  onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
                        Show more
                    </button>
                )
            }
            </>
        ):
        (
            <p>You have no Comments to display</p>
        )}
        <Modal show={showModal} onClose={()=>{setShowModal(false)}} popup size='md'>
                <Modal.Header/>
                    <Modal.Body>
                        <div className="class text-center">
                            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this Comment</h3>
                            <div className='flex justify-center gap-4'>
                                <Button color='failure' onClick={handleDeleteComment}>Yes, I am sure</Button>
                                <Button color='gray' onClick={()=>{setShowModal(false)} }>No,Cancel</Button>
                            </div>
                        </div>
                    </Modal.Body>
            </Modal>
    </div>
  )
}

export default DashComments