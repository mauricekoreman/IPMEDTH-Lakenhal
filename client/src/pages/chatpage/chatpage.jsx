import { Box, makeStyles, Slide, Dialog } from "@material-ui/core";
import React, { forwardRef, useEffect, useState } from "react";
import ChatItem from "../../components/chatItem/chatItem";
import ChatContainer from "../../components/chatContainer/chatContainer";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import isJson from "../../contexts/isJson";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
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

  let user = currentUser;
  if (isJson(currentUser)) user = JSON.parse(currentUser);

  const TEST_URL = "http://localhost:8000/api/";

  const fetchChat = async () => {
      return await fetch(TEST_URL + "userGroepschat/user/activiteit/" + user.user_ID).then(res1 => { return res1.json() });
  };

  useEffect(() => {
    const getChat = async () => {
      const chatList = await fetchChat();
      setConversations([...conversations, chatList]);
    };
    getChat();
  }, []);

  const [open, setOpen] = useState(false);

  function toggleChat() {
    setOpen(!open);
  }

  console.log(conversations[0]);

  return (
    <div className={classes.pageContainer}>
      {conversations[0] !== undefined && conversations[0].map((e) => (
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
            timeLastChatSent={"13:14"}
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
