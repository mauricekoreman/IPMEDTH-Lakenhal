import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";

import useChat from "../../hooks/useChat";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    height: "100vh",
  },
  appBar: {
    position: "fixed",
  },
  chatBox: {
    marginTop: theme.spacing(6),
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.spacing(2),
    overflow: "auto",
  },
  message: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    flexDirection: "column",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    width: "fit-content",
    borderRadius: 13,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#C5F4FF",
  },
  receivedMessage: {
    border: "1px solid #ddd",
  },
  form: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputField: {
    border: "none",
    borderRadius: 100,
    backgroundColor: "#eee",
    padding: "15px",
    flexGrow: 1,
    marginRight: "7px",

    "&:focus": {
      outline: "none",
    },
  },
  sendMessageBtn: {
    borderRadius: 100,
    height: "40px",
    width: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: theme.palette.primary.main,
  },
}));

const ChatContainer = ({ close, chatTitle, roomId, naam}) => {
  const classes = useStyles();
  const [newMessage, setNewMessage] = useState("");

  const { messages, sendMessage } = useChat(roomId);
    
  let today = new Date(),
  time = today.getHours() + ':' + today.getMinutes();

  function handleChange(e) {
    setNewMessage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage(newMessage, naam, time);
    setNewMessage("");
  }

  return (
    <Box className={classes.container}>
      <AppBar className={classes.appBar} elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={close}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6">{chatTitle}</Typography>
        </Toolbar>
      </AppBar>

      <Box className={classes.chatBox}>
        {messages.map((message, i) => {
          return (
            <div
              className={`${classes.message} ${
                message.naam === naam
                  ? classes.myMessage
                  : classes.receivedMessage
              }`}
              key={i}
            >
              <Typography variant="body1" className={classes.text}>
                {message.body}
              </Typography>
              <Typography variant="caption" className={classes.sender}>
                {message.naam}
              </Typography>
            </div>
          );
        })}
      </Box>

      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          value={newMessage}
          onChange={handleChange}
          className={classes.inputField}
          placeholder="schrijf een bericht"
        />
        <button type="submit" className={classes.sendMessageBtn}>
          <SendIcon fontSize="small" color="secondary" />
        </button>
      </form>
    </Box>
  );
};

export default ChatContainer;
