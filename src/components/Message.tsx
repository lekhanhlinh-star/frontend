import { Box, Button, Flex, Input, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SideBarChat from "./Chat/SideBarChat";
import { Head_Chat } from "./Chat/Head_Chat";
import { IoIosSend } from "react-icons/io";
import axios from "axios";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

interface Mess {
    content: string | null;
    sender: User;
    createAt: string;
    id: string;
}

interface ChatInfo {
    chatid: string;
    chatName: string | null;
}

interface User {
    name: string;
    avt: string | null;
    id: string;
}

export function Message() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [istyping, setIsTyping] = useState(false);
    const toast = useToast();
    const ENDPOINT = "http://localhost:5000";
    var socket: any, selectedChatCompare;

    const user = localStorage.getItem("_id")

    const [currentid, setcurrentid] = useState("")
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("join chat", { userData: user });
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
        socket.off('setup')

    }, [currentid]);

    const mess = [{
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.", sender: "User",
    }, {
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.", sender: "bot",
    },];


    useEffect(() => {
        const fetchData = async () => {
            console.log(currentid)
            try {
                if (currentid)
                    await axios.get(`http://127.0.0.1:5000/api/v1/messages/${currentid}`).then(data => {
                        if (data) {
                            console.log("data")
                            console.log(data)
                        }

                    })
                socket.emit("join chat", currentid);
            } catch {
            }
        };

        fetchData();
    }, [currentid]);


    return (<>
        <Flex
            bgGradient={useColorModeValue("linear(to-l,white,white)", "linear(to-l,#05020b,#34073d)")}
        >

            <SideBarChat setCurrentId={setcurrentid} />
            <Box ml={5} color='white' overflow={"hidden"}>
                <Head_Chat></Head_Chat>
                <Flex
                    direction="column"
                    h="91vh"
                >
                    <Box bg="#ffffff" flex="100%" overflow="auto" overflowY="auto" >

                        <Flex direction="column" >
                            {mess.map((message, index) =>
                            (<Box
                                key={index}
                                bg={message.sender === "User" ? "#0a7cff" : "#f0f0f0"}
                                borderRadius={message.sender === "User" ? "20px 20px 20px 0" : "8px 8px 0 8px"}
                                padding="8px"
                                mx={7}
                                marginBottom="8px"
                                alignSelf={message.sender === "User" ? "flex-end" : "flex-start"}
                                maxW="45%"
                            >
                                <Text color={"black"} fontSize={"15px"}>{message.content}</Text>
                            </Box>))}
                        </Flex>

                    </Box>

                    <Box bg="gray.100" flex="10%" py={5} border="2px solid #ccc" >
                        <Flex>
                            <Input borderRadius={20} maxW={"70%"} placeholder={"Type a Message"} ml={200} mr={5}>

                            </Input>
                            <Button mx={5} colorScheme='facebook' variant='solid' leftIcon={<IoIosSend />}>
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