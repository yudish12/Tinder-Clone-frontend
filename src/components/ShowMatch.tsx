import { FaChevronCircleLeft, FaChevronCircleRight, FaExclamation } from 'react-icons/fa'
import { HiHeart } from 'react-icons/hi'
import { RiCloseCircleFill } from 'react-icons/ri'
import { useEffect, useLayoutEffect, useState } from 'react'
import { useAppDispatch, useAppSlector } from '../redux/store'
import { disLikeUser, getUsers, likeUser } from '../redux/slices/MatchSlice'
import { setFilterRefetch } from '../redux/slices/FilterSlice'

const ShowMatch = () => {
    
    const dispatch = useAppDispatch();
    const {MatchSliceReducer,filterSliceReducer} = useAppSlector((state)=>state)
    const {matches} = MatchSliceReducer
    const [picInd,setPicInd] = useState(0);

    useLayoutEffect(()=>{
      dispatch(getUsers())
    },[filterSliceReducer.filterRefetch])

    useEffect(()=>{
        if(MatchSliceReducer.matches.length){
            dispatch(setFilterRefetch(false))
        }
    },[MatchSliceReducer.matches])
    
    const [ind,setInd] = useState<number>(0);

    const likeUserfunc = (userid:string)=>{
        setInd((prev)=>prev+1)
        dispatch(likeUser(userid))
    }

    const dislikeUserfunc = (userid:string)=>{
        setInd((prev)=>prev+1)
        dispatch(disLikeUser(userid))
    }

    if(MatchSliceReducer.loading){
        return <div>Loading...</div>
    }

    const prevPic = ()=>{
        if(picInd>0){
            setPicInd(0)
        }
    }

    const nextPic = ()=>{
        if(picInd<1){
            setPicInd(1)
        }
    }

  return (
    <div className=' h-full w-[100%] sm:w-[75%] lg:w-[50%] flex justify-center px-8 py-16'>
        <div style={{maxWidth:"350px",maxHeight:"500px"}} className="relative w-full h-full ">
            {matches[ind]?.photos.length<2?
                <img style={{width:"100%",height:"100%",zIndex:"-1",opacity:"0.9",backgroundBlendMode:"darken"}} className='rounded-t-lg brightness-[0.75]' src="https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" alt="" />:
                
                <img style={{width:"100%",height:"100%",zIndex:"-1",opacity:"0.9",backgroundBlendMode:"darken"}} className='rounded-t-lg brightness-[0.75]' src={matches[ind]?.photos[picInd]} alt="" />
            }
            
            <div className={`absolute ml-1 top-0 left-0 h-1 w-[48%] mx-auto mt-1 rounded-3xl bg-gray-200`}></div>
            <div className={`${picInd==0?"bg-gray-500":"bg-gray-200"} transition-all ease-in duration-100 mr-1 mx-auto absolute top-0 right-0 h-1 w-[48%] mt-1 rounded-3xl `}></div>
            <div className='absolute top-[50%] px-1 left-0' >
                <FaChevronCircleLeft onClick={prevPic} className="text-3xl text-white cursor-pointer" />
            </div>
            <div className='absolute top-[50%] px-1 right-0 ' >
                <FaChevronCircleRight onClick={nextPic} className="text-3xl text-white cursor-pointer" />
            </div>
            <div className='flex absolute bottom-0 pb-12 px-2 flex-col justify-start items-start' >
                <div className='flex text-white text-3xl font-bold justify-start gap-6' >
                    <span>{matches[ind]?.name}</span>
                    <span>{matches[0]?.age}</span>
                </div>
                <div>
                    <span className='text-white font-bold text-xl' >lives in {matches[0]?.location.address.split(',')[0]}</span>
                </div>
                <div>
                    <span className='text-white font-bold text-xl' >3kms away</span>
                </div>
            </div>
            <div style={{backgroundImage: "linear-gradient(transparent, black)"}} className='w-full h-[6rem] absolute bottom-0' ></div>
            <div className=' flex justify-around items-center'>
                <HiHeart onClick={()=>likeUserfunc(matches[ind]?._id)} className="text-red-700 text-4xl hover:scale-125 cursor-pointer" />
                <RiCloseCircleFill onClick={()=>dislikeUserfunc(matches[ind]?._id)} className="text-white text-4xl hover:scale-125 cursor-pointer" />
                <FaExclamation className="text-[yellow] text-3xl hover:scale-125 cursor-pointer" />
            </div>
        </div>
    </div>
  )
}

export default ShowMatch