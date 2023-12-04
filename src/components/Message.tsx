import {Box, Button, Flex, Input, Text, useColorModeValue} from "@chakra-ui/react";
import {useState} from "react";
import SideBarChat from "./Chat/SideBarChat";
import {Head_Chat} from "./Chat/Head_Chat";
import { IoIosSend } from "react-icons/io";

export function Message() {
    const [currentid, setcurrentid] = useState('')

    const obj = [{
        name: "Toan ngu", avt: "http://localhost:5000/uploads/1700827287066.jpeg", last: "last 1", id: "65544fb50870434af07d0f66"
    }, {
        name: "Toan ngu", avt: "http://localhost:5000/uploads/1700827287066.jpeg", last: "last 1", id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu", avt: "http://localhost:5000/uploads/1700827287066.jpeg", last: "last 1", id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu", avt: "http://localhost:5000/uploads/1700827287066.jpeg", last: "last 1", id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu", avt: "http://localhost:5000/uploads/1700827287066.jpeg", last: "last 1", id: "65544fb50870434af07d0f66"
    }, {
        name: "Toan ngu", avt: "http://localhost:5000/uploads/1700827287066.jpeg", last: "last 1", id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu", avt: "http://localhost:5000/uploads/1700827287066.jpeg", last: "last 1", id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu", avt: "http://localhost:5000/uploads/1700827287066.jpeg", last: "last 1", id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu", avt: "http://localhost:5000/uploads/1700827287066.jpeg", last: "last 1", id: "65544fb50870434af07d0f66"
    }, {
        name: "Toan ngu", avt: "http://localhost:5000/uploads/1700827287066.jpeg", last: "last 1", id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu", avt: "http://localhost:5000/uploads/1700827287066.jpeg", last: "last 1", id: "65544fb50870434af07d0f66"

    }, {
        name: "Toan ngu", avt: "http://localhost:5000/uploads/1700827287066.jpeg", last: "last 1", id: "65544fb50870434af07d0f66"
    }]

    const mess = [{
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.", sender: "user",
    }, {
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.", sender: "bot",
    }, {
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.", sender: "user",
    }, {
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.", sender: "user",
    }, {
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.", sender: "user",
    }, {
        content: "Hello", sender: "user",
    }, {
        content: "Dù xe gặp sự cố gì, hãy cố gắng đưa xe nằm trọn vẹn trong làn dừng khẩn cấp, không lấn ra làn xe chạy. Nếu xe hết xăng giữa đường hay vì một lý do nào đó động cơ không thể khởi động thì thậm chí bạn phải đẩy xe vào lề đường. Vì khi một phần thân xe vẫn nằm trên làn xe chạy thì rất khó cho các phương tiện khác điều tiết tốc độ cũng như chuyển làn.", sender: "user",
    },];

    return (<>
            <Flex
                  bgGradient={useColorModeValue("linear(to-l,white,white)", "linear(to-l,#05020b,#34073d)")}
            >
                <SideBarChat/>
                <Box ml={5} color='white' overflow={"hidden"}>
                    <Head_Chat></Head_Chat>
                    <Flex
                        direction="column"
                        h="91vh" // Set the height of the parent container to 100% of the viewport height
                    >
                        {/* box1 with 70% height */}
                        <Box bg="#ffffff" flex="100%" overflow="auto" overflowY="auto" >

                            <Flex  direction="column" >
                            {mess.map((message, index) => (<Box

                                key={index}
                                bg={message.sender === "user" ? "#0a7cff" : "#f0f0f0"}
                                borderRadius={message.sender === "user" ? "20px 20px 20px 0" : "8px 8px 0 8px"}
                                padding="8px"
                                mx={7}
                                marginBottom="8px"
                                alignSelf={message.sender === "user" ? "flex-end" : "flex-start"}
                                maxW="45%"
                            >
                                <Text color={"black"} fontSize={"15px"}>{message.content}</Text>
                            </Box>))}
                                </Flex>
                            {/* box2 with 30% height */}
                        </Box>

                        <Box bg="gray.100" flex="10%" py={5}   border="2px solid #ccc" >
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


                {/*<ListFollowing />*/}
            </Flex>

        </>


    );
}