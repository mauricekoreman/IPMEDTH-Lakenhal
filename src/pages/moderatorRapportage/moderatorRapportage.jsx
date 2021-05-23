import React from "react";
import { useAuth } from '../../contexts/authContext'
import pf from "../../assets/img/placeholders/profile_picture_placeholder.jpg";
import lakenhal_sw from "../../assets/img/lakenhal_sw.png";
import ModeratorRapportageCard from '../moderatorRapportage/moderatorRapportageCard'

import {
  Grid,
  makeStyles,
  Box,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingTop: theme.spacing(8),
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
      {admin() ? ( 
        <Box className={classes.pageContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ModeratorRapportageCard />
            </Grid>
            <Grid item xs={12}>
              <ModeratorRapportageCard />
            </Grid>
            <Grid item xs={12}>
              <ModeratorRapportageCard />
            </Grid>
            <Grid item xs={12}>
              <ModeratorRapportageCard />
            </Grid>
          </Grid>
        </Box>
      )
      : (
        <div>404</div>
      )}
    </div>
  );
};

const styles = {};

export default ModeratorRapportage;