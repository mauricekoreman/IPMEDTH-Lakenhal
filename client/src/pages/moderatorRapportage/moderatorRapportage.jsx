import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import ModeratorRapportageCard from "../moderatorRapportage/moderatorRapportageCard";
import DetailPost from "../../components/detailPost/detailPost";
import isJson from "../../contexts/isJson";

import { Grid, makeStyles, Box } from "@material-ui/core";
import { TEST_URL } from "../../assets/globalVariables";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(6),
    width: '90%',
    margin: '0 auto',
    [theme.breakpoints.up("md")]: {
      width: '80%'
    },
  },
}));

const ModeratorRapportage = () => {
   
  const [detailRapportageOpen, setDetailRapportageOpen] = useState(false);
  const [detailRapportage, setDetailRapportage] = useState([]);
  const [rapportageList, setRapportageList] = useState([]);
  const classes = useStyles();
  const { currentUser } = useAuth();

  let user = currentUser;
  if (isJson(currentUser)) {
    user = JSON.parse(currentUser);
  }

  const fetchRapportages = async () => {
    const res = await fetch(TEST_URL + "activiteitenGerapporteerd");
    const data = res.json();
    return data;
  };

  useEffect(() => {
    const getRapportages = async () => {
      const rapportageListServer = await fetchRapportages();
      setRapportageList(rapportageListServer);
    };
    getRapportages();
    console.log(rapportageList);
  }, []);

  const detailRapportageClick = (rapportage, refresh = false) => {
    setDetailRapportageOpen(!detailRapportageOpen);
    console.log(rapportage);
    setDetailRapportage(rapportage);
    if (refresh) {
      window.location.reload();
    }
  };

  return (
    <div>
      {user.admin ? (
          <Grid className={classes.pageContainer}container spacing={2}>
            {rapportageList.map((rapportage, key) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  key={key}
                  onClick={() => detailRapportageClick(rapportage)}
                >
                  <ModeratorRapportageCard
                    titel={rapportage.titel}
                    categorie={rapportage.categorie}
                    naam={rapportage.naam}
                    aantalRapportages={rapportage.aantal_gerapporteerd}
                    profielfoto={rapportage.profiel_foto}
                    lakenhalActiviteit={rapportage.lakenhal_activiteit}
                  />
                </Grid>
              );
            })}
          </Grid>
      ) : (
        <div>404</div>
      )}
      <DetailPost
        open={detailRapportageOpen}
        closeScreen={detailRapportageClick}
        activiteit={detailRapportage}
      />
    </div>
  );
};

export default ModeratorRapportage;
