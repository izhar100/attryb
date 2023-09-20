import { Box, Button, Flex, Heading, Image, Input, InputGroup, InputLeftElement, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import logo from "../assets/carlogo.webp"
import axios from 'axios'
import { baseURL } from '../baseurl'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { addCarfun } from '../redux/carReducer/action'

const Addcar = () => {
    const token=useSelector((store)=>store.authReducer.token)
    const user=useSelector((store)=>store.authReducer.user)
    const initData = {
        kms: "",
        majorSchratches: "",
        orginalPaint: "",
        accidents: "",
        prevBuyers: "",
        registrationPlace: "",
        oemId: "",
        userId: "",
        img: "",
        title: "",
        price: "",
        des: ""
    }
    const [carData, setCarData] = useState(initData)
    const [oem, setOem] = useState([])
    const [allData,setAllData]=useState([])
    const [search, setSearch] = useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const dispatch=useDispatch()
    useEffect(() => {
        axios.get(baseURL + "/spec").then((res) => {
            setOem(res.data.specs)
            setAllData(res.data.specs)
        })
    }, [])
    const handleOemSelect = (el) => {
        setCarData({ ...carData, oemId: el })
        onClose()
    }
    const addCar = () => {
        carData.price = +carData.price
        carData.accidents = +carData.accidents
        carData.prevBuyers = +carData.prevBuyers
        carData.userId=user._id
        dispatch(addCarfun(carData,token))
    }
    useEffect(()=>{
        const data=allData.filter((el)=>{
            if(el.modelName.toLowerCase().includes(search.toLowerCase())){
                return el;
            }
        })
        setOem(data)
    },[search])
   
    return (
        <>
            <br />
            <Box w={{ xl: "40%", lg: "40%", md: "60%", sm: "80%", base: "80%" }} m={"auto"} p={"50px"} borderRadius={"10px"} bgColor={"#e8e9ff"}>
                <Flex justifyContent={"center"}>
                    <Image src={logo} w="50px" />
                </Flex>
                <Heading textAlign={"center"}>Add new car</Heading>
                <br />
                <br />
                <Button onClick={onOpen} w={"100%"}
                fontSize={{xl:"16px",lg:"16px",md:"14px",sm:"10px",base:"10px"}}
                 colorScheme={carData.oemId !== "" ? 'green' : 'blue'} isDisabled={carData.oemId !== ""}>{
                    carData.oemId !== "" ? 'Original Equipement Manufacture selected'
                        : 'Select Original Equipement Manufacture'
                }</Button>
                <br />
                <br />

                <Input value={carData.title} onChange={(e) => setCarData({ ...carData, title: e.target.value })} border={"1px solid black"} type='text' placeholder='Enter title here...' />
                <br />
                <br />

                <Input value={carData.kms} onChange={(e) => setCarData({ ...carData, kms: e.target.value })} border={"1px solid black"} type='text' placeholder='KMs on Odometer...' />
                <br />
                <br />

                <Input value={carData.des} onChange={(e) => setCarData({ ...carData, des: e.target.value })} border={"1px solid black"} type='text' placeholder='Enter description...' />
                <br />
                <br />
                <Input value={carData.img} onChange={(e) => setCarData({ ...carData, img: e.target.value })} border={"1px solid black"} type='text' placeholder='Enter image url...' />
                <br />
                <br />
                <Input value={carData.majorSchratches} onChange={(e) => setCarData({ ...carData, majorSchratches: e.target.value })} border={"1px solid black"} type='text' placeholder='Enter Major Schratches in Yes or No' />
                <br />
                <br />
                <Input value={carData.orginalPaint} onChange={(e) => setCarData({ ...carData, orginalPaint: e.target.value })} border={"1px solid black"} type='text' placeholder='Enter Original Paint in Yes or No' />
                <br />
                <br />
                <Input value={carData.price} onChange={(e) => setCarData({ ...carData, price: e.target.value })} border={"1px solid black"} type='text' placeholder='Enter Car Price' />
                <br />
                <br />
                <Input value={carData.accidents} onChange={(e) => setCarData({ ...carData, accidents: e.target.value })} border={"1px solid black"} type='text' placeholder='Number of accidents reported' />
                <br />
                <br />
                <Input value={carData.prevBuyers} onChange={(e) => setCarData({ ...carData, prevBuyers: e.target.value })} border={"1px solid black"} type='text' placeholder='Number of previous buyers' />
                <br />
                <br />
                <Input value={carData.registrationPlace} onChange={(e) => setCarData({ ...carData, registrationPlace: e.target.value })} border={"1px solid black"} type='text' placeholder='Registration Place' />
                <br />
                <br />
                <Button w={"100%"} colorScheme='blue' onClick={addCar}>ADD CAR</Button>
            </Box>
            <br />
            {/* Modal for available OEM specs models */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign={"center"}>Available OEM models</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Input placeholder='search model here...' onChange={(e)=>setSearch(e.target.value)} value={search} />
                        <br />
                        <br />
                        <Text textAlign={"center"}>Click on car to select</Text>
                        <br />
                        <Box display={'grid'} gridTemplateColumns={"repeat(3,1fr)"} gap={"10px"}>
                            {oem?.map((el) => {
                                return <>
                                    <Box key={el._id} onClick={() => handleOemSelect(el)} _hover={{ backgroundColor: "#b4f6ff", cursor: "pointer" }} textAlign={"center"} p={"5px"} boxShadow={" rgba(0, 0, 0, 0.24) 0px 3px 8px;"} borderRadius={"5px"}>
                                        <Image src={el.image} borderRadius={"5px"} />
                                        <Text>Name: {el.modelName}</Text>
                                        <Text>Year: {el.modelYear}</Text>
                                        <Text>Price: ₹ {el.listPrice}</Text>

                                    </Box>
                                </>
                            })}
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Addcar
