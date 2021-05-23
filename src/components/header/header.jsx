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
import { useLocation } from 'react-router-dom'

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
  const location = useLocation()
  const onProfile = location.pathname === '/profiel';
  const onModerator = location.pathname === '/moderator';

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
      
      {/* Navigatie naar profiel posts rapportages en categorieën via extra tabs*/}
      {onProfile &&  <ExtraTabsHeader tabs={["PROFIEL", "POSTS"]} onProfile={onProfile}/>}
      {admin() && onModerator &&  <ExtraTabsHeader tabs={["RAPPORTAGES", "CATEGORIEËN"]} onModerator={onModerator}/>}
      <MenuDrawer openDrawer={openDrawer} toggleDrawer={toggleDrawer} />
    </div>
  );
};

export default Header;
