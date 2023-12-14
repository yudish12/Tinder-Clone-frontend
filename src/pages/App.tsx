import React from 'react'
import AppTopBar from '../components/AppTopBar'
import ShowMatch from '../components/ShowMatch'

const App = () => {
  return (
    <main className='h-[100vh] w-[100vw] flex'>
      <section className='w-1/3 h-full bg-slate-900' >
        <AppTopBar/>
      </section>
      <section className='w-full flex justify-center items-center bg-black h-full' >
        <ShowMatch/>
      </section>
    </main>
  )
}

export default App