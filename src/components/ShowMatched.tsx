import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSlector } from '../redux/store'
import { MatchType, getMatchedUsers } from '../redux/slices/MatchSlice';
import { Socket, io } from "socket.io-client";
import Chatscreen from '../pages/Chatscreen';
import { Typography } from '@mui/material';

const ShowMatched = () => {
  const [socketState, setSocketState] = useState<Socket | null>(null)
  const [selectedChat, setSelectedChat] = useState<MatchType>()
  const { users } = useAppSlector((state) => state.MatchSliceReducer)
  const currUser = JSON.parse(localStorage.getItem('user')!);
  useEffect(() => {
    let socket: Socket;
    try {
      socket = io(`${import.meta.env.VITE_DEV_API_URI}`);
      socket.auth = currUser
      socket.connect()
      setSocketState(socket)
    } catch (error) {
      console.log(error)

    }
    return () => {
      socket.disconnect()
    }
  }, [])


  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMatchedUsers(null))
  }, [])


  const chatSelectHandler = (e:MatchType)=>{
    socketState?.emit('joinroom',e)
    setSelectedChat(e)
  }


  return (
    <>
      {selectedChat ?
        <Chatscreen setSelectedChat={setSelectedChat} socket={socketState} chat={selectedChat} /> :
        <>
          {users?.length ? users?.map((e) => {
            const otherUser = e.users[0].email===currUser?.email?e.users[1]:e.users[0];
            return (
              <div onClick={()=>chatSelectHandler(e)} className='flex mt-4 cursor-pointer items-center gap-6 w-full border-2 bg-[#DB2777] border-white px-3 py-1 rounded-xl' >
                <img className='rounded-full w-[60px] h-[60px]'
                  src={
                    `${otherUser.photos.length < 1 ?
                      "https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" :
                      otherUser.photos[0]}`
                  }
                />
                <div className='flex gap-12 items-center w-full' >
                  <div>
                    <Typography fontSize={20} fontWeight={600} className='text-[#0F172A] capitalize' >
                      {otherUser.name}
                    </Typography>
                    <span className='text-[#0F172A] text-sm font-semibold' >Click here to start chat</span>
                  </div>
                </div>
              </div>
            )
          }
          ):<Typography style={{color:"white"}} >No matches yet</Typography>}
        </>
      }
    </>
  )
}

export default ShowMatched