import React from 'react'
import {Button} from 'flowbite-react'
function CallToAction() {

  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-between  rounded-tl-3xl rounded-br-3xl text-center">
        <div className='flex-1 justify-center flex flex-col pl-10'>
            <h2 className='text-2xl'>Want to Learn More About JavaScript?</h2>
            <p className='text-gray-500 my-2'>Check Out These Resources with 100 JavaScript Projects</p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
              <a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferrer'>
            100 JS Projects</a></Button>
        </div>
        <div className="p-7 flex-1  ">
            <img src="https://logowik.com/content/uploads/images/3799-javascript.jpg" className='w-2/3 h-full' />
        </div>
    </div>
  )
}

export default CallToAction