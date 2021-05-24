import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";

import HomeIcon from "@material-ui/icons/Home";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import { useAuth } from '../../contexts/authContext'

const useStyles = makeStyles({
  root: {
    width: "100vw",
    position: "fixed",
    bottom: 0,
    backgroundColor: "primary",
  },
});


const BottomTabBar = (props) => {
  const { location } = props;
  const classes = useStyles();
  const { currentUser } = useAuth();

  const isJson = (currentUser) => {
    try {
        JSON.parse(currentUser);
    } catch (e) {
        return false;
    }
    return true;
  }

  let user = currentUser;
  if(isJson(currentUser)){
    user = JSON.parse(currentUser);
  }
  
  const indexToTabName = {
    "/": 0,
    "/chat": 1,
    "/profiel": 2,
  };
  
  const [selectedTab, setSelectedTab] = useState(
    indexToTabName[location.pathname]
  );

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <BottomNavigation
      value={selectedTab}
      onChange={handleChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        component={Link}
        to={"/"}
      />
      <BottomNavigationAction
        label="Chat"
        icon={<ChatBubbleOutlineIcon />}
        component={Link}
        to={"/chat"}
      />
      <BottomNavigationAction
        label="Profiel"
        icon={<PersonOutlineOutlinedIcon />}
        component={Link}
        to={"/profiel"}
      />
     {user && user.admin &&
        (<BottomNavigationAction
          label="moderator"
          icon={<SettingsIcon/>}
          component={Link}
          to={"/moderator"}
        />)
      } 
    </BottomNavigation>
  );
};

export default withRouter(BottomTabBar);
