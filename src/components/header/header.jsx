import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import MenuDrawer from "../menuDrawer/menuDrawer";
import Logout from "../authentication/logout";
import { useAuth } from '../../contexts/authContext'
import ExtraTabsHeader from '../header/extraTabsHeader'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ title }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { currentUser } = useAuth();

  function toggleDrawer() {
    setOpenDrawer(!openDrawer);
  }

  const admin = () =>{
    try{
      if(currentUser.admin === 1){
        return true
      }
    }
    catch(e){
      return false
    }
  }

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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {currentUser ? (<Logout />) : (<Box><Link to="/login">Login</Link><Link to="/register">Registreer</Link></Box>)}
        </Toolbar>
      </AppBar>
      {window.location.pathname === '/profiel' &&  <ExtraTabsHeader tabs={["PROFIEL", "POSTS"]}/>}
      {admin() && window.location.pathname === '/moderator' &&  <ExtraTabsHeader tabs={["RAPPORTAGES", "CATEGORIEËN"]}/>}
      <MenuDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default Header;
