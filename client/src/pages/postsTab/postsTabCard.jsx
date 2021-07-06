import React from "react";
import lakenhal_sw from "../../assets/img/lakenhal_sw.png";

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
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({  
  rapportageCard: {
    width: "100%",
    // heigth: '300px',
    // margin: "0 auto",
    // position: "relative",
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
      width: "90px",
      height: "90px",
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
    marginLeft: theme.spacing(6),
  },
  opdrachtCardSubtitle: {
    opacity: 0.6,
  },
  actie: {
    padding: 0,
  },
  actieButton: {
    paddingLeft: 0,
    justifyContent: "flex-start",
  },
  typoCard: {
    fontStyle: "italic",
    height: "160px",
    paddingTop: "3%",
    [theme.breakpoints.up("md")]: {
      height: "110px",
    },
  },
}));

const PostsTabCard = ({
  titel,
  categorie,
  profielfoto,
  lakenhal_activiteit,
  beschrijving,
}) => {
  const classes = useStyles();

  return (
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
              src={"http://localhost:8000/storage/profiel_foto/" +
              profielfoto}
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
            {beschrijving}
          </Typography>
          <CardActions className={classes.actie}>
            <Button className={classes.actieButton} size="large" color="primary">
              Aanmeldingen bekijken
            </Button>
          </CardActions>
        </CardContent>
      </Card>
  );
};

export default PostsTabCard;
