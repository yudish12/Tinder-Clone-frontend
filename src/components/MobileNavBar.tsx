import { RiUserSettingsFill } from "react-icons/ri";
import { BiHome, BiSolidBellRing } from "react-icons/bi";
import { FaMessage } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
const MobileNavBar = ({setMobileTabNumber}:{setMobileTabNumber: React.Dispatch<React.SetStateAction<number>>}) => {
  return (
    <div className="inner flex w-full h-full bg-slate-900 justify-evenly">
        <BiHome onClick={()=>setMobileTabNumber(0)} style={{color:"white",cursor:"pointer",height:"100%",fontSize:"2rem"}} />
        <RiUserSettingsFill onClick={()=>setMobileTabNumber(1)}  style={{color:"white",cursor:"pointer",height:"100%",fontSize:"2rem"}} />
        <BiSolidBellRing onClick={()=>setMobileTabNumber(2)}  style={{color:"white",cursor:"pointer",height:"100%",fontSize:"2rem"}} />
        <IoSettings onClick={()=>setMobileTabNumber(3)}  style={{color:"white",cursor:"pointer",height:"100%",fontSize:"2rem"}} />
        <FaMessage onClick={()=>setMobileTabNumber(4)}  style={{color:"white",cursor:"pointer",height:"100%",fontSize:"2rem"}} />
    </div>
  )
}

export default MobileNavBar