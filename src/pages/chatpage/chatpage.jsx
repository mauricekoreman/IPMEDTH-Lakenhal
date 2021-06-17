import { makeStyles } from "@material-ui/core";
import React from "react";
import ChatPanel from "../../components/chatpanel/chatpanel";
import ChatPanel2 from "../../components/chatpanel/chatpanel_2";
import { useAuth } from '../../contexts/authContext'
import isJson from '../../contexts/isJson';

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
  },
}));

const Chatpage = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  let user = currentUser;
  if(isJson(currentUser)){
      user = JSON.parse(currentUser);
  }
  return (
    <div className={classes.pageContainer}>
      <ChatPanel user={user}/>
    </div>
  );
};
export default Chatpage;
