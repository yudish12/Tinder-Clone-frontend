import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSlector } from '../redux/store'
import { MatchType, getMatchedUsers } from '../redux/slices/MatchSlice';
import { Socket, io } from "socket.io-client";
import Chatscreen from '../pages/Chatscreen';
import { Typography } from '@mui/material';

const ShowMatched = () => {
  const [socketState, setSocketState] = useState<Socket | null>(null)
  const [selectedChat,setSelectedChat] = useState<MatchType>()
  const { users } = useAppSlector((state) => state.MatchSliceReducer)
  useEffect(() => {
    let socket:Socket;
    try {
      socket = io(`${import.meta.env.VITE_DEV_API_URI}`);
      setSocketState(socket)
    } catch (error) {
      console.log(error)

    }
    return ()=>{
      socket.disconnect()
    }
  }, [])


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMatchedUsers(null))
  }, [])


  return (
    <>
      {selectedChat ?
        <Chatscreen setSelectedChat={setSelectedChat} socket={socketState} chat={selectedChat} /> :
        <>
          {users?.length && users?.map((e) =>
            <div onClick={()=>setSelectedChat(e)} className='flex mt-4 cursor-pointer items-center gap-6 w-full border-2 bg-[#DB2777] border-white px-3 py-1 rounded-xl' >
              <img className='rounded-full w-[60px] h-[60px]'
                src={
                  `${e.users[1].photos.length < 1 ?
                    "https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" :
                    e?.users[1].photos[0]}`
                }
              />
              <div className='flex gap-12 items-center w-full' >
                <div>
                  <Typography fontSize={20} fontWeight={600} className='text-[#0F172A] capitalize' >
                    {e.users[1].name}
                  </Typography>
                  <span className='text-[#0F172A] text-sm font-semibold' >Click here to start chat</span>
                </div>
              </div>
            </div>
          )}
        </>
      }
    </>
  )
}

export default ShowMatched