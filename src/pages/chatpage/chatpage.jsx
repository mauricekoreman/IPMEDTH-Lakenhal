import { makeStyles } from "@material-ui/core";
import React from "react";

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
      <h1>chatpage</h1>
    </div>
  );
};
export default Chatpage;
