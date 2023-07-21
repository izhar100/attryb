import React from 'react'
import { Box, Skeleton, SkeletonCircle, SkeletonText, Stack } from '@chakra-ui/react'

const Loader = () => {
    return (
        <>
            <Box w={{ xl: "80%", lg: "80%", md: "90%", sm: "90%", base: "90%" }} m={"auto"} display={"grid"} gridTemplateColumns={{ xl: "repeat(4,1fr)", lg: "repeat(4,1fr)", md: "repeat(2,1fr)", sm: "repeat(1,1fr)", base: "repeat(1,1fr)" }} gap={"20px"} >
                <Stack>
                    <Skeleton height='150px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                </Stack>
                <Stack>
                    <Skeleton height='150px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                </Stack>
                <Stack>
                    <Skeleton height='150px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                </Stack>
                <Stack>
                    <Skeleton height='150px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                </Stack>
                <Stack>
                    <Skeleton height='150px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                </Stack>
                <Stack>
                    <Skeleton height='150px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                </Stack>
                <Stack>
                    <Skeleton height='150px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                </Stack>
                <Stack>
                    <Skeleton height='150px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                    <Skeleton height='10px' />
                </Stack>
            </Box>
        </>
    )
}

export default Loader
