import React from "react";
import { makeStyles, Typography } from "@material-ui/core";

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

const ChatItem = () => {
  const classes = useStyles();
  return (
    <div className={classes.chatContainer}>
      <div className={classes.chatImage}></div>
      <div className={classes.rows}>
        <div className={classes.chatRow}>
          <Typography variant="h5">Titel chat</Typography>
          <Typography variant="caption">15:13</Typography>
        </div>
        <div className={classes.chatRow}>
          <Typography variant="body1">3 deelnemers</Typography>
          <div className={classes.newMessage}>3</div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
