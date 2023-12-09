import React from 'react'
import Logo from '../assets/tinder_logo_white.png'
import { FaChevronDown , FaLanguage } from "react-icons/fa";
import { HiOutlineSortDescending } from "react-icons/hi";
import { HiOutlineSortAscending } from "react-icons/hi";

const Navbar = () => {
    const [isOpen,setIsOpen] = React.useState(false);
  return (
    <>
    <nav className='hidden lg:flex w-full topnav absolute top-0 justify-between py-6 px-12' >
        <div className='flex gap-6 items-center'>
            <img src={Logo} className='w-40 '  />
            <span className='text-white font-semibold text-2xl cursor-pointer ml-8 hover:text-red-500 hover:underline' >Products</span>
            <span className='text-white font-semibold text-2xl cursor-pointer hover:text-red-500 hover:underline' >Learn</span>
            <span className='text-white font-semibold text-2xl cursor-pointer hover:text-red-500 hover:underline'> Safety</span>
            <span className='text-white font-semibold text-2xl cursor-pointer hover:text-red-500 hover:underline'>Support</span>
        </div>
        <div className='flex items-center gap-4' >
            <button className='flex items-center text-2xl font-semibold text-white' >
                <FaLanguage className='w-8' />
                Language
            </button>
            
            <button className='flex text-xl items-center font-semibold bg-white rounded-3xl px-12 py-1' >
                Login
            </button>
        </div>
    </nav>
    <nav className='absolute topnav w-full top-0 py-6 lg:px-12 px-6 flex justify-between responsive-nav' >
        <div className='flex gap-6 items-center'>
            <img src={Logo} className='w-40 '  />
        </div>
        <HiOutlineSortDescending onClick={()=>setIsOpen(!isOpen)} className='text-white transition-all rounded-md cursor-pointer hover:scale-[1.3] align-middle text-center w-12 h-8' />
        
    </nav>
    <div className={`flex py-6 lg:px-12 ${!isOpen?"px-6":"px-0"} z-10 bg-[#161A30] w-full h-[100vh] flex-col transition-all absolute top-0 ${!isOpen?"translate-up":"translate-down"} gap-6 items-center`}>
            
            <div className='flex w-full justify-between' >
                <img src={Logo} className='w-40 px-6'  />
                <HiOutlineSortAscending onClick={()=>setIsOpen(!isOpen)} className='text-white transition-all rounded-md cursor-pointer hover:scale-[1.3] align-middle text-center w-12 h-8' />
            </div>
            <span className='text-white px-6 mt-16 rounded-3xl p-2 bg-black w-full font-semibold flex items-center justify-between text-2xl cursor-pointer hover:text-red-500 hover:underline' >
                Products <FaChevronDown/>
            </span>
            <span className='text-white px-6 rounded-3xl p-2 bg-black w-full font-semibold flex items-center justify-between text-2xl cursor-pointer hover:text-red-500 hover:underline' >Learn<FaChevronDown/></span>
            <span className='text-white px-6 rounded-3xl p-2 bg-black w-full font-semibold flex items-center justify-between text-2xl cursor-pointer hover:text-red-500 hover:underline'> Safety<FaChevronDown/></span>
            <span className='text-white px-6 rounded-3xl p-2 bg-black w-full font-semibold flex items-center justify-between text-2xl cursor-pointer hover:text-red-500 hover:underline'>Support<FaChevronDown/></span>
        </div>
    </>
  )
}

export default Navbar