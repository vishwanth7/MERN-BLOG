import React from 'react'
import CallToAction from '../components/CallToAction'

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'> 
      <h1 className='text-5xl font-semibold'>Projects</h1>
      <p className='text-lg text-gray-500'>Build fun and Engaging projects while learning HTML,CSS and JAVASCRIPT</p>
      <CallToAction/>
    </div>
  )
}
