import socketIOClient from "socket.io-client";
import { useEffect, useRef, useState } from "react";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // name of the event
const SOCKET_SERVER_URL = "http://localhost:4000";

const useChat = (roomIds) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    // create websocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomIds },
    });

    // Listen for incoming messages
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });
  
    // Destroys the socket reference
    // when the connection is closed
    return () => {    
      socketRef.current.disconnect();
    };
  }, [roomIds]);
  
  return { messages };
};

export default useChat;
