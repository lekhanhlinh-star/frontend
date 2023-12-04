'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Text,
    Drawer,
    DrawerContent,
    useDisclosure,
    BoxProps,
    FlexProps,
    Avatar,
    Heading,
    DrawerOverlay,
    DrawerHeader,
    DrawerBody,
} from '@chakra-ui/react'

import axios from "axios";

interface LinkItemProps {
    name: string
    link: string
    avatar: string
}





export default function ListFollowing() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    // pos={"fixed"}
    return (<Box minH="100vh" bg={useColorModeValue("white", 'gray.900')}>
        <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
        <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            // returnFocusOnClose={}
            onOverlayClick={onClose}

        >
            <DrawerContent >
                <SidebarContent onClose={onClose} />
            </DrawerContent>
        </Drawer>
        {/* mobilenav */}

        <Box ml={{ base: 0, md: 60 }} p="4">
            {/* Content */}
        </Box>

    </Box>)
}

interface SidebarProps extends BoxProps {
    onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const [DataFollow, setDataFollow] = useState([] as any[]);
    // const LinkItems: Array<any> = []
    useEffect(() => {
        const getFollowing = async () => {
            await axios.get("http://localhost:5000/api/v1/users/me").then(
                response => {
                    const user_list_following = response.data.data["doc"]["following"]
                    console.log("user_list_following", user_list_following)
                    setDataFollow(user_list_following)

                }
            ).catch(err => {
                console.log(err)
            })

        }
        getFollowing()
    }, [rest]);

    return (<Box
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        w={{ base: 'full' }}
        maxHeight={"100%"}
        // pos={"fixed"}

        position={"fixed"}
        overflow={"scroll"}
        overflowY={"scroll"}
        overflowX={"hidden"}
        overscrollBehaviorY={"contain"}

        overscrollBehavior={"none"}
        style={{ transition: "transform 0.3s ease-in-out" }}

        {...rest}>
        <Box
            as="a"

            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                mt={3}
                borderRadius="lg"
                role="group"
                cursor="pointer"

            >

                <Heading as="h2" size="l">
                    List Following
                </Heading>



            </Flex>
        </Box>


        {DataFollow.map((link) => (<NavItem key={link.firstName} name={link.firstName + " " + link.lastName} link={`/profile/${link._id}`} avatar={`http://127.0.0.1:5000/uploads/${link.profilePic.filename}`}>
        </NavItem>))}
    </Box>)
}

interface NavItemProps extends FlexProps {
    name: string
    link: string
    avatar: string


}

const NavItem = ({ name, link, avatar, ...rest }: NavItemProps) => {
    return (<Box
        as="a"
        href={link}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
    >
        <Flex
            align="center"
            p="4"
            mx="4"
            mt={3}
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
                bg: "rgb(215,36,141)", color: 'white',
                bgGradient: useColorModeValue("linear(to-l,#05020b,#34073d)", "linear(to-l, #7928CA, #FF0080)")
            }}
            {...rest}>
            <Avatar src={avatar} mr={5}></Avatar>
            <Text fontSize={"10px"}> {name}</Text>


        </Flex>
    </Box>)
}
