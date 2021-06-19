import { Box, makeStyles, Slide, Dialog, Button } from "@material-ui/core";
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

  useEffect(() => {
    axios
      .get(TEST_URL + "userGroepschat/" + user.user_ID)
      .then((response) => {
        setConversations(response.data);
      })
      .catch((err) => console.log(err.response));
  }, []);

  const [open, setOpen] = useState(false);

  function toggleChat() {
    setOpen(!open);
  }

  return (
    <div className={classes.pageContainer}>
      {conversations.map((e) => (
        <Box
          key={e.groepschat_ID}
          onClick={() => {
            toggleChat();
            setSelectedChat(e.groepschat_ID);
          }}
        >
          <ChatItem
            aantalDeelnemers={3}
            chatTitel={"title chat"}
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
        />
      </Dialog>
    </div>
  );
};
export default Chatpage;
