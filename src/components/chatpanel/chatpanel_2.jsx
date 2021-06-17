import { Button } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import Pusher from "pusher-js";
import Echo from "laravel-echo";

const ChatPanel2 = () => {
  const TEST_URL = "http://127.0.0.1:8000/";

  const token = JSON.parse(localStorage.getItem("user"));

  function handleChange(event) {
    console.log(event.target.value);
  }

  window.Echo = new Echo({
    broadcaster: "pusher",
    key: "4eb82ca52bd471e66187",
    cluster: "eu",
    encrypted: true,
  });

  var pusher = new Pusher("4eb82ca52bd471e66187", {
    authEndpoint: `${TEST_URL} broadcasting/auth`,
    cluster: "eu",
    encrypted: true,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  var channel = pusher.subscribe("private-conversation.1");

  channel.bind("message.posted", function (data) {
    alert(JSON.stringify(data));
  });

  return (
    <div>
      <h1>chatpanel 2</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => console.log("niks")}
      >
        Haal berichten op
      </Button>

      <form onSubmit={() => console.log("nothing yet")}>
        <label>
          Name:
          <input
            type="text"
            name="message"
            placeholder="Write a message"
            onChange={() => console.log("nothing either")}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ChatPanel2;
