import React , {useState} from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Feed from '../components/Feed';
import Search from '../components/Search';
import CreatePin from '../components/CreatePin';
import PinDetail from '../components/PinDetail';
export default function Pins({user}) {
  const [searchTerm  , setSearchTerm] =useState('');
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
      </div>
      <Routes>
          <Route path='/' element={<Feed/>} />
          <Route path='/category/:categoryId' element={<Feed/>} />
          <Route path='/pin-detail/:pinId' element={<PinDetail user={user}/>} />
          <Route path='/create-pin' element={<CreatePin/>} />
          <Route path='/search' element={<Search  searchTerm={searchTerm}/>} />
      </Routes>
    </div>
  )
}
