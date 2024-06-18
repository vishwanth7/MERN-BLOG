import React from 'react'
import {Button} from 'flowbite-react'
function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-between  rounded-tl-3xl rounded-br-3xl text-center">
        <div className='flex-1 justify-center flex flex-col pl-10'>
            <h2 className='text-2xl'>Want to Learn More About JavaScript?</h2>
            <p className='text-gray-500 my-2'>Check Out These Resources with 100 JavaScript Projects</p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'><a href="https://www.100jsprojects.com" target='_blank' rel='noopener noreferer'>100 JS Projects</a></Button>
        </div>
        <div className="p-7 pr-0 pl-20 flex-1">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1DmLCy9PSJfFqO55mNTYOQLx3x8THsbokkw&s" />
        </div>
    </div>
  )
}

export default CallToAction