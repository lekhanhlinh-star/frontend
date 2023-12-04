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
import {BellIcon, SettingsIcon} from "@chakra-ui/icons";
import React from "react";

export const Head_Chat = () => {
    return (
         <Box as={"nav"} py={3}  top={0} height={"70px"}
             bgGradient={  useColorModeValue(  "linear(to-l,#05020b,#34073d)", "linear(to-l,#05020b,#34073d)")}
             zIndex={999}>
            <Flex justify="space-between"   color={"white"}>



                <Avatar ml={10} ></Avatar>
                <Heading alignContent={"center"} ml={7} color={"white"}>Toàn Nguyễn</Heading>

                <Spacer/>



            </Flex>
        </Box>



    );
};