import React, { useEffect, useState } from 'react';
import {Avatar, Button, Dropdown, Navbar, TextInput} from 'flowbite-react';
import {Link,useLocation,useNavigate} from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon,FaSun} from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signOutSuccess } from '../redux/user/userSlice';

function Header() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const path=useLocation().pathname
    const location=useLocation()
    const {currentUser}=useSelector((state)=>state.user)
    const {theme}=useSelector((state)=>state.theme)
    const[searchTerm,setSearchTerm]=useState('')
    
    useEffect(()=>{
        const urlParams= new URLSearchParams(location.search)
        const searchTermFromUrl=urlParams.get('searchTerm')
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl)
        }
    },[location.search])
    //sign out functionality
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
    const handleSubmit=(e)=>{
        e.preventDefault()
        if(searchTerm){
            const urlParams=new URLSearchParams(location.search)
            urlParams.set('searchTerm',searchTerm)
            const searchQuery= urlParams.toString()
            navigate(`/search?${searchQuery}`)
        }
    }
  return (
    <Navbar className='border-b-2'>
    { /*logo name part */ }
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl dark:text-white'>
            <span className='px-2 py-0.5 text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg'>Vishwanth's</span>Blog
        </Link>
    { /** search bar */ }
        <form onSubmit={handleSubmit}>
            <TextInput
            type='text' placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            value={searchTerm}
            onChange={(e)=>{setSearchTerm(e.target.value)}}
            />
        </form>
        <Button color="grey" className='border-2 lg:hidden' pill >
            <AiOutlineSearch/>
        </Button>
    {/* //signin and theme toggle button */}
    <div className='flex  gap-2 md:order-2'>
        {/* toggle button */}
        <Button className="hidden sm:inline" color='gray' pill  onClick={()=>{dispatch(toggleTheme())}}>
            {theme==='light'? <FaMoon/>:<FaSun/>}
        </Button>
        {/* sigin button */}
    
        {currentUser ? 
        (
            <Dropdown arrowIcon={false} inline label={<Avatar alt='user Avatar' img={currentUser.profilePicture} rounded/>}>
                <Dropdown.Header>
                    <span className='block text-sm'>@{currentUser.username}</span>
                </Dropdown.Header>
                <Link to={'/dashboard?tab=profile'}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
            </Dropdown>
        ):
        ( <Link to='/signin'>
            <Button gradientDuoTone="purpleToBlue" outline>Sign In </Button>
        </Link>)}
       
        
        
        {/* navbar toggle button */}
        <Navbar.Toggle/>
    </div>

    {/* Navbar menu using navbar collapse */}
    <Navbar.Collapse>
        <Navbar.Link active={path==='/'} as={'div'}>
            <Link to="/">
                Home
            </Link>
        </Navbar.Link>
        <Navbar.Link active={path==='/about'} as={'div'}>
            <Link to="/about">
                About
            </Link>
        </Navbar.Link>
        <Navbar.Link active={path==='/projects'} as={'div'}>
            <Link to="/projects">
                Projects
            </Link>
        </Navbar.Link>
    </Navbar.Collapse>

    </Navbar>
  )
}

export default Header