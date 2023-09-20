import { useState } from 'react'
import AllRoutes from './components/AllRoutes'
import Navbar from './components/Navbar'
import { Box } from '@chakra-ui/react'

function App() {

  return (
    <>
    <Box position={"fixed"} w={"100%"} zIndex={1}>
    <Navbar/>
    </Box>
    <br />
    <br />
    <br />
     <AllRoutes/>
    </>
  )
}

export default App
