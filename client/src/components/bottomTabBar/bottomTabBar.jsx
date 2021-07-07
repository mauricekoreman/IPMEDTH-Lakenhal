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
import { useAuth } from '../../contexts/authContext';
import isJson from '../../contexts/isJson';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    position: "fixed",
    bottom: 0,
    backgroundColor: "primary",
    [theme.breakpoints.up("md")]: {
      display: 'flex',
      justifyContent: 'space-around',
      height: '75px'
    },
  },
  navigationIcon: {
    [theme.breakpoints.up("md")]: {
      width: '35px',
      height: '35px'
    },
  },
  labelNav: {
    [theme.breakpoints.up("md")]: {
      fontSize: '24px'
    },
  },
}));


const BottomTabBar = (props) => {
  const { location } = props;
  const classes = useStyles();
  const { currentUser } = useAuth();

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
        icon={<HomeIcon className={classes.navigationIcon}/>}
        classes={{
          label: classes.labelNav,
        }}
        component={Link}
        to={"/"}
      />
      <BottomNavigationAction
        label="Chat"
        icon={<ChatBubbleOutlineIcon className={classes.navigationIcon} />}
        classes={{
          label: classes.labelNav,
        }}
        component={Link}
        to={"/chat"}
      />
      <BottomNavigationAction
        label="Profiel"
        classes={{
          label: classes.labelNav,
        }}
        icon={<PersonOutlineOutlinedIcon className={classes.navigationIcon} />}
        component={Link}
        to={"/profiel"}
      />
     {user && user.admin &&
        (<BottomNavigationAction
          label="moderator"
          icon={<SettingsIcon className={classes.navigationIcon}/>}
          classes={{
            label: classes.labelNav,
          }}
          component={Link}
          to={"/moderator"}
        />)
      } 
    </BottomNavigation>
  );
};

export default withRouter(BottomTabBar);
