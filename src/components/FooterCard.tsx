import { RiDoubleQuotesL } from "react-icons/ri";
const FooterCard = () => {
  return (
    <div  style={{minWidth:"32.16%"}} className='border-gray-400 border-[0.5px] rounded-md px-2 py-4' >
        <div className="flex items-center justify-between">
            <h1 className='text-white font-semibold border-b-[1px] basis-[70%] border-gray-400' >Shannon & Julian</h1>
            <RiDoubleQuotesL className="text-white mt-4 font-semibold text-6xl" />
        </div>
        <p className=' text-gray-500' >
        ...just gotten out of a bad breakup and created a Tinder account to keep my mind off the breakup. After about a week of talking, we decided to meet up at a local bar for drinks...we decided to tie the knot in an 18 person ceremony in New Jersey on June 27th 2020.
        </p>
    </div>
  )
}

export default FooterCard