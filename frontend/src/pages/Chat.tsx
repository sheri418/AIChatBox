import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import red from "@mui/material/colors/red";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import ChatItem from "../components/chat/ChatItem";
import { useRef } from "react";
import {IoMdSend} from 'react-icons/io';
import { sendChatRequest } from "../helpers/api-communicator";

type Message={
  role:"user" | "assistant";
  content:string;
}
// const chatMessages = [
//   { role: "User", content: "Hello, how are you?" },
//   {
//     role: "assistant",
//     content: "I'm doing well, thank you! How can I assist you today?",
//   },
//   { role: "User", content: "I need help with some programming questions." },
//   {
//     role: "assistant",
//     content: "Of course! What specific questions do you have?",
//   },
//   { role: "User", content: "I'm struggling with JavaScript arrays." },
//   {
//     role: "assistant",
//     content:
//       "Arrays can be tricky at first. What specifically are you having trouble with?",
//   },
//   { role: "User", content: "I don't understand how to use the map method." },
//   {
//     role: "assistant",
//     content:
//       "The map method allows you to iterate over each element in an array and apply a function to each element, returning a new array with the results. Would you like an example?",
//   },
//   // Add more chat messages as needed
// ];

const Chat = () => {
  const inputRef= useRef<HTMLInputElement  | null>(null);
  const auth = useAuth();
  const [chatMessages,setChatMessage]=useState<Message>([]);
  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    
    // Clear input field
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
  
    // Construct new chat message
    const newMessage: Message = { role: "user", content };
  
    // Update chat messages state
    setChatMessage((prev) => [...prev, newMessage]);

  
    // Send the chat request and update the chat messages state with the response
    const chatData = await sendChatRequest(content);
    setChatMessage([...chatData.chats]);
  };
  
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", xs: "none", sm: "nonde" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            with: "100%",
            height: "60vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            flexDirection: "column",
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split("")[1][0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", mr: 4, p: 3 }}>
            You can ask some question related to
            Knowledge,Business,Advice,Education,etc. But avoid share personal
            information.
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: "700",
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography sx={{ fontSize: "40px", color: "white", mb: 2 }}>
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem content={chat.content} role={chat.role} key={index} />
          ))}
        </Box>
        <div style={{width:"100%", padding:"20px" , borderRadius:8, backgroundColor:"rgb(17,27,29)",
          display:"flex",
          margin:"auto"
        }}> 
        {" "}
<input 
ref={inputRef}
type="text" style={{width: "100%",backgroundColor:"transparent", padding:"10px",border:"none", outline:"none", color:"white", fontSize:"20px"}} />
<IconButton onClick={handleSubmit} sx={{ml:"auto", color:"white"}}><IoMdSend/></IconButton>
</div>
      </Box>
    </Box>
  );
};

export default Chat;
