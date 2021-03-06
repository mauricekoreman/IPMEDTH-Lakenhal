import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuDrawer from "../menuDrawer/menuDrawer";
import { useAuth } from "../../contexts/authContext";
import ExtraTabsHeader from "../header/extraTabsHeader";
import { useLocation } from "react-router-dom";
import isJson from "../../contexts/isJson";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  menuIcon: {
    [theme.breakpoints.up("md")]: {
      width: 50,
      height: 50
    },
  },
  title: {
    flexGrow: 1,
    [theme.breakpoints.up("md")]: {
      fontSize: 28
    },
  },
}));

const Header = ({ title }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { currentUser } = useAuth();

  let user = currentUser;
  if (isJson(currentUser)) {
    user = JSON.parse(currentUser);
  }
  function toggleDrawer() {
    setOpenDrawer(!openDrawer);
  }
  const location = useLocation();
  const onProfile = location.pathname === "/profiel";
  const onModerator = location.pathname === "/moderator";

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
          >
            <AccountCircleIcon className={classes.menuIcon}/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Navigatie naar profiel posts rapportages en categorieën via extra tabs*/}
      {onProfile && (
        <ExtraTabsHeader
          tabs={["PROFIEL", "POSTS", "EDIT"]}
          onProfile={onProfile}
        />
      )}
      {user && user.admin && onModerator && (
        <ExtraTabsHeader
          tabs={["RAPPORTAGES", "CATEGORIEËN"]}
          onModerator={onModerator}
        />
      )}
      <MenuDrawer
        openDrawer={openDrawer}
        toggleDrawer={toggleDrawer}
        user={user}
      />
    </div>
  );
};

export default Header;
