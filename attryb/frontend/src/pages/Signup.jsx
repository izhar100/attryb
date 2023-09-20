import { Box, Button, Flex, Heading, Image, Input, InputGroup, InputLeftElement, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import logo from "../assets/carlogo.webp"
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { BiSolidUser } from "react-icons/bi";
import axios from 'axios';
import { baseURL } from '../baseurl';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username,setUsername]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const toast=useToast()
    const navigate=useNavigate()
    const [loader,setLoader]=useState(false)

    const handleRegister=()=>{
        const user={
            username,
            email,
            password
        }
        setLoader(true)
       axios.post(baseURL+"/user/register",user).then((res)=>{
        setLoader(false)
        toast({
            title: 'Account created.',
            status: 'success',
            duration: 3000,
            position:"top"
        })
        navigate("/login")
        
       }).catch((err)=>{
        setLoader(false)
        toast({
            title: 'Something went wrong.',
            status: 'error',
            duration: 3000,
            position:"top"
        })
        console.log(err)
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
                <Heading textAlign={"center"}>Register</Heading>
                <br />
                <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                        <BiSolidUser size={"20px"} color='black.300' />
                    </InputLeftElement>
                    <Input value={username} onChange={(e)=>setUsername(e.target.value)} border={"1px solid black"} type='text' placeholder='username' />
                </InputGroup>
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
                <Button w={"100%"} onClick={handleRegister} colorScheme='blue'>{
                    loader ?<Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='md'/> :"REGISTER"
                }</Button>
            </Box>
            <br />
            <Text textAlign={"center"} fontSize={"18px"}>Already have an Account? <span style={{color:"blue",cursor:"pointer"}} onClick={()=>navigate("/login")}>Login</span></Text>
    </>
  )
}

export default Signup
