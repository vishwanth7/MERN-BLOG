import React from 'react'
import {Sidebar} from 'flowbite-react'
import {HiArrowSmRight, HiUser} from 'react-icons/hi'
import {useState,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice'
function DashSidebar() {
    const location=useLocation()
  const [Tab,setTab]=useState('')
  const dispatch=useDispatch()
  //signout function
  const handleSignOut= async ()=>{
    try{
        localStorage.removeItem("access_token");
        dispatch(signOutSuccess())
    }
    catch(e)
    {
        console.log(e.message)
    }
}
  useEffect(()=>{
      const urlParams=new URLSearchParams(location.search)
      const tabFromUrl=urlParams.get('tab')
      if (tabFromUrl){
        setTab(tabFromUrl)
      }
  },[location.search])
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={Tab==='profile'} icon={HiUser} label={'User'} labelColor='dark' as='div'>
                    Profile
                </Sidebar.Item>
                </Link>
                
                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar