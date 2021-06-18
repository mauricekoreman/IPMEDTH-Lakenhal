import React from "react";
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

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  appBar: {
    position: "fixed",
  },
  chatBox: {
    marginTop: theme.spacing(7),
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  form: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  message: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "end",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    // backgroundColor: "#eee",
  },
  text: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignSelf: "end",
    alignItems: "end",
  },
  sender: {},

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

const ChatContainer = ({ close }) => {
  const classes = useStyles();

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
          <Typography variant="h6">Chatnaam</Typography>
        </Toolbar>
      </AppBar>

      <Box className={classes.chatBox}>
        <div className={classes.message}>
          <Typography variant="body1" className={classes.text}>
            Some long ass text message
          </Typography>
          <Typography variant="caption" className={classes.sender}>
            Maurice
          </Typography>
        </div>
      </Box>

      <form className={classes.form}>
        <input
          className={classes.inputField}
          placeholder="schrijf een bericht"
        />
        <button className={classes.sendMessageBtn}>
          <SendIcon fontSize="small" color="secondary" />
        </button>
      </form>
    </Box>
  );
};

export default ChatContainer;
