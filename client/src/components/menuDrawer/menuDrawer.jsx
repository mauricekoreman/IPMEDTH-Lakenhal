import React from "react";
import { Link } from "react-router-dom";
import Logout from "../authentication/logout";

import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  SwipeableDrawer,
  Divider,
  Button,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles({
  drawer: {
    width: 240,
    display: "flex",
  },
  buttonsContainer: {
    width: "80%",
    margin: "0 auto",
    marginTop: "20px",
  },
});

const MenuDrawer = ({ openDrawer, toggleDrawer, user }) => {
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
      <Divider />
      {user ? (
        <Logout />
      ) : (
        <Box className={classes.buttonsContainer}>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            onClick={toggleDrawer}
            color="primary"
            fullWidth
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            onClick={toggleDrawer}
            variant="outlined"
            color="primary"
            fullWidth
            style={{ marginTop: "10px" }}
          >
            Registreer
          </Button>
        </Box>
      )}
    </SwipeableDrawer>
  );
};

export default MenuDrawer;
