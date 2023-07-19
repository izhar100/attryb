import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import Login from '../pages/Login'

const Private = ({children}) => {
  const isAuth = useSelector((store) => store.authReducer.isAuth)
  const location=useLocation()
  return (
    <>
      {isAuth?children:<Navigate state={location.pathname} to={"/login"} />}
    </>
  )
}

export default Private
