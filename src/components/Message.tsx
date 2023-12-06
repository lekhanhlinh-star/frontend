import { Box, Button, Flex, Input, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SideBarChat from "./Chat/SideBarChat";
import { Head_Chat } from "./Chat/Head_Chat";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import socketIOClient from 'socket.io-client';

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

interface userData { _id: string | null }
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
            setcurrentmess([...currentmess, newMessageRecieved]);

        });
    });

    const handleTyping = () => {

        socket.emit('typing', currentchatinfo?.user.id);
    };

    const handleStopTyping = () => {
        socket.emit('stop typing', currentchatinfo?.user.id);
    };


    const handleclick = async () => {
        try {
            console.log("onSubmit")
            if (message && currentchatinfo) {
                socket.emit('new message', {
                    chat: {
                        users: [
                            { _id: currentchatinfo?.user.id }]
                    }, sender: userdata, content: message
                });
                setMessage('');
                console.log(message, currentchatinfo)
                const token = localStorage.getItem("token");
                await axios.post('http://localhost:5000/api/v1/messages', {
                    content: message,
                    chatId: currentchatinfo.currentid,
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
                if (currentchatinfo)
                    await axios.get(`http://127.0.0.1:5000/api/v1/messages/${currentchatinfo.currentid}`).then(data => {
                        if (data) {
                            setcurrentmess(data.data.data.arr)
                        }

                    })
            } catch {
            }
        };

        fetchData();
    }, [currentchatinfo]);

    return (<>
        <Flex
            bgGradient={useColorModeValue("linear(to-l,white,white)", "linear(to-l,#05020b,#34073d)")}
        >
            <SideBarChat setcurrentchatinfo={setcurrentchatinfo} />
            <Box ml={5} color='white' overflow={"hidden"}>
                <Head_Chat></Head_Chat>
                <Flex
                    direction="column"
                    h="91vh"
                >
                    <Box bg="#ffffff" flex="100%" overflow="auto" overflowY="auto" >

                        <Flex direction="column">
                            {currentmess.map((message, index) => (
                                <Box
                                    key={index} // Don't forget to include a unique key for each item in the map function
                                    bg={message.sender === 1 ? "#0a7cff" : "#f0f0f0"}
                                    borderRadius={message.sender === 1 ? "20px 20px 20px 0" : "8px 8px 0 8px"}
                                    padding="8px"
                                    mx={7}
                                    marginBottom="8px"
                                    alignSelf={message.sender === 1 ? "flex-end" : "flex-start"}
                                    maxW="45%"
                                >
                                    <Text color="black" fontSize="15px">
                                        {message.content}
                                    </Text>
                                </Box>
                            ))}
                        </Flex>

                    </Box>

                    <Box bg="gray.100" flex="10%" py={5} border="2px solid #ccc" >
                        <Flex>
                            <Input borderRadius={20} maxW={"70%"} placeholder={"Type a Message"}
                                ml={200} mr={5} onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={handleTyping}
                                onKeyUp={handleStopTyping}
                                color={"black"}
                            >
                            </Input>
                            <Button mx={5} colorScheme='facebook' variant='solid' leftIcon={<IoIosSend />} onClick={handleclick}>
                                Send
                            </Button>
                        </Flex>
                    </Box>
                </Flex>

            </Box>


        </Flex>

    </>


    );
}



const ChatComponent: React.FC<{ userData: { _id: string }; room: string }> = ({ userData, room }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any[]>([]);
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        socket.emit('setup', userData);
        socket.on('connected', () => {
            console.log("connected success")
        });

        const handleNewMessage = (newMessage: any) => {
            console.log("message received")

            setMessages((prevMessages) => [...prevMessages, newMessage]);
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
            setMessages([...messages, newMessageRecieved]);

        });
    });


    const sendMessage = () => {
        socket.emit('new message', {
            chat: {
                users: [
                    { _id: "124" }]
            }, sender: userData, content: message
        });
        setMessage('');
    };

    const handleTyping = () => {
        socket.emit('typing', "124");
    };

    const handleStopTyping = () => {
        socket.emit('stop typing', room);
    };

    return (
        <VStack>
            <Box>{userData._id}</Box>
            {messages.map((msg, index) => (
                <Text key={index}>{msg.content}</Text>
            ))}

            {isTyping && <Text>User is typing...</Text>}

            <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message"
                onKeyDown={handleTyping}
                onKeyUp={handleStopTyping}
            />

            <Button onClick={sendMessage}>Send</Button>
        </VStack>
    );
};
