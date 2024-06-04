import React from 'react'
import {Footer, FooterDivider} from 'flowbite-react'
import { Link } from 'react-router-dom'
import {BsFacebook, BsInstagram, BsGithub, BsTwitterX} from 'react-icons/bs'
function FooterCom() {
  return(
    <Footer container className='border border-t-8 border-teal-500'>
    <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
            <div className='mt-5'>
                <Link to="/" className='self-center whitespace-nowrap text-xl sm:text-xl dark:text-white'>
                    <span className='px-2 py-0.5 text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg'>Vishwanth's</span>Blog
                </Link> 
            </div>
            <div className='grid grid-cols-2 gap-8  mt-4 sm:grid-3 sm:gap-6'>
                <div>
                    <Footer.Title title='About'/>
                    <Footer.LinkGroup col>
                        <Footer.Link href='/about' target='_blank' rel='noopener noreferer'>
                            Vishwanth's Blog
                        </Footer.Link>
                    </Footer.LinkGroup>
                    <Footer.LinkGroup col>
                        <Footer.Link href='#' >
                            Author
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <div>
                    <Footer.Title title='Follow Us'/>
                        <Footer.LinkGroup col>
                            <Footer.Link href='https://github.com/vishwanth7' target='_blank' rel='noopener noreferer'>
                                GitHub
                            </Footer.Link>
                        </Footer.LinkGroup>
                        <Footer.LinkGroup col>
                            <Footer.Link href='#' >
                                Discord
                            </Footer.Link>
                    </Footer.LinkGroup>
                </div>
                <div>
                    <Footer.Title title='Legal'/>
                        <Footer.LinkGroup col>
                            <Footer.Link href='#' >
                                Privacy Policy
                            </Footer.Link>
                        </Footer.LinkGroup>
                        <Footer.LinkGroup col>
                            <Footer.Link href='#' >
                                Terms and Condition
                            </Footer.Link>
                    </Footer.LinkGroup>
                </div>
            </div>
        </div>
        <Footer.Divider/>
        <div className='w-full sm:flex sm:justify-between sm:items-center'>
            <Footer.Copyright href='#' by="Vishwanth's Blog" year={ new Date().getFullYear()} />
            <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                <Footer.Icon href='#' icon={BsFacebook}/>
                <Footer.Icon href='#' icon={BsInstagram}/>
                <Footer.Icon href='https://github.com/vishwanth7' icon={BsGithub}/>
                <Footer.Icon href='#' icon={BsTwitterX}/>
            </div>
        </div>
    </div>
</Footer>
  )
}

export default FooterCom


