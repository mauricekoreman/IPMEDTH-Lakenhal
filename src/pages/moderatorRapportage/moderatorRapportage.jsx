import React from "react";
import { useAuth } from '../../contexts/authContext'
import pf from "../../assets/img/placeholders/profile_picture_placeholder.jpg";
import lakenhal_sw from "../../assets/img/lakenhal_sw.png";
import { useState, useEffect } from "react";
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
  const TEST_URL = "http://127.0.0.1:8000/api/";
  const [detailRapportageOpen, setDetailRapportageOpen] = useState(false)
  const [rapportageList, setRapportageList] = useState([])
  const classes = useStyles();
  const { currentUser } = useAuth();

  let user = currentUser;
  if(isJson(currentUser)){
    user = JSON.parse(currentUser);
  }

  const fetchRapportages = async () =>{
    const res = await fetch(TEST_URL + 'activiteitenGerapporteerd')
    const data = res.json()
    return data
  }

  

  useEffect(()=>{
    const getRapportages = async () => {
      const rapportageListServer = await fetchRapportages()
      setRapportageList(rapportageListServer)
    }
    getRapportages()
    console.log(rapportageList)
  }, [])

  const detailRapportageClick = (rapportage) =>{
    setDetailRapportageOpen(!detailRapportageOpen)
  }
  console.log(rapportageList)
  return (
    <div>
      {user.admin ?  
        <Box className={classes.pageContainer}>
          <Grid container spacing={2}>
            {rapportageList.map((rapportage, key) =>{
                return(
                  <Grid item xs={12} key={key} onClick={()=>detailRapportageClick(rapportage)}>
                    <ModeratorRapportageCard titel={rapportage.titel} categorie={rapportage.categorie} naam={rapportage.naam} aantalRapportages={rapportage.aantal_gerapporteerd} profielfoto={rapportage.profiel_foto} lakenhalActiviteit={rapportage.lakenhal_activiteit}/>
                  </Grid>
                )
              })}
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