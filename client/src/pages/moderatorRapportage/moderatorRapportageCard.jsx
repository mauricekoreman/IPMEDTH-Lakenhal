import React from "react";
import { useAuth } from '../../contexts/authContext'
import pf from "../../assets/img/placeholders/profile_picture_placeholder.jpg";
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
  Button
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

  rapportageCard: {
    width: '80%',
    margin: '0 auto',
    position: 'relative',
  },
  rapportageCardContent: {
    "&:last-child": {
      paddingBottom: 0
    }
  },
  profilePicture: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    
  },
  cardMediaLogo: {
    width: theme.spacing(5),
    height: theme.spacing(6),
    position: 'absolute',
    right: 0
  },
  headerCard: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  opdrachtCard: {
    marginLeft: theme.spacing(),
    
  },
  opdrachtCardSubtitle: {
    opacity: 0.6,
  },
  actie:{
    padding: 0
  },
  actieButton:{
    paddingLeft: 0,
    justifyContent: 'flex-start',
  },
  typoCard:{
    fontStyle: 'italic',
  }
}));

const ModeratorRapportageCard = ({titel, categorie, naam, aantalRapportages, profielfoto, lakenhal_activiteit}) => {
  const classes = useStyles();
  return (  
        <Card className={classes.rapportageCard}>
          {lakenhal_activiteit && 
            <CardMedia
              className={classes.cardMediaLogo}
              component="img"
              alt="Lakenhal logo"
              src={lakenhal_sw}
              title="Lakenhal logo"
          />}
          <CardContent className={classes.rapportageCardContent}>
            <Box className={classes.headerCard}>
              <Avatar
                alt="Profiel foto"
                className={classes.profilePicture}
                src={"http://localhost:8000/storage/profiel_foto/" + profielfoto}
              />
              <Box className={classes.opdrachtCard}>
                <Typography variant='h6' component='h3' className={classes.opdrachtCardTitle}>{titel}</Typography>
                <Typography variant='caption' className={classes.opdrachtCardSubtitle}>{categorie}</Typography>
              </Box>
            </Box>
            <Typography className={classes.typoCard} variant="body2">Naam: {naam}</Typography>
            <Typography className={classes.typoCard} variant="body2">Aantal keer gerapporteerd: {aantalRapportages}</Typography>
            <CardActions className={classes.actie}>
              <Button className={classes.actieButton} size='large' color="primary">
                ACTIES
              </Button>
            </CardActions>
          </CardContent>
        </Card>
  )
};

const styles = {};

export default ModeratorRapportageCard;