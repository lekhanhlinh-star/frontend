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
    DrawerBody, Input, useToast,
} from '@chakra-ui/react'
import {
    FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import axios from 'axios'




interface User {
    name: string;
    avt: string | null;
    id: string;
}

export default function SideBarChat({ setCurrentId }: any) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (<Box minH="100vh" bg={useColorModeValue("white", 'gray.900')}>
        <SidebarContent setCurrentId={setCurrentId} onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
        <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            onOverlayClick={onClose}

        >
            <DrawerContent >
                <SidebarContent setCurrentId={setCurrentId} onClose={onClose} />
            </DrawerContent>
        </Drawer>


        <Box ml={{ base: 0, md: 60 }} p="4">
        </Box>

    </Box>)
}

interface SidebarProps extends BoxProps {
    onClose: () => void
    setCurrentId: Function
}

const SidebarContent = ({ onClose, setCurrentId, ...rest }: SidebarProps) => {
    const toast = useToast()

    const [listuser, setlistuser] = useState<User[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                await axios.get(`http://127.0.0.1:5000/api/v1/chats`,
                    {
                        headers: {
                            'Content-Type': 'application/json', 'authorization': `Bearer ${token}`,
                        }
                    }).then(respone => {
                        if (respone) {
                            respone.data.data
                                .map((temp: any) => {
                                    temp.users
                                        .map((temp2: any) => {
                                            setlistuser(prevList => [...prevList, {
                                                name: temp2.name,
                                                id: temp2._id,
                                                avt: temp2.profilePic
                                            }]);
                                        })
                                });
                        }
                    })
            } catch {

            }
        };
        fetchData();
    }, []);


    const handleClick = (id: string) => {
        setCurrentId(id)
    }

    return (<Box
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        // w={{ base: 'full' }}
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
        <Box borderBottomColor={"black"}

            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
            borderBottom="2px solid #ccc" >



            <Flex
                align="center"
                p="4"
                mx="4"
                mt={3}
                borderRadius="lg"
                role="group"
            // cursor="pointer"
            >
                <Avatar size={"lg"} src={"http://127.0.0.1:5000/uploads/1700656445602.png"}></Avatar>
                < Heading size={"10px"} ml={4}> Lê Khánh Linh</Heading>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
        </Box>
        <Box
            as="a"

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
            >
                <Heading as="h2" size="l">
                    Message
                </Heading>
            </Flex>
        </Box>
        <Box

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
                <Input placeholder={"search"} borderRadius={10} bg={"gray.100"} ></Input>
            </Flex>
        </Box>

        {listuser.map((link) =>
            <Box
                style={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
                minW={50}
                onClick={() => handleClick(link.id)}
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
                        // bgGradient: useColorModeValue("linear(to-l,#05020b,#34073d)", "linear(to-l, #7928CA, #FF0080)")
                    }}
                    {...rest}>
                    <Avatar src={`http://localhost:5000/uploads/${link.avt}`} mr={5}></Avatar>
                    <Text fontSize={"10px"}> {link.name}</Text>


                </Flex>
            </Box>
        )}

    </Box>)
}

