import { useState, useEffect } from 'react';
import BGIMAGE from '../assets/Safeimagekit-resized-img.png';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SignupModal from '../components/signupModal';
import LoginModal from '../components/LoginModal';

const Landing = () => {
  const [opacity, setOpacity] = useState(1);
  const [open,setOpen] = useState<boolean>(false);
  const [loginModal,setLoginModal] = useState<boolean>(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const newOpacity = 1 - scrollY / 600;
      const clampedOpacity = Math.min(1, Math.max(0, newOpacity));
      setOpacity(clampedOpacity);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className='overflow-x-hidden' >
      <div id='maindiv' className='relative'>
        <img className='w-[100vw] h-[100vh] bg-blend-darken brightness-50' src={BGIMAGE} />
        <Navbar loginOpen={setLoginModal} />
        <h1 style={{ opacity: opacity }} className='absolute text-center w-full top-[45vh] align-middle text-white flex flex-col items-center justify-center'>
          <span style={{ opacity: opacity }} className='mx-auto lg:text-8xl sm:text-7xl text-6xl tracking-wider font-bold'>Start Something Epic.</span>
          <button onClick={()=>setOpen(true)} style={{ opacity: 1 }} className='btn-bg rounded-3xl mt-8 font-bold text-2xl px-8 py-2'>
            Create Account
          </button>
        </h1>
      <SignupModal open={open} setOpen={setOpen} />
      <LoginModal open={loginModal} setOpen={setLoginModal} />
      </div>
      <Footer />
    </main>
  );
};

export default Landing;