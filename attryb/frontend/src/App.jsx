import { useState } from 'react'
import AllRoutes from './components/AllRoutes'
import Navbar from './components/Navbar'
import { Box } from '@chakra-ui/react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
     <AllRoutes/>
    </>
  )
}

export default App
