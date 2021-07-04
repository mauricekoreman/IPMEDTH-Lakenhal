import socketIOClient from "socket.io-client";
import isJson from '../contexts/isJson';
import { useEffect, useRef, useState } from "react";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    // create websocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    // Listen for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
  
    if(Object.keys(localStorage).includes(roomId)){
      let storedMesagge = localStorage.getItem(roomId);
      if(isJson(storedMesagge)){
        storedMesagge = JSON.parse(storedMesagge);
      }
      storedMesagge.map((message) => setMessages((messages) => [...messages, message]));
    }
    // Destroys the socket reference
    // when the connection is closed
    return () => {    
      socketRef.current.disconnect();
    };
  }, [roomId]);
  
  // sends message to the server chat
  // forwards it to all users in the same room
  const sendMessage = (messageBody, naam) => {
    console.log(messageBody)
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
      naam: naam,
    });
    // storeMessage();
  };

  // const storeMessage = () => {
    useEffect(() => {
      localStorage.setItem(roomId, JSON.stringify(messages));
    }, [roomId, messages]);

  // }

  return { messages, sendMessage };
};

export default useChat;
