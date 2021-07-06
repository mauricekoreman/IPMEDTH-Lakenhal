import { Box, makeStyles, Slide, Dialog } from "@material-ui/core";
import React, { forwardRef, useEffect, useState } from "react";
import ChatItem from "../../components/chatItem/chatItem";
import ChatContainer from "../../components/chatContainer/chatContainer";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import isJson from "../../contexts/isJson";

import useChats from "../../hooks/useChats";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingTop: "6vh",
    paddingBottom: theme.spacing(6),
    [theme.breakpoints.up('md')]: {
      paddingRight:'70vw',
    },
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const Chatpage = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();

  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const [time, setTime] = useState([]);

  let user = currentUser;
  if (isJson(currentUser)) user = JSON.parse(currentUser);

  const TEST_URL = "http://localhost:8000/api/";

  const fetchChat = async () => {
    return await fetch(TEST_URL + "userGroepschat/user/activiteit/" + user.user_ID).then(res1 => { return res1.json() });
  };

  const fetchTime = async () => {
    if(await conversations[0] !== undefined){
      let chatTime = {};
      let chatTimes = [];
      conversations[0].forEach((conversation) => {
        if (localStorage.getItem(conversation.titel) !== "[]" && localStorage.getItem(conversation.titel) !==  null) {
          let times = JSON.parse(localStorage.getItem(conversation.titel));
          let times2 = times.slice(-1)[0].time;
          let titel = conversation.titel;
          chatTime[titel] = times2;
        }
      });
      chatTimes.push(chatTime);
      return chatTimes;
    } 
  };

  useEffect(() => {
    const getChat = async () => {
      const chatList = await fetchChat();
      setConversations([...conversations, chatList]);
    };
    getChat();
  }, []);

  useEffect(() => {
    const getTime = async () => {
      const chatTimes = await fetchTime();
      setTime(chatTimes);
    };
    if (conversations && conversations.length) {
      getTime();
    }
  }, [conversations]);

  const [open, setOpen] = useState(false);

  function toggleChat() {
    setOpen(!open);
    if (open) {
      window.location.reload();
    }
  } 

  return (
    <div className={classes.pageContainer}>

      {conversations[0] !== undefined && time[0] !== undefined && conversations[0].map((e) => (
        <Box
          key={e.groepschat_ID}
          onClick={() => {
            toggleChat();
            setSelectedChat(e.titel);
          }}
        >
          <ChatItem
            aantalDeelnemers={e.groeps_aantal}
            chatTitel={e.titel}
            chatAfbeelding={e.afbeelding}
            timeLastChatSent={time[0][e.titel]}
          />
        </Box>
      ))}

      <Dialog
        fullScreen
        open={open}
        onClose={toggleChat}
        TransitionComponent={Transition}
      >
        <ChatContainer
          close={toggleChat}
          chatTitle={selectedChat}
          roomId={selectedChat}
          naam={user.naam}
        />
      </Dialog>
    </div>
  );
};
export default Chatpage;
