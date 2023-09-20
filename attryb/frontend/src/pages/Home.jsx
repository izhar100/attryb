import { Box, Button, Flex, FormLabel, Heading, Image, Input, Select, Text, useDisclosure, useToast } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getCars } from '../redux/carReducer/action'
import { ChevronDownIcon } from '@chakra-ui/icons'
import {TbFaceIdError} from "react-icons/tb";
import axios from 'axios'
import { baseURL } from '../baseurl'
import Loader from '../components/Loader'

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
    const [loading, setLoading] = useState(true)
    const [flag, setFlag] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [editCar, setEditCar] = useState({})
    const toast=useToast()

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
    }, [order, filter, flag])

    const handleDelete = (id) => {
        axios.delete(baseURL + `/inventory/delete/${id}`).then((res) => {
            setFlag(!flag)
            toast({
                title: 'Inventory deleted',
                status: 'warning',
                duration: 3000,
                position: "top"
            })
        }).catch((err) => {
            console.log(err)
            toast({
                title: 'something went wrong',
                status: 'error',
                duration: 3000,
                position: "top"
            })
        })
    }
    const handleEdit = (el) => {
        onOpen()
        setEditCar(el)
    }

    const handleUpdate = () => {
        axios.patch(baseURL + `/inventory/update/${editCar._id}`, editCar).then((res) => {
            setFlag(!flag)
            toast({
                title: 'Inventory updated',
                status: 'success',
                duration: 3000,
                position: "top"
            })
            onClose()
        }).catch((err) => {
            console.log(err)
            toast({
                title: 'something went wrong!',
                status: 'error',
                duration: 3000,
                position: "top"
            })
        })
    }

    return (
        <>
            <br />
            <Flex w={{ xl: "80%", lg: "80%", md: "90%", sm: "90%", base: "90%" }} m={"auto"} justifyContent={"space-between"} flexDirection={{ xl: "row", lg: "row", md: "row", sm: "column", base: "column" }}
            gap={"10px"}
            >
                <Flex alignItems={"center"} gap={"20px"}>
                    <Text 
                    fontSize={{lg:"16px",md:"14px",sm:"13px",base:"13px"}}
                    fontWeight={700}
                    >SORT BY PRICE</Text>
                    <Text
                    fontSize={{lg:"16px",md:"14px",sm:"13px",base:"13px"}} fontWeight={700}
                     onClick={() => {
                        setOrder("desc")
                        setFilter("price")
                    }} _hover={{ cursor: "pointer" }} p={"5px"} pl={"10px"} pr={"10px"} bgColor={"#00ff22"} borderRadius={"10px"}>High to Low</Text>
                    <Text
                    fontSize={{lg:"16px",md:"14px",sm:"13px",base:"13px"}} fontWeight={700}
                     onClick={() => {
                        setOrder("asc")
                        setFilter("price")
                    }} _hover={{ cursor: "pointer" }} p={"5px"} pl={"10px"} pr={"10px"} bgColor={"#ffc400"} borderRadius={"10px"}>Low to High</Text>
                </Flex>
                <Flex alignItems={"center"} gap={"20px"}>
                    <Text 
                    fontSize={{lg:"16px",md:"14px",sm:"13px",base:"13px"}}
                    fontWeight={700}
                    >SORT BY MILEAGE</Text>
                    <Text
                    fontSize={{lg:"16px",md:"14px",sm:"13px",base:"13px"}} fontWeight={700}
                     onClick={() => {
                        setOrder("desc")
                        setFilter("mileage")
                    }} _hover={{ cursor: "pointer" }} p={"5px"} pl={"10px"} pr={"10px"} bgColor={"#00ff22"} borderRadius={"10px"}>High to Low</Text>
                    <Text 
                    fontSize={{lg:"16px",md:"14px",sm:"13px",base:"13px"}} fontWeight={700}
                    onClick={() => {
                        setOrder("asc")
                        setFilter("mileage")
                    }} _hover={{ cursor: "pointer" }} p={"5px"} pl={"10px"} pr={"10px"} bgColor={"#ffc400"} borderRadius={"10px"}>Low to High</Text>
                </Flex>
                <Flex alignItems={"center"} gap={"20px"}>
                    <Text 
                    fontSize={{lg:"16px",md:"14px",sm:"13px",base:"13px"}} fontWeight={700}
                    >SELECT COLOR</Text>
                    <Select
                        color={"blue"}
                        placeholder="Select Colors"
                        onChange={(e) => {
                            setFilter("colors"),
                                setOrder(e.target.value)
                        }}
                    >
                        <option value="red">Red</option>
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
                    <Loader/>
                    :
                    car.length==0
                    ?
                    <Flex alignItems={"center"} justifyContent={"center"} h={"50vh"} flexDirection={"column"}>
                        <TbFaceIdError size={"40px"} color='#000000'/>
                        <Text fontSize={"25px"} fontWeight={700} textAlign={"center"}>Sorry! Car not found...</Text>
                    </Flex>
                    :
                    <Box w={{ xl: "80%", lg: "80%", md: "90%", sm: "90%", base: "90%" }} m={"auto"}>
                        <Box display={'grid'} gridTemplateColumns={{ xl: "repeat(4,1fr)", lg: "repeat(4,1fr)", md: "repeat(2,1fr)", sm: "repeat(1,1fr)", base: "repeat(1,1fr)" }} gap={"20px"}>
                            {
                                car?.map((el, ind) => {
                                    return (
                                        <Box key={ind} _hover={{ backgroundColor: "#b4f6ff", cursor: "pointer" }} textAlign={"center"} p={"10px"} boxShadow={" rgba(0, 0, 0, 0.24) 0px 3px 8px;"} borderRadius={"5px"}>
                                            <Image src={el.img} borderRadius={"5px"} w={"100%"} h={"200px"} />
                                            <br />
                                            <Text as={"b"}>{el.title}</Text>
                                            <Text>Price: ₹ {el.price}</Text>
                                            <Text>KMs on Odometer: {el.kms}</Text>
                                            <Text>Mileage: {el.oemId.mileage}/ltr</Text>
                                            <Text>Max Speed: {el.oemId.maxSpeed} kmph</Text>
                                            <Text>Colors:</Text>
                                            <Flex justifyContent={"space-between"}
                                            mr={"5%"} ml={"5%"}
                                            >{el.oemId.colors.map((e,i) => {
                                                return (
                                                    <Text key={i} bgColor={`${e}`} w={"35px"} h={"35px"} borderRadius={"50%"} >
                                                    </Text>
                                                )
                                            })}</Flex>
                                            <Text>Power: {el.oemId.power} HP</Text>
                                            <Text>Major Schratches: {el.majorSchratches}</Text>
                                            <Text>Registration Place: {el.registrationPlace}</Text>
                                            <Text>No. of Accidents: {el.accidents}</Text>
                                            <Text>No. of Previous buyers: {el.prevBuyers}</Text>
                                            <br />
                                            <Flex justifyContent={"center"}>
                                                {
                                                    isAuth
                                                        ?
                                                        <Flex justifyContent={"space-between"} gap={"50px"}>
                                                            <Button onClick={() => handleEdit(el)} colorScheme='blue'>Edit</Button>
                                                            <Button onClick={() => handleDelete(el._id)} colorScheme='red'>Delete</Button>
                                                        </Flex>
                                                        :
                                                        ""
                                                }
                                            </Flex>
                                        </Box>
                                    )
                                })
                            }
                        </Box>
                    </Box>

            }
            {/* update modal */}
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Car Information</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormLabel>Title</FormLabel>
                        <Input value={editCar.title} onChange={(e) => setEditCar({ ...editCar, title: e.target.value })} border={"1px solid black"} type='text' placeholder='Change title' />
                        <br />
                        <br />
                        <FormLabel>Price</FormLabel>
                        <Input value={editCar.price} onChange={(e) => setEditCar({ ...editCar, price: e.target.value })} border={"1px solid black"} type='text' placeholder='Change Car Price' />
                        <br />
                        <br />
                        <FormLabel>KMs on Odometer</FormLabel>
                        <Input value={editCar.kms} onChange={(e) => setEditCar({ ...editCar, kms: e.target.value })} border={"1px solid black"} type='text' placeholder='Change KMs on Odometer' />
                        <br />


                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleUpdate} colorScheme='blue' mr={3}>
                            Update
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

export default Home
