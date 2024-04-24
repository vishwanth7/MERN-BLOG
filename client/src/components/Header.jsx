import React from 'react';
import {Button, Navbar, TextInput} from 'flowbite-react';
import {Link,useLocation} from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaMoon} from 'react-icons/fa';
function Header() {
    const path=useLocation().pathname
  return (
    <Navbar className='border-b-2'>
    { /*logo name part */ }
        <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl dark:text-white'>
            <span className='px-2 py-0.5 text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg'>Vishwanth's</span>Blog
        </Link>
    { /** search bar */ }
        <form >
            <TextInput
            type='text' placeholder='Search...'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'
            />
        </form>
        <Button color="grey" className='border-2 lg:hidden' pill >
            <AiOutlineSearch/>
        </Button>
    {/* //signin and theme toggle button */}
    <div className='flex  gap-2 md:order-2'>
        {/* toggle button */}
        <Button className="hidden sm:inline" color='gray' pill>
            <FaMoon/>
        </Button>
        {/* sigin button */}
        <Link to='/signin'>
            <Button gradientDuoTone="purpleToBlue" outline>Sign In</Button>
        </Link>
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