import React from 'react'
import FooterCard from './FooterCard'
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='h-[100vh]  w-[100vw] overflow-x-hidden bg-slate-950'>
        <div className='flex overflow-x-hidden items-center px-16 py-32 gap-8' >
            <FooterCard/>
            <FooterCard/>
            <FooterCard/>
            <FooterCard/>
        </div>
        <div className='flex items-stretch' >
          <div className='flex flex-col gap-6 px-16' >
            <h1 className='text-white font-bold text-2xl' >Legal</h1>
            <div className='flex flex-col' >
              <span className='text-white font-normal	py-1 text-sm'>Privacy</span>
              <span className='text-white font-normal	py-1 text-sm'>Cookie Policy</span>
              <span className='text-white font-normal	py-1 text-sm'>Intellectual Property</span>
            </div>
          </div>
          <div className='flex flex-col gap-6 px-16' >
            <h1 className='text-white font-bold text-2xl' >Career</h1>
            <div className='flex flex-col' >
              <span className='text-white font-normal	py-1 text-sm'>Careers Portal</span>
              <span className='text-white font-normal	py-1 text-sm'>Tech Blog</span>
            </div>
          </div>
          <div className='flex flex-col gap-6 px-16' >
            <h1 className='text-white font-bold text-2xl' >Socials</h1>
            <div className='flex gap-4' >
              <span className='text-white hover:text-red-500 cursor-pointer font-normal	py-1 text-2xl'><FaInstagram/></span>
              <span className='text-white hover:text-red-500 cursor-pointer font-normal	py-1 text-2xl'><FaTwitter/></span>
              <span className='text-white hover:text-red-500 cursor-pointer font-normal	py-1 text-2xl'><FaYoutube/></span>
              <span className='text-white hover:text-red-500 cursor-pointer font-normal	py-1 text-2xl'><FaTiktok/></span>
              <span className='text-white hover:text-red-500 cursor-pointer font-normal	py-1 text-2xl'><FaFacebook/></span>
            </div>
          </div>
        </div>
    </footer>
  )
}

export default Footer