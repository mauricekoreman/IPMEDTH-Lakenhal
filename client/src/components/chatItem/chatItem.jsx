import React from "react";
import { makeStyles, Typography } from "@material-ui/core";
import useChats from "../../hooks/useChats";
import isJson from '../../contexts/isJson';

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    borderTop: "1px solid #eee",
    borderBottom: "1px solid #eee",
  },
  chatImage: {
    height: "50px",
    width: "50px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: 100,
  },
  rows: {
    width: "85%",
  },
  chatRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
  },
  newMessage: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: 100,
    height: "20px",
    width: "20px",
    color: theme.palette.secondary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ChatItem = ({ chatTitel, timeLastChatSent, aantalDeelnemers }) => {
  const { messages } = useChats(chatTitel);
  const newMessage = messages.reduce((counter, obj) => {
    if (obj.chat === chatTitel) counter += 1
    return counter;
  }, 0); 

  let updateMessage = [];

  if (messages.length !== 0) {
    messages.forEach((obj) => {
      console.log(obj.chat);
      if (obj.chat === chatTitel){
        updateMessage.push(messages);
        localStorage.setItem(chatTitel, JSON.stringify(updateMessage[0]));
      }
    }); 
  }

  console.log(messages);
  const classes = useStyles();
  return (
    <div className={classes.chatContainer}>
      <div className={classes.chatImage}></div>
      <div className={classes.rows}>
        <div className={classes.chatRow}>
          <Typography variant="h5">{chatTitel}</Typography>
          <Typography variant="caption">{timeLastChatSent}</Typography>
        </div>
        <div className={classes.chatRow}>
          <Typography variant="body1">{`${aantalDeelnemers} deelnemers`}</Typography>
          <div className={classes.newMessage}>{newMessage}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
