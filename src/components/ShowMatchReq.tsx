import  { useEffect } from 'react'
import { useAppDispatch, useAppSlector } from '../redux/store'
import { acceptMatchReq, getMatchReqs, rejectMatchReq } from '../redux/slices/MatchSlice';
import { Typography } from '@mui/material';
import {  FaHeart } from 'react-icons/fa';
import { MdCancel } from "react-icons/md";

const ShowMatchReq = () => {
    const dispatch = useAppDispatch();
    const matchState = useAppSlector((state)=>state.MatchSliceReducer)

    useEffect(()=>{
        dispatch(getMatchReqs(null))
    },[])

    useEffect(()=>{
        console.log(matchState)
    },[matchState])

if(matchState.loading){
    return <Typography className='text-white' fontSize={15} >Loading...</Typography>
}



  return (
    <>
        { matchState.requests.length && matchState.requests.map((e)=>
            <>
                <div className='flex items-center gap-6 w-full border-2 bg-[#DB2777] border-white px-3 py-1 rounded-xl' >
                    <img className='rounded-full w-[60px] h-[60px]' src={`${e.sender.photos.length<1?"https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg":e.sender.photos[0]}`} />
                    <div className='flex gap-12 items-center w-full' >
                        <Typography fontSize={20} fontWeight={600} className='text-[#0F172A] capitalize' >
                            {e.sender.name}
                        </Typography>
                        <div className='flex gap-2 items-center' >
                            <FaHeart onClick={()=>dispatch(acceptMatchReq(e._id))} className="hover:scale-125 cursor-pointer" style={{color:"#0F172A",fontSize:"1.75rem"}} />
                            <MdCancel onClick={()=>dispatch(rejectMatchReq(e._id))} className="hover:scale-125 cursor-pointer" style={{color:"#0F172A",fontSize:"1.75rem"}} />
                        </div>
                    </div>
                </div>
            </>
        )}
    </>
  )
}

export default ShowMatchReq