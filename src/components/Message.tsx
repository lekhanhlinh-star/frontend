import { Box, Button, Flex, Input, InputRightElement, Text, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import SideBarChat from "./Chat/SideBarChat";
import { Head_Chat } from "./Chat/Head_Chat";
import axios from "axios";
import socketIOClient from 'socket.io-client';
import { IoIosSend } from "react-icons/all";

interface Mess {
    content: string | null;
    sender: number;
    // createAt: string;
}

interface User {
    name: string;
    avt: string | null;
    id: string;
}

interface CurChat {
    currentid: string;
    user: User
}

interface userData {
    _id: string | null
}

const socket = socketIOClient('http://localhost:5000'); // Replace with your Socket.IO server URL

export function Message() {
    const [currentchatinfo, setcurrentchatinfo] = useState<CurChat>()

    const [currentmess, setcurrentmess] = useState<Mess[]>([]);
    const [message, setMessage] = useState("");

    const [isTyping, setIsTyping] = useState(false);

    const userid = localStorage.getItem("_id")

    const userdata: userData = {
        _id: userid
    }

    useEffect(() => {
        console.log("use")
        socket.emit('setup', userdata);

        socket.on('connected', () => {
            console.log("connected success")
        });

        const handleNewMessage = (newMessage: any) => {
            console.log("message received")
            setcurrentmess((prevMessages) => [...prevMessages, newMessage]);
        };
        socket.on('message received', handleNewMessage);

        const handleTyping = () => {
            console.log("--------------------------------------")
            setIsTyping(true);
        };
        socket.on('typing', handleTyping);

        const handleStopTyping = () => {
            setIsTyping(false);
        };
        socket.on('stop typing', handleStopTyping);

        return () => {
            console.log("disconnected")
            socket.removeListener('message received', handleNewMessage);
            socket.removeListener('typing', handleTyping);
            socket.removeListener('stop typing', handleStopTyping);
            socket.disconnect();
        }

    }, []);

    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            console.log(newMessageRecieved)
            if (currentchatinfo?.user.id === newMessageRecieved.sender._id) {
                setcurrentmess([...currentmess, {
                    content: newMessageRecieved.content, sender: 0
                }]);

            }


        });
    });

    const handleTyping = () => {

        socket.emit('typing', currentchatinfo?.user.id);
    };

    const handleStopTyping = () => {
        socket.emit('stop typing', currentchatinfo?.user.id);
    };


    const handleclick = async (e: any) => {
        try {
            console.log("onSubmit")
            if (message && currentchatinfo) {
                socket.emit('new message', {
                    chat: {
                        users: [{ _id: currentchatinfo?.user.id }]
                    }, sender: userdata, content: message
                });


                setcurrentmess([...currentmess, {
                    content: message, sender: 1
                }]);
                setMessage('');
                console.log(message, currentchatinfo)
                const token = localStorage.getItem("token");
                await axios.post('http://localhost:5000/api/v1/messages', {
                    content: message, chatId: currentchatinfo.currentid,
                }, {
                    headers: {
                        'Content-Type': 'application/json', 'authorization': `Bearer ${token}`,
                    },
                }).then(response => {
                    if (response) {
                        console.log(response.data);
                    }
                }).catch(error => {
                    console.log(error);
                });
            }

        } catch (e) {
            console.log(e)
        }

    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                if (currentchatinfo) await axios.get(`http://127.0.0.1:5000/api/v1/messages/${currentchatinfo.currentid}`).then(data => {
                    if (data) {
                        setcurrentmess(data.data.data.arr)
                    }

                })
            } catch {
            }
        };

        fetchData();
    }, [currentchatinfo]);

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [currentmess]);

    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

    return (<>
        <Flex
            bgGradient={useColorModeValue("linear(to-l,white,white)", "linear(to-l,#05020b,#34073d)")}
        >
            <SideBarChat setcurrentchatinfo={setcurrentchatinfo} />
            <Box

                box-shadow="-3px 0px 15px 0px #0000001A"
                borderLeft={"100px"}
                borderColor={"red"}
                bg='#FFFFFF'
                maxW={"9000px"}
            >
                <Head_Chat></Head_Chat>
                <Flex
                    direction="column"
                    h="89vh"
                    marginTop={5}
                >

                    <Box bg="#ffffff" flex="100%" overflow="auto" ref={containerRef}
                    >

                        <Flex direction="column">
                            {currentmess.map((message, index) => (<Box

                                key={index} // Don't forget to include a unique key for each item in the map function
                                bg={message.sender === 1 ? "#0a7cff" : "#D9D9D933"}

                                borderRadius={message.sender === 1 ? "20px 0px 20px  20px" : "0px 20px 20px 20px"}
                                padding="8px"
                                fontSize={"16px"}
                                maxHeight="100px" /* Set a maximum height for the container */
                                mx={7}
                                marginBottom="8px"
                                textAlign={"justify"}
                                alignSelf={message.sender === 1 ? "flex-end" : "flex-start"}
                                maxW="45%"
                            >
                                <Text fontFamily={"Montserrat"} lineHeight={"24px"} fontWeight={"400"}>
                                    {message.content}
                                </Text>
                            </Box>))}
                        </Flex>

                    </Box>

                    <Box bg="white" flex="10%" pt={5} >
                        <Flex>
                            <Input borderRadius={"40px"} placeholder={"Type a Message"}
                                mr={5} h={"65"} onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleTyping}
                                value={message}
                                onKeyUp={handleStopTyping}
                                color={"black"}
                                mb={"70px"}
                            >
                            </Input>

                        </Flex>
                    </Box>
                </Flex>

            </Box >


        </Flex >

    </>


    );
}


