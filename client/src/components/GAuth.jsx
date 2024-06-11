import React from 'react'
import {Button} from 'flowbite-react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {signInSuccess} from '../redux/user/userSlice'
function GAuth() { 
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const auth=getAuth(app)
    const handleGoogleClick=async()=>{
        //provider intialization
        const provider=new GoogleAuthProvider()
        //setting parameters for google to ask to choose an account 
        provider.setCustomParameters({prompt:'select_account'})
        try{
            const resultsFromGoogle=await signInWithPopup(auth,provider)
            // console.log(resultsFromGoogle)
            // console.log(resultsFromGoogle.user.displayName)
            //storing info from google
            const res=await fetch('http://localhost:3000/api/auth/google',{
                method:'POST',
                headers:{'Content-Type':"application/json"},
                body:JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    photourl: resultsFromGoogle.user.photoURL,
                    email:resultsFromGoogle.user.email,
                }),
                })
            const data=await res.json()
            if(res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        }
        catch(error){
            console.log(error)
        }
    }
  return (
    <Button type='button' gradientDuoTone="greenToBlue" outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/> Continue with Google
    </Button>
  )
}

export default GAuth