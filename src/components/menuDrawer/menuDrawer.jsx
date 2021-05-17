import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Drawer as MUIDrawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
} from "@material-ui/core";

const useStyles = makeStyles({
  drawer: {
    width: 240,
  },
});

const MenuDrawer = ({ openDrawer, toggleDrawer }) => {
  const classes = useStyles();
  const itemList = [
    {
      text: "Home",
      link: "",
    },
    {
      text: "Privacy policy",
      link: "privacy_policy",
    },
  ];

  return (
    <SwipeableDrawer
      anchor="left"
      open={openDrawer}
      onClose={toggleDrawer}
      onOpen={toggleDrawer}
      variant="temporary"
      classes={{
        paper: classes.drawer,
      }}
    >
      <List>
        {itemList.map((item, index) => {
          const { text, link } = item;
          return (
            <ListItem button key={text} component={Link} to={"/" + link}>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>

    </SwipeableDrawer>
  );
};

export default MenuDrawer;
