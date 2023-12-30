
import { useState } from 'react'
import AppTopBar from '../components/AppTopBar'
import MobileNavBar from '../components/MobileNavBar'
import ShowMatch from '../components/ShowMatch'
import Photoscreen from './Photoscreen'
import ShowMatchReq from '../components/ShowMatchReq'
import ProfilePage from './ProfilePage'
import ShowMatched from '../components/ShowMatched'

const App = () => {
  const [mobileTabNumber,setMobileTabNumber] = useState<number>(0);
  return (
    <main className='h-[100vh] w-[100vw] flex overflow-hidden relative'>
      {/* big screens view */}
      <section className='xl:w-1/3 lg:w-[40%] w-0 overflow-auto scrollable-section bg-slate-900 ' >
        <AppTopBar/>
      </section>
      <section className='w-full hidden lg:flex justify-center items-center bg-black h-full' >
       <ShowMatch />
      </section>
      {/* mobile screen view */}
      <section style={{height:"93.2%",padding:"10px"}} className='w-full overflow-auto scrollable-section lg:hidden flex justify-center items-center bg-black ' >
        {mobileTabNumber===0 && <ShowMatch/>}
        {mobileTabNumber===1 && <Photoscreen/>}
        {mobileTabNumber===2 && <ShowMatchReq/>}
        {mobileTabNumber===3 && <ProfilePage/>}
        {mobileTabNumber===4 && <ShowMatched/>}
      </section>
      <div className='w-[100%] h-12 flex lg:hidden justify-center absolute bottom-0' >
        <MobileNavBar setMobileTabNumber={setMobileTabNumber} />
      </div>
    </main>
  )
}

export default App