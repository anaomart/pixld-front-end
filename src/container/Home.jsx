import React, { useContext, useEffect, useRef, useState } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link, Route, Routes } from 'react-router-dom'
import logo from '../assets/logo.png'
import Pins from './Pins'
import Sidebar from '../components/Sidebar'
import UserProfile from '../components/UserProfile'
import { UserContext } from '../context/UserContext'
import { userRequest } from '../util/Request'

export default function Home() {
  const [toggleSidebar, setToggleSidebar] = useState(true)
  const {user, setUser} = useContext(UserContext)
  const scrollRef = useRef(null);
  useEffect(() => {
    async function getUserInfo() {
      const response = await userRequest.get('/user/userInfo')
      setUser(response.data.user[0])
    }
    getUserInfo();
  }, [])

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0)
  })

  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition duration-75 ease-out '>
      
      <div className='hidden md:flex h-screen flex-initial'>
      <Sidebar user={user && user} closeToggle={setToggleSidebar} />
      </div>
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu fontSize={40} className='cursor-pointer' onClick={() => setToggleSidebar(true)} />
          <Link to='/'>
            <img src={logo} className='ml-24 w-24' alt='logo' />
          </Link>'
          <Link to={``} >
            <img src={user?.image} className='w-20 rounded-lg' alt='pic' />
          </Link>

        </div>
        {toggleSidebar && (
        <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
          <div className='absolute w-full flex justify-end items-center p-2'>
            <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={() => setToggleSidebar(false)} />
          </div>
          <Sidebar user={user && user} closeToggle={setToggleSidebar} />
        </div>
      )}
      </div>
     
      <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route path='/*' element={<Pins user={user && user} />} />
        </Routes>

      </div>
    </div>
  )
}
