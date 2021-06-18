import { Box, makeStyles, Slide, Dialog, Button } from "@material-ui/core";
import React, { forwardRef, useEffect, useState } from "react";
import ChatItem from "../../components/chatItem/chatItem";
import ChatContainer from "../../components/chatContainer/chatContainer";

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
  const [open, setOpen] = useState(false);

  function toggleChat() {
    setOpen(!open);
  }

  return (
    <div className={classes.pageContainer}>
      <Box onClick={toggleChat}>
        <ChatItem />
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={toggleChat}
        TransitionComponent={Transition}
      >
        <ChatContainer close={toggleChat} />
      </Dialog>
    </div>
  );
};
export default Chatpage;
