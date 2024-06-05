import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { Alert, Button, Label,Spinner,TextInput } from 'flowbite-react'
import {useDispatch,useSelector} from 'react-redux'
import { signInStart,signInFailure,signInSuccess } from '../redux/user/userSlice'

function Signin() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  //form data use state hook
  const[formData,setFormData]=useState({})
  //using useselector 
  const{loading,error:errorMessage}=useSelector(state=>state.user)
  const handlechange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }
  // we are using redux to change the states so its not requierd 
  // const[errorMessage,setErrorMessage]=useState(null)
  // const[loading,setLoading]=useState(null)
  
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(!formData.email||!formData.password){
      return dispatch(signInFailure("Please fill all the fields!"))
    }
    try{
      dispatch(signInStart())
      const res=await fetch('http://localhost:3000/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data=await res.json()
      if(data.success===false)
        {
          // return 
          dispatch(signInFailure(data.message))
        }
      // console.log(res)
      //not required setLoading(false)
      if(data.success!==false){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    }
    catch(e){
        dispatch(signInFailure(e.message))
    }
  }
  
  return (
    <div className='min-h-screen mt-20 '>
      <div className='flex max-w-3xl p-3 mx-auto flex-col md:flex-row items-center gap-5 '>
        {/* left part */}
        <div className='flex-1'>
          <Link to="/" className='text-4xl font-bold mt-5 dark:text-white'>
              <span className='px-2 py-0.5 text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg'>Vishwanth's</span>Blog
          </Link>
          <p className='text-sm mt-5 font-semibold'>Hi User! Register here to start your journey. Happy Blogging:)</p>
        </div>
        {/* right part */}
        <div className='flex-1'>
            <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
              
              <div>
                <Label value='Your Email'></Label>
                <TextInput type='email' placeholder='Email' id='email'onChange={handlechange} />
                
              </div>
              <div>
                <Label value='Your Password'></Label>
                <TextInput type='password' placeholder='password' id='password'onChange={handlechange} />
                
              </div>
              <Button gradientDuoTone='purpleToBlue' type='submit' disabled={loading}>
                {loading ? (<><Spinner className='sm'/><span className='pl-3'>Loading...</span></>):'Sign-In'}
              </Button>
            </form>
            <div className='flex gap-2 text-sm font-semibold mt-2'> 
              <span>Don't Have an account?</span>
              <Link to='/signup' className='text-blue-500'>Sign-Up</Link>
            </div>
            {
          errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )
        }
        </div>
        
      </div>
      
    </div>
  )
}

export default Signin