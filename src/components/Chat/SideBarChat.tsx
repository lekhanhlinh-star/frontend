'use client'

import React, { ReactNode } from 'react'
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
    DrawerBody, Input,
} from '@chakra-ui/react'
import {
    FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'

interface LinkItemProps {
    name: string
    link: string
    avatar: string
}

const LinkItems: Array<LinkItemProps> = [{
    name: 'Toàn Nguyễn Thi',
    link: "/home",
    avatar: "http://localhost:5000/uploads/1700656445602.png"
}, {
    name: 'Nguyễn Huỳnh Thanh Toàn',
    link: "/home",
    avatar: "http://localhost:5000/uploads/1700656445602.png"
}, {
    name: 'Toàn Nguyễn',
    link: "/home",
    avatar: "http://localhost:5000/uploads/1700656445602.png"
}, {
    name: 'Toàn Nguyễn',
    link: "/home",
    avatar: "http://localhost:5000/uploads/1700656445602.png"
}, { name: 'Toàn Nguyễn', link: "/home", avatar: "http://127.0.0.1:5000/uploads/1701270079511.png" },
{ name: 'Toàn Nguyễn', link: "/home", avatar: "http://127.0.0.1:5000/uploads/1701270079511.png" },
{ name: 'Toàn Nguyễn', link: "/home", avatar: "http://127.0.0.1:5000/uploads/1701270079511.png" },
{ name: 'Toàn Nguyễn', link: "/home", avatar: "http://127.0.0.1:5000/uploads/1701270079511.png" },
{ name: 'Toàn Nguyễn', link: "/home", avatar: "http://127.0.0.1:5000/uploads/1701270079511.png" },
{ name: 'Toàn Nguyễn', link: "/home", avatar: "http://127.0.0.1:5000/uploads/1701270079511.png" }]


export default function SideBarChat() {
    const { isOpen, onOpen, onClose } = useDisclosure()


    // pos={"fixed"}
    return (<Box minH="100vh" bg={useColorModeValue("white", 'gray.900')}>
        <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
        <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            // returnFocusOnClose={}
            onOverlayClick={onClose}

        >
            <DrawerContent >
                <SidebarContent onClose={onClose} />
            </DrawerContent>
        </Drawer>
        {/* mobilenav */}
      {/* mobilenav */}
      {/*<MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />*/}

        <Box ml={{ base: 0, md: 60 }} p="4">
            {/* Content */}
        </Box>

    </Box>)
}

interface SidebarProps extends BoxProps {
    onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
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
                // cursor="pointer"

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



        {LinkItems.map((link) => (<NavItem key={link.name} name={link.name} link={link.link} avatar={link.avatar}>
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



interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  )
}