import { makeStyles } from "@material-ui/core";
import React from "react";
import ChatPanel from "../../components/chatpanel/chatpanel";
import ChatPanel2 from "../../components/chatpanel/chatpanel_2";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
  },
}));

const Chatpage = () => {
  const classes = useStyles();

  return (
    <div className={classes.pageContainer}>
      {/* <ChatPanel2 /> */}
      <ChatPanel />
    </div>
  );
};
export default Chatpage;
