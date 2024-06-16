import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPosts from '../components/DashPosts'
function Dashboard() {
  const location=useLocation()
  const [Tab,setTab]=useState('')
  useEffect(()=>{
      const urlParams=new URLSearchParams(location.search)
      const tabFromUrl=urlParams.get('tab')
      if (tabFromUrl){
        setTab(tabFromUrl)
      }
  },[location.search])
  return (
    <div className='min-h-screen flex flex-col md:flex-row' >
          <div className='md:w-56'>
            {/* sidebar */}
              <DashSidebar/>
          </div>
            {/* profile content */}
          {Tab==='profile' && <DashProfile/>}
          {Tab==="posts" && <DashPosts/>}
    </div>
  )
}

export default Dashboard