import { Socket } from "socket.io-client"
import { MatchType } from "../redux/slices/MatchSlice"
import { FaChevronCircleLeft } from "react-icons/fa"
import { IoSend } from "react-icons/io5"


const Chatscreen = ({ socket, chat, setSelectedChat }: { socket: Socket | null, chat: MatchType, setSelectedChat: React.Dispatch<React.SetStateAction<MatchType | undefined>> }) => {
  console.log(socket?.id, chat)
  return (
    <section className="px-2 flex flex-col gap-6" >
      <FaChevronCircleLeft onClick={() => setSelectedChat(undefined)} style={{ color: "white", fontSize: "1.25rem", cursor: "pointer", marginLeft: "6px" }} />
      <div className="flex items-center gap-4 border-b-[0.5px] pb-2 border-gray-400" >
        <img className="w-[60px] h-[60px] rounded-full" src={chat.users[1].photos[0]} />
        <h1 className="text-white font-bold font-poppins text-xl capitalize" >{chat.users[1].name}</h1>
      </div>
      <article className="mb-8" >
        <div className="messageContainer mt-2 flex flex-col items-start">
          <span style={{ maxWidth: "70%" }} className="text-white font-semibold bg-[#373E4E] px-4 py-2 rounded-xl break-words" >asdasdddddddddddddddddddddddasd</span>
        </div>
        
        <div className="messageContainer mt-6 flex flex-col items-end">
          <span style={{ maxWidth: "70%" }} className="text-white font-semibold bg-[#6a7082] px-4 py-2 rounded-xl break-words"  >asdasdasd</span>
        </div>
        <div className="messageContainer mt-6 flex flex-col items-end">
          <span style={{ maxWidth: "70%" }} className="text-white font-semibold bg-[#6a7082] px-4 py-2 rounded-xl break-words"  >asdasdasd</span>
        </div>
        <div className="messageContainer mt-6 flex flex-col items-end">
          <span style={{ maxWidth: "70%" }} className="text-white font-semibold bg-[#6a7082] px-4 py-2 rounded-xl break-words"  >asdasdasd</span>
        </div>
        <div className="messageContainer mt-6 flex flex-col items-end">
          <span style={{ maxWidth: "70%" }} className="text-white font-semibold bg-[#6a7082] px-4 py-2 rounded-xl break-words"  >asdasdasd</span>
        </div>
        <div className="messageContainer mt-6 flex flex-col items-end">
          <span style={{ maxWidth: "70%" }} className="text-white font-semibold bg-[#6a7082] px-4 py-2 rounded-xl break-words"  >asdasdasd</span>
        </div>
        <div className="messageContainer mt-2 flex flex-col items-start">
          <span style={{ maxWidth: "70%" }} className="text-white font-semibold bg-[#373E4E] px-4 py-2 rounded-xl break-words" >asdasdddddddddddddddddddddddasd</span>
        </div> <div className="messageContainer mt-2 flex flex-col items-start">
          <span style={{ maxWidth: "70%" }} className="text-white font-semibold bg-[#373E4E] px-4 py-2 rounded-xl break-words" >asdasdddddddddddddddddddddddasd</span>
        </div> <div className="messageContainer mt-2 flex flex-col items-start">
          <span style={{ maxWidth: "70%" }} className="text-white font-semibold bg-[#373E4E] px-4 py-2 rounded-xl break-words" >asdasdddddddddddddddddddddddasd</span>
        </div>
      </article>
      <div className="bottom-0 left-0 bg-slate-900 fixed z-30 w-[24%] p-2 flex items-center gap-3"  >
        <input className="w-[100%] rounded-md outline-none border-none px-1" />
        <IoSend style={{color:"white",cursor:"pointer"}} />
      </div>
    </section>
  )
}

export default Chatscreen