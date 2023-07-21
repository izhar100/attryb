import { Box, Button, Flex, Heading, Image, Input, InputGroup, InputLeftElement, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import logo from "../assets/carlogo.webp"
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../redux/authReducer/action'

const Login = () => {
    const isAuth=useSelector((store)=>store.authReducer.isAuth)
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const toast=useToast()
    const location=useLocation()
    
    useEffect(()=>{
        console.log("isAuth :",isAuth)
    },[isAuth])

    const handleLogin=()=>{
        const user={
            email,
            password
        }
        dispatch(userLogin(user)).then((res)=>{
            if(res){
                toast({
                    title: 'Login Success.',
                    status: 'success',
                    duration: 3000,
                    position:"top"
                })
                if(location.state==null){
                    navigate("/")
                }else{
                    navigate(location.state)
                }
            }else{
                toast({
                    title: 'Wrong credentials.',
                    status: 'error',
                    duration: 3000,
                    position:"top"
                }) 
            }
        })
    }
    return (
        <>
            <br />
            <br />
            <Box w={{xl:"40%",lg:"40%",md:"60%",sm:"80%",base:"80%"}} m={"auto"} p={"50px"} borderRadius={"10px"} bgColor={"#e8e9ff"}>
                <Flex justifyContent={"center"}>
                    <Image src={logo} w="50px" />
                </Flex>
                <Heading textAlign={"center"}>Login</Heading>
                <br />
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <EmailIcon color='black.300' />
                    </InputLeftElement>
                    <Input value={email} onChange={(e)=>setEmail(e.target.value)} border={"1px solid black"} type='email' placeholder='email' />
                </InputGroup>
                <br />
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <LockIcon color='black.300' />
                    </InputLeftElement>
                    <Input value={password} onChange={(e)=>setPassword(e.target.value)} border={"1px solid black"} type='password' placeholder='password' />
                </InputGroup>
                <br />
                <Button onClick={handleLogin} w={"100%"} colorScheme='blue'>LOGIN</Button>
            </Box>
            <br />
            <Text textAlign={"center"} fontSize={"18px"}>Don't have an Account? <span style={{color:"blue",cursor:"pointer"}} onClick={()=>navigate("/signup")}>Create Account</span></Text>
        </>
    )
}

export default Login
