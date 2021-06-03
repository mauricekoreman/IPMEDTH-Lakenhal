import React from "react";
import { useAuth } from '../../contexts/authContext'
import pf from "../../assets/img/placeholders/profile_picture_placeholder.jpg";
import lakenhal_sw from "../../assets/img/lakenhal_sw.png";
import { useState } from "react";
import ModeratorRapportageCard from '../moderatorRapportage/moderatorRapportageCard';
import DetailPost from "../../components/detailPost/detailPost";
import isJson from '../../contexts/isJson'

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
  const [detailRapportageOpen, setDetailRapportageOpen] = useState(false)
  const classes = useStyles();
  const { currentUser } = useAuth();

  let user = currentUser;
  if(isJson(currentUser)){
    user = JSON.parse(currentUser);
  }

  const detailRapportageClick = () =>{
    setDetailRapportageOpen(!detailRapportageOpen)
  }

  return (
    <div>
      {user.admin ?  
        <Box className={classes.pageContainer}>
          <Grid container spacing={2}>
            <Grid item xs={12} onClick={detailRapportageClick}>
              <ModeratorRapportageCard />
            </Grid>
          </Grid>
        </Box>     
      : 
        <div>404</div>
      }
      <DetailPost open={detailRapportageOpen} closeScreen={detailRapportageClick}/>
    </div>
  );
};

const styles = {};

export default ModeratorRapportage;