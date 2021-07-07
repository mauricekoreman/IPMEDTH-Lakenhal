import React, { useState, useEffect } from "react";
import lakenhal_sw from "../../assets/img/lakenhal_sw.png";
import Fade from '@material-ui/core/Fade';


import {
  Card,
  CardContent,
  Typography,
  makeStyles,
  Box,
  Avatar,
  CardMedia,
  CardActions,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  rapportageCard: {
    width: "100%",
    margin: "0 auto",
    display: 'block',
    transition: '0.5s linear',
    '&:hover': {
      transform: 'scale(1.05)',
      animation: "$groeiEffect 0.5s linear",
    },
  },
  "@keyframes groeiEffect": {
    "from": {
      transform: 'scale(1)'
    },
    "to": {
      opacity: 1,
      transform: 'scale(1.05)'
    },
  },
  rapportageCardContent: {
    "&:last-child": {
      paddingBottom: 0,
    },
  },
  profilePicture: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    [theme.breakpoints.up("md")]: {
      width: 75,
      height: 75
    },
  },
  cardMediaLogo: {
    width: theme.spacing(5),
    height: theme.spacing(6),
    position: "absolute",
    right: 0,
  },
  headerCard: {
    display: "flex",
    justifyContent: "flex-start",
  },
  opdrachtCard: {
    marginLeft: theme.spacing(),
  },
  opdrachtCardSubtitle: {
    opacity: 0.6,
    [theme.breakpoints.up("md")]: {
      fontSize: 18
    },
  },
  opdrachtCardTitle: {
    [theme.breakpoints.up("md")]: {
      fontSize: 24
    },
  },
  actie: {
    padding: 0,
  },
  actieButton: {
    paddingLeft: 0,
    justifyContent: "flex-start",
    [theme.breakpoints.up("md")]: {
      fontSize: 18
    },
  },
  typoCard: {
    fontStyle: "italic",
    [theme.breakpoints.up("md")]: {
      fontSize: 18
    },
  },
}));

const ModeratorRapportageCard = ({
  titel,
  categorie,
  naam,
  aantalRapportages,
  profielfoto,
  lakenhal_activiteit,
}) => {
  const [checked, setChecked] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    setChecked(true)
  }, []);
  return (
    <Fade in={checked} style={{ transitionDelay: checked ? '150ms' : '0' }}>
    <Card className={classes.rapportageCard}>
      {lakenhal_activiteit && (
        <CardMedia
          className={classes.cardMediaLogo}
          component="img"
          alt="Lakenhal logo"
          src={lakenhal_sw}
          title="Lakenhal logo"
        />
      )}
      <CardContent className={classes.rapportageCardContent}>
        <Box className={classes.headerCard}>
          <Avatar
            alt="Profiel foto"
            className={classes.profilePicture}
            src={"https://lakenhalmatchedapi.azurewebsites.net/storage/profiel_foto/" + profielfoto}
          />
          <Box className={classes.opdrachtCard}>
            <Typography
              variant="h6"
              component="h3"
              className={classes.opdrachtCardTitle}
            >
              {titel}
            </Typography>
            <Typography
              variant="caption"
              className={classes.opdrachtCardSubtitle}
            >
              {categorie}
            </Typography>
          </Box>
        </Box>
        <Typography className={classes.typoCard} variant="body2">
          Naam: {naam}
        </Typography>
        <Typography className={classes.typoCard} variant="body2">
          Aantal keer gerapporteerd: {aantalRapportages}
        </Typography>
        <CardActions className={classes.actie}>
          <Button className={classes.actieButton} size="large" color="primary">
            ACTIES
          </Button>
        </CardActions>
      </CardContent>
    </Card>
    </Fade>
  );
};

export default ModeratorRapportageCard;
