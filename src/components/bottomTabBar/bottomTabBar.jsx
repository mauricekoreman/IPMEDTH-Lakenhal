import {
  BottomNavigation,
  BottomNavigationAction,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import HomeIcon from "@material-ui/icons/Home";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    position: "fixed",
    bottom: 0,
    backgroundColor: "transparent",
  },
});

const BottomTabBar = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
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
    </BottomNavigation>
  );
};

export default BottomTabBar;
