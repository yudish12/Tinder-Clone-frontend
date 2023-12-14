import { FaChevronCircleLeft, FaChevronCircleRight, FaExclamation } from 'react-icons/fa'
import { HiHeart } from 'react-icons/hi'
import { RiCloseCircleFill } from 'react-icons/ri'

const ShowMatch = () => {
  return (
    <div className=' h-full w-[50%] flex justify-center px-8 py-16'>
        <div style={{maxWidth:"350px",maxHeight:"500px"}} className="relative w-full h-full ">
            <img style={{width:"100%",height:"100%",zIndex:"-1",opacity:"0.9",backgroundBlendMode:"darken"}} className='rounded-t-lg brightness-[0.75]' src="https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="" />
            <div className="absolute ml-1 top-0 left-0 h-1 w-[48%] mx-auto mt-1 rounded-3xl bg-gray-200"></div>
            <div className="bg-gray-200 mr-1 mx-auto absolute top-0 right-0 h-1 w-[48%] mt-1 rounded-3xl "></div>
            <div className='absolute top-[50%] px-1 left-0' >
                <FaChevronCircleLeft className="text-3xl cursor-pointer" />
            </div>
            <div className='absolute top-[50%] px-1 right-0 ' >
                <FaChevronCircleRight className="text-3xl cursor-pointer" />
            </div>
            <div className='flex absolute bottom-0 pb-12 px-2 flex-col justify-start items-start' >
                <div className='flex text-white text-3xl font-bold justify-start gap-6' >
                    <span>name</span>
                    <span>age</span>
                </div>
                <div>
                    <span className='text-white font-bold text-xl' >lives in delhi</span>
                </div>
                <div>
                    <span className='text-white font-bold text-xl' >3kms away</span>
                </div>
            </div>
            <div style={{backgroundImage: "linear-gradient(transparent, black)"}} className='w-full h-[6rem] absolute bottom-0' ></div>
            <div className=' flex justify-around items-center'>
                <HiHeart className="text-red-700 text-4xl hover:scale-125" />
                <RiCloseCircleFill className="text-white text-4xl hover:scale-125" />
                <FaExclamation className="text-[yellow] text-3xl hover:scale-125 " />
            </div>
        </div>
    </div>
  )
}

export default ShowMatch