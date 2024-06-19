import React from 'react'
import {Sidebar} from 'flowbite-react'
import {HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi'
import {useState,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice'
import { useSelector } from 'react-redux'
function DashSidebar() {
    const {currentUser}=useSelector((state)=>state.user)
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
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                {
                    currentUser && currentUser.isAdmin && (
                        <Link to='/dashboard?tab=dash'>
                            <Sidebar.Item
                            active={Tab==='dash' ||!Tab}
                            icon={HiChartPie}
                            as='div'
                            >
                                Dashboard
                            </Sidebar.Item>
                        </Link>
                    )
                }
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={Tab==='profile'} icon={HiUser} label={currentUser.isAdmin?"Admin":"User"} labelColor='dark' as='div'>
                    Profile
                </Sidebar.Item>
                </Link>

                {currentUser.isAdmin && (
                    <>
                    <Link  to='/dashboard?tab=posts'>
                    <Sidebar.Item active={Tab==='posts'}
                        icon={HiDocumentText} as='div'>
                            Posts
                    </Sidebar.Item>
                    </Link>
                    <Link  to='/dashboard?tab=users'>
                    <Sidebar.Item active={Tab==='users'}
                        icon={HiOutlineUserGroup} as='div'>
                           Users
                    </Sidebar.Item>
                    </Link>
                    <Link  to='/dashboard?tab=comments'>
                    <Sidebar.Item active={Tab==='comments'}
                        icon={HiAnnotation} as='div'>
                           Comments
                    </Sidebar.Item>
                    </Link>
                    
                    </>
                    
                )}
                
                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar