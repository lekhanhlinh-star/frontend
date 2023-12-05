import {
    Avatar,
    Box,
    Breadcrumb, BreadcrumbLink,
    Flex,
    Heading,
    HStack, IconButton,
    Input,
    Spacer,
    Tooltip,
    useColorModeValue, WrapItem
} from "@chakra-ui/react";
import DrawerExample from "../MessageDrawer";
import { BellIcon, SettingsIcon } from "@chakra-ui/icons";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
    name: string;
    avt: string | null;
    id: string;
}

export const Head_Chat = () => {

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

    return (
        <Box as={"nav"} py={3} top={0} height={"70px"}
            bgGradient={useColorModeValue("linear(to-l,#05020b,#34073d)", "linear(to-l,#05020b,#34073d)")}
            zIndex={999}>
            <Flex justify="space-between" color={"white"}>
                <Avatar ml={10} ></Avatar>
                <Heading alignContent={"center"} ml={7} color={"white"}>Toàn Nguyễn</Heading>
                <Spacer />
            </Flex>
        </Box>



    );
};