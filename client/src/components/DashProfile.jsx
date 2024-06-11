import { Button, TextInput } from 'flowbite-react'
import React from 'react'
import {useSelector} from 'react-redux'
function DashProfile() {
    const {currentUser} =useSelector((state)=>state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
            <img src={currentUser.profilePicture} alt="user"  className='rounded-full w-full h-full object-cover border-4 border-[lightgray]'/>
            </div>
            <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
            <TextInput type='text' id='email' placeholder='email' defaultValue={currentUser.email}/>
            <TextInput type='password' id='password' placeholder='password' />
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
    </div>
  )
}

export default DashProfile