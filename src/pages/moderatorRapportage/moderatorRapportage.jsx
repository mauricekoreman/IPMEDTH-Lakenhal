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
  pageContainer: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
  },
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
        
        <Card className={classes.rapportageCard}>
          <CardMedia
                  className={classes.cardMediaLogo}
                  component="img"
                  alt="Lakenhal logo"
                  src={lakenhal_sw}
                  title="Lakenhal logo"
          />
          <CardContent className={classes.rapportageCardContent}>
            <Box className={classes.headerCard}>
              <Avatar
                alt="Profiel foto"
                className={classes.profilePicture}
                src={pf}
              />
              <Box className={classes.opdrachtCard}>
                <Typography variant='h6' component='h3' className={classes.opdrachtCardTitle}>3D Vilten</Typography>
                <Typography variant='caption' className={classes.opdrachtCardSubtitle}>Thuisatelier opdracht</Typography>
              </Box>
            </Box>
            <Typography className={classes.typoCard} variant="body2">Naam: Ilse Storm</Typography>
            <Typography className={classes.typoCard} variant="body2">Aantal keer gerapporteerd: 68</Typography>
            <CardActions className={classes.actie}>
              <Button className={classes.actieButton} size='large' color="primary">
                ACTIES
              </Button>
            </CardActions>
          </CardContent>
        </Card>
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