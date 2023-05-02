import React, { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Home from './container/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { userRequest } from './util/Request'
export default function App() {
  
  return (
    <Routes>
      <Route element={<ProtectedRoute/>}>
            <Route path='/*' element={<Home />} />
      </Route>
        <Route path='/login' element={<Login />} />
    </Routes>
  )
}
