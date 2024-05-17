import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Label,TextInput } from 'flowbite-react'
function Signup() {
  return (
    <div className='min-h-screen mt-20 '>
      <div className='flex max-w-3xl p-3 mx-auto flex-col md:flex-row items-center gap-5 '>
        {/* left part */}
        <div className='flex-1'>
          <Link to="/" className='text-4xl font-bold mt-5 dark:text-white'>
              <span className='px-2 py-0.5 text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg'>Vishwanth's</span>Blog
          </Link>
          <p className='text-sm mt-5 font-semibold'>Hi User! Register here to use this website. Happy Blogging:)</p>
        </div>
        {/* right part */}
        <div className='flex-1'>
            <form className='flex flex-col gap-4'>
              <div >
                <Label value='Your Username'></Label>
                <TextInput type='text' placeholder='username' id='username'>
                </TextInput>
              </div>
              <div>
                <Label value='Your Email'></Label>
                <TextInput type='text' placeholder='Email' id='Email'>
                </TextInput>
              </div>
              <div>
                <Label value='Your Password'></Label>
                <TextInput type='text' placeholder='password' id='password'>
                </TextInput>
              </div>
              <Button gradientDuoTone='purpleToBlue' type='submit'>Sign Up</Button>
            </form>
            <div className='flex gap-2 text-sm font-semibold mt-2'> 
              <span>Have an account already?</span>
              <Link to='/signin' className='text-blue-500'>Sign-in</Link>
            </div>
        </div>
      </div>

      
    </div>
  )
}

export default Signup