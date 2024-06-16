import { Alert, Button, TextInput } from 'flowbite-react'
import React, { useEffect, useRef,useState } from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase/'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {updateStart,updateSuccess,updateFailure,clearErrorMessage} from '../redux/user/userSlice'


function DashProfile() {

    const {currentUser} =useSelector((state)=>state.user)
    const[imageFile,setImageFile] =useState(null)
    const[imageFileUrl,setImageurl]=useState(null)
    const[imageFileUploadingProgress,setimageFileUploadingProgress]=useState(null)
    const[imageFileUploadError,setImageFileUploadError]=useState(null)
    const[formData,setFormData]=useState({})
    const[imageFileUploading,setImageFileUploading]=useState(null)
    const[updateUserSuccess,setUpdateUserSuccess]=useState(null)
    const[updateUserError,setUpdateUserError]=useState(null)
    const dispatch=useDispatch()
    // console.log(imageFileUploadingProgress,imageFileUploadError)
    const filePickerRef=useRef()
    const handleImageChange=(e)=>{
        const file=e.target.files[0]
        if(file){
            setImageFile(file)
            setImageurl(URL.createObjectURL(file))
        }
    }
    //console.log(imageFile,imageFileUrl)
    useEffect(()=>{
        if(imageFile){
            uploadImage()
        }
    },[imageFile])
    //uploading image  file to database
    const uploadImage=async ()=>{
        setImageFileUploading(true)
        setImageFileUploadError(null)
        const storage=getStorage(app)
        const fileName=new Date().getTime()+imageFile.name
        const storageRef=ref(storage,fileName)
        const uploadTask=uploadBytesResumable(storageRef,imageFile)
        uploadTask.on(
            'state_changed',
            (snapshot)=>{
                const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
                setimageFileUploadingProgress(progress.toFixed(0))
            },
            (error)=>{
                    setImageFileUploadError("Could not upload image (file must be less than 5MB)")
                    setimageFileUploadingProgress(null)
                    setImageFile(null)
                    setImageurl(null)
                    setImageFileUploading(false)
            },
            ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                        setImageurl(downloadUrl)
                        setFormData({...formData,profilePicture:downloadUrl })
                        setImageFileUploading(false)
                    
                })
            }
        )
    }
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.id] : e.target.value})
    }
    //console.log(formData)
    //console.log(imageFile,currentUser.profilePicture)
    
    //console.log(currentUser)
    // console.log(currentUser._id)
    const handleSubmit = async (e)=>{
        e.preventDefault()
        setUpdateUserSuccess(null)
        setUpdateUserError(null)
        if(Object.keys(formData).length === 0){
            setUpdateUserError("No changes made!")
            return 
        }
        if(imageFileUploading){
            setUpdateUserError("Please wait for image to upload")
            return
        }
        try{
            formData['token']=localStorage.getItem('access_token')
            // console.log(formData)
            dispatch(updateStart())
            const res = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(formData)
            })
            const data=await res.json()
            if(!res.ok){
                dispatch(updateFailure(data.message))
                setUpdateUserError(data.message)
            }
            else{
                dispatch(updateSuccess(data))
                setUpdateUserSuccess("User's details Updated sucessfully")
            }
        }
        catch(e){
                dispatch(updateFailure(e.message))
                setUpdateUserError(data.message)
        }
    }
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
            <div className='relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' 
            onClick={()=>filePickerRef.current.click()}
            >
                {imageFileUploadingProgress &&(
                    <CircularProgressbar value={imageFileUploadingProgress||0} text={`${imageFileUploadingProgress}%`}
                        strokeWidth={5}
                        styles={{
                            root:{
                                width:'100%',
                                height:'100%',
                                position:'absolute',
                                top:0,
                                left:0,
                            },
                            path:{
                                stroke:`rgba(144,258,144,${imageFileUploadingProgress/100})`
                            }
                        }}
                    />
                )}
            <img src={imageFileUrl || currentUser.profilePicture} alt="user"  
            className='rounded-full w-full h-full object-cover border-4 border-[lightgray]'
            />
            </div>
            {imageFileUploadError && <Alert color='failure'> {imageFileUploadError}</Alert>}
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}onChange={handleChange}/>
            <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email}onChange={handleChange}/>
            <TextInput type='password' id='password' placeholder='password' onChange={handleChange}/>
            <Button type='submit' gradientDuoTone="greenToBlue" outline>
                Update
            </Button>
        </form>
        <div className='mt-5 flex flex-row justify-between' >
            <Button color='failure' pill outline>
                Delete Account
            </Button>
            <Button gradientMonochrome="failure" pill >
                Sign Out
            </Button>
        </div>
            {updateUserSuccess && (
            <Alert color='success' className='mt-5'>
                {updateUserSuccess}
            </Alert>)
            }
            {updateUserError && (
            <Alert color='failure' className='mt-5'>
                {updateUserError}
            </Alert>)
            }
    </div>
  )
}

export default DashProfile