import React from 'react'
import AppTopBar from '../components/AppTopBar'

const App = () => {
  return (
    <main className='h-[100vh] w-[100vw]'>
      <section className='w-1/4 h-full bg-slate-900' >
        <AppTopBar/>
      </section>
    </main>
  )
}

export default App