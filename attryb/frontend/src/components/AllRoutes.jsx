import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Home from '../pages/Home'
import Addcar from '../pages/Addcar'
import Private from './Private'

const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/add' element={
        <Private>
            <Addcar/>
        </Private>
        }/>
      </Routes>
    </>
  )
}

export default AllRoutes
