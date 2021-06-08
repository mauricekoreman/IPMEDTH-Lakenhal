import { Box, Container } from "@material-ui/core";
import axios from "axios";
import Pusher from "pusher-js";
import React, { useEffect, useState } from "react";

const ChatPanel = () => {
  const [username, setUsername] = useState("username");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  let allMessages = [];

  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("4eb82ca52bd471e66187", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("chat");
    channel.bind('App\\Events\\Message', function (data) {
      allMessages.push(data);
      setMessages(allMessages);
    });

  }, []);

  console.log(allMessages);
  const submit = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(message);
    await fetch("http://localhost:8000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        username,
      }),
    });

    // setMessage("");
  };

  return (
    <Container>
      <input
        value={username}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />

      <form onSubmit={(e) => submit(e)}>
        <input
          placeholder="write a message"
          value={message}
          type="text"
          onChange={(e) => setMessage(e.target.value)}
        />
        <input type="submit" value="Stuur bericht" />
      </form>

      {messages.map((message) => {
        return (
          <Box key={message}>
            <h3>
              <strong>{"username: " + message.username}</strong>
            </h3>
            <p>{"het bericht: " + message.message}</p>
          </Box>
        );
      })}
    </Container>
  );
};

export default ChatPanel;
