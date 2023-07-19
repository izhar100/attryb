import { Box, Button, Flex, Heading, Image, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getCars } from '../redux/carReducer/action'
import { ChevronDownIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { baseURL } from '../baseurl'

const Home = () => {
    const { isLoading, isError, cars } = useSelector((store) => {
        return {
            isLoading: store.carReducer.isLoading,
            isError: store.carReducer.isError,
            cars: store.carReducer.cars
        }
    }, shallowEqual)
    const isAuth = useSelector((store) => store.authReducer.isAuth)
    const [car, setCar] = useState([])
    const dispatch = useDispatch()
    const [order, setOrder] = useState("")
    const [filter, setFilter] = useState("")
    const [loading,setLoading]=useState(true)
    const [flag,setFlag]=useState(false)

    useEffect(() => {
        dispatch(getCars)
        try {
            setLoading(true)
            axios.get(baseURL + `/inventory?filter=${filter}&order=${order}`).then((res) => {
                setCar(res.data.inventory)
                setLoading(false)
            })
        } catch (error) {
            setLoading(false)
        }
    }, [order,filter,flag])

    const handleDelete=(id)=>{
        axios.delete(baseURL+`/inventory/${id}`).then((res)=>{
            setFlag(!flag)
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <>
            <br />
            <Flex w={{ xl: "80%", lg: "80%", md: "90%", sm: "90%", base: "90%" }} m={"auto"} justifyContent={"space-between"} flexDirection={{ xl: "row", lg: "row", md: "row", sm: "column", base: "column" }}>
                <Flex alignItems={"center"} gap={"20px"}>
                    <Text as={"b"}>SORT BY PRICE</Text>
                    <Text onClick={() => {
                        setOrder("desc")
                        setFilter("price")
                    }} _hover={{ cursor: "pointer" }} p={"5px"} pl={"10px"} pr={"10px"} bgColor={"#00ff22"} borderRadius={"10px"}>High to Low</Text>
                    <Text onClick={() => {
                        setOrder("asc")
                        setFilter("price")
                    }} _hover={{ cursor: "pointer" }} p={"5px"} pl={"10px"} pr={"10px"} bgColor={"#ffc400"} borderRadius={"10px"}>Low to High</Text>
                </Flex>
                <Flex alignItems={"center"} gap={"20px"}>
                    <Text as={"b"}>SORT BY MILEAGE</Text>
                    <Text onClick={() => {
                        setOrder("desc")
                        setFilter("mileage")
                    }} _hover={{ cursor: "pointer" }} p={"5px"} pl={"10px"} pr={"10px"} bgColor={"#00ff22"} borderRadius={"10px"}>High to Low</Text>
                    <Text onClick={() => {
                        setOrder("asc")
                        setFilter("mileage")
                    }} _hover={{ cursor: "pointer" }} p={"5px"} pl={"10px"} pr={"10px"} bgColor={"#ffc400"} borderRadius={"10px"}>Low to High</Text>
                </Flex>
                <Flex alignItems={"center"} gap={"20px"}>
                    <Text as={"b"}>SELECT COLOR</Text>
                    <Select
                        color={"blue"}
                        placeholder="Select Colors"
                        onChange={(e) =>{
                            setFilter("colors"), 
                            setOrder(e.target.value)
                        }}
                    >
                        <option value="Red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        <option value="olive">Olive</option>
                        <option value="tan">Tan</option>
                        <option value="grey">Grey</option>
                        <option value="black">Black</option>
                        <option value="white">White</option>
                        <option value="green">Green</option>
                        <option value="purple">Purple</option>
                        <option value="teal">Teal</option>
                        <option value="yellow">Yellow</option>
                    </Select>
                </Flex>
            </Flex>
            <br />
            <Box w={{ xl: "80%", lg: "80%", md: "90%", sm: "90%", base: "90%" }} m={"auto"}>
                <hr />
            </Box>
            <br />
            {
                loading
                ?
                <Heading textAlign={"center"}>Loading....</Heading>
                :
                <Box w={{ xl: "80%", lg: "80%", md: "90%", sm: "90%", base: "90%" }} m={"auto"}>
                <Box display={'grid'} gridTemplateColumns={{ xl: "repeat(4,1fr)", lg: "repeat(4,1fr)", md: "repeat(2,1fr)", sm: "repeat(1,1fr)", base: "repeat(1,1fr)" }} gap={"20px"}>
                    {
                        car?.map((el, ind) => {
                            return <>
                                <Box key={el._id} _hover={{ backgroundColor: "#b4f6ff", cursor: "pointer" }} textAlign={"center"} p={"10px"} boxShadow={" rgba(0, 0, 0, 0.24) 0px 3px 8px;"} borderRadius={"5px"}>
                                    <Image src={el.img} borderRadius={"5px"} />
                                    <br />
                                    <Text as={"b"}>{el.title}</Text>
                                    <Text>Price: ₹ {el.price}</Text>
                                    <Text>KMs on Odometer: {el.kms}</Text>
                                    <Text>Mileage: {el.oemId.mileage}/ltr</Text>
                                    <Text>Max Speed: {el.oemId.maxSpeed} kmph</Text>
                                    <Text>Colors:</Text>
                                    <Flex justifyContent={"space-between"}>{el.oemId.colors.map((e) => {
                                        return <>
                                            <Text bgColor={`${e}`} w={"50px"} h={"20px"} borderRadius={"5px"} >
                                            </Text>
                                        </>
                                    })}</Flex>
                                    <Text>Power: {el.oemId.power} HP</Text>
                                    <Text>Major Schratches: {el.majorSchratches}</Text>
                                    <Text>Registration Place: {el.registrationPlace}</Text>
                                    <Text>No. of Accidents: {el.accidents}</Text>
                                    <br />
                                    <Flex justifyContent={"center"}>
                                        {
                                            isAuth
                                                ?
                                                <Flex justifyContent={"space-between"} gap={"50px"}>
                                                    <Button colorScheme='blue'>Edit</Button>
                                                    <Button onClick={()=>handleDelete(el._id)} colorScheme='red'>Delete</Button>
                                                </Flex>
                                                :
                                                <Button colorScheme='blue'>View</Button>
                                        }
                                    </Flex>
                                </Box>

                            </>
                        })
                    }
                </Box>
            </Box>

            }
            
        </>
    )
}

export default Home
