import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import logo from '../assets/carlogo.webp'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../redux/authReducer/action'

const Navbar = () => {
    const isAuth = useSelector((store) => store.authReducer.isAuth)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleLogout=()=>{
        dispatch(userLogout)
    }
    useEffect(()=>{
        console.log(isAuth)
    })
    return (
        <>
            <Box w={"100%"} bgColor={"#ffffff"} boxShadow={" rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;"} p={"10px"}>
                <Flex h={"50px"} justifyContent={"space-between"}>
                    <Flex>
                        <Image src={logo} w={"100%"} onClick={()=>navigate("/")}/>
                    </Flex>
                    <Flex alignItems={"center"} gap={"50px"}>
                        <Text onClick={()=>navigate("/")}>
                            Home
                        </Text>
                        <Text onClick={()=>navigate("/add")}>
                            Add Car
                        </Text>
                        {
                            isAuth
                            ?
                            <Button onClick={handleLogout}>
                            Logout
                           </Button>
                            :
                            <Button onClick={()=>navigate("/login")}>
                            Login
                            </Button>
                        }
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default Navbar
