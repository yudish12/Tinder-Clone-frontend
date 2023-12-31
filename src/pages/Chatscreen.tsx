import { Socket } from "socket.io-client"
import { MatchType } from "../redux/slices/MatchSlice"
import { FaChevronCircleLeft } from "react-icons/fa"
import { IoSend } from "react-icons/io5"
import { useAppDispatch, useAppSlector } from "../redux/store"
import { useEffect, useState } from "react"
import { fetchChats, sendMessage } from "../redux/slices/Chatslice"
import { Typography } from "@mui/material"


const Chatscreen = ({ socket, chat, setSelectedChat }: { socket: Socket | null, chat: MatchType, setSelectedChat: React.Dispatch<React.SetStateAction<MatchType | undefined>> }) => {
  const dispatch = useAppDispatch();
  const chats = useAppSlector((state) => state.ChatsliceReducer)
  const currUser = JSON.parse(localStorage.getItem('user')!)
  const [currMessage, setCurrMessage] = useState<string>('');
  const otherUser = chat.users.filter((e) => e.email !== currUser.email);

  useEffect(() => {
    dispatch(fetchChats(chat._id));
    socket?.on('message', (params) => {
      console.log(params)
      dispatch(fetchChats(chat._id))
    })

  }, [])

  const sendMessageHandler = () => {
    if (chats.matchId, currMessage) {
      dispatch(sendMessage({
        matchId: chats.matchId,
        message: currMessage,
        recieverId: chat._id
      }))
      socket?.emit('messagesent', {
        _id: chat._id,
        message: currMessage,
      })
      setCurrMessage('')
    }

  }

  return (
    <section className="px-2 flex flex-col gap-6" >
      <FaChevronCircleLeft onClick={() => setSelectedChat(undefined)} style={{ color: "white", fontSize: "1.25rem", cursor: "pointer", marginLeft: "6px" }} />
      <div className="flex items-center gap-4 border-b-[0.5px] pb-2 border-gray-400" >
        <img className="w-[60px] h-[60px] rounded-full" src={otherUser[0].photos.length ? otherUser[0].photos[0] : "https://as1.ftcdn.net/v2/jpg/02/43/12/34/1000_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"} />
        <h1 className="text-white font-bold font-poppins text-xl capitalize" >{otherUser[0].name}</h1>
      </div>
      {!chats.loading ?
        (<article className="mb-8" >
          {chats.message.length && chats.message.map((e) => e.sender && e.sender?.email !== currUser?.email ?
            <div className="messageContainer mt-2 flex flex-col items-start">
              <span style={{ maxWidth: "70%" }} className="text-white font-semibold bg-[#373E4E] px-4 py-2 rounded-xl break-words" >{e.message}</span>
            </div> :
            <div className="messageContainer mt-2 flex flex-col items-end">
              <span style={{ maxWidth: "70%" }} className="text-white font-semibold bg-[#6a7082] px-4 py-2 rounded-xl break-words"  >{e.message}</span>
            </div>
          )}
        </article>) :
        <Typography className="text-white" >Loading...</Typography>}
      <div className="bottom-0 left-0 bg-slate-900 fixed z-30 w-[24%] p-2 flex items-center gap-3"  >
        <input onChange={(e) => setCurrMessage(e.target.value)} value={currMessage} className="w-[100%] rounded-md outline-none border-none px-1" />
        <IoSend onClick={sendMessageHandler} style={{ color: "white", cursor: "pointer" }} />
      </div>
    </section>
  )
}

export default Chatscreen