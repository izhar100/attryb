import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import logo from '../assets/carlogo.webp'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../redux/authReducer/action'

const Navbar = () => {
    const isAuth = useSelector((store) => store.authReducer.isAuth)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const location=useLocation()
    const handleLogout=()=>{
        dispatch(userLogout)
    }
    return (
        <>
            <Box w={"100%"} bgColor={"#ffffff"} boxShadow={" rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;"} p={"10px"}>
                <Flex h={"50px"} justifyContent={"space-between"}>
                    <Flex>
                        <Image _hover={{cursor:"pointer"}} src={logo} w={"100%"} onClick={()=>navigate("/")}/>
                    </Flex>
                    <Flex w={"80%"} justifyContent={"right"} alignItems={"center"} gap={"40px"}>
                        <Text
                         fontSize={"18px"}
                         fontWeight={500}
                         _hover={{cursor:"pointer"}}
                         color={"#0026ff"}
                         borderBottom={location.pathname=="/"?"2px solid blue":"none"}
                         onClick={()=>navigate("/")}>
                            Home
                        </Text>
                        <Text
                        fontSize={"18px"}
                        fontWeight={500}
                        _hover={{cursor:"pointer"}}
                        color={"#0026ff"}
                        borderBottom={location.pathname=="/add"?"2px solid blue":"none"}
                         onClick={()=>navigate("/add")}>
                            Add Car
                        </Text>
                        {
                            isAuth
                            ?
                            <Button
                             colorScheme='red'
                             onClick={handleLogout}>
                            Logout
                           </Button>
                            :
                            <Button
                            colorScheme='blue'
                             onClick={()=>navigate("/login")}>
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
