import React from "react";

import Typography from "@material-ui/core/Typography";
import CategorieList from "../../components/categorie/categorieList";
import { Box, makeStyles } from "@material-ui/core";
import { useAuth } from '../../contexts/authContext'

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
  },
}));

const ModeratorRapportage = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();
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
    <div>
      {admin() ? 
      (<Box className={classes.pageContainer}>
        <Typography>Moderator page</Typography>
        <CategorieList />
      </Box>)
      :
      (<div>404</div>)}
    </div>
  );
};

const styles = {};

export default ModeratorRapportage;