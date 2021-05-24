import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@material-ui/core";

// delete after making dynamic links
import pf from "../../assets/img/placeholders/profile_picture_placeholder.jpg";
import kunst1 from "../../assets/img/placeholders/kunst_placeholder_1.jpg";
import kunst2 from "../../assets/img/placeholders/kunst_placeholder_2.jpg";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(5),
  },
  avatarContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
  profilePicture: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(2),
  },
  workContainer: {
    display: "flex",
    alignItems: "center",
  },
  beroepIcon: {
    color: theme.palette.grey[600],
  },
  beroep: {
    color: theme.palette.grey[600],
    marginLeft: theme.spacing(0.5),
  },
  title: {
    color: theme.palette.grey[400],
    marginBottom: theme.spacing(0.8),
  },
  subContainer: {
    marginBottom: theme.spacing(3),
  },
  chips: {
    "& > *": {
      marginRight: theme.spacing(1),
    },
  },
  card: {
    maxWidth: 345,
    marginBottom: theme.spacing(2),
  },
  cardMedia: {
    height: 140,
  },
}));

const ProfileTab = () => {
  const classes = useStyles();

  // TODO:

  // zodra database images traag loaden -> npm install material-ui-image
  // dit moet vervangen worden voor database data uiteraard
  const props = [
    {
      category: "Informatie",
      voornaam: "Ilse",
      achternaam: "Storm",
      bio: "Ik ben filmmaker. Op dit moment werk ik aan twee documentaires in Leiden: 'Kind van de Rekening', over jeugdzorg. En 'Leren in Leiden', over de mogelijkheden van elk kind om te leren.",
      beroep: "Filmmaker",
      profielfoto: pf,
    },
    {
      category: "Favoriete kunst",
      items: [
        {
          title: "Kunst title 1",
          image: kunst1,
        },
        {
          title: "Kunst title 2",
          image: kunst2,
        },
      ],
    },
    {
      category: "Interesses",
      items: ["Film", "Documentaires", "Educatie"],
    },
    {
      category: "eigenschappen",
      items: ["Sociaal", "Gedreven"],
    },
  ];

  const informatie = props[0];
  const favoKunst = props[1];
  const interesses = props[2];
  const eigenschappen = props[3];

  return (
    <Box className={classes.pageContainer}>
      <Box className={classes.avatarContainer}>
        <Avatar
          alt="Profiel foto"
          className={classes.profilePicture}
          src={informatie.profielfoto}
        />
        <Box>
          <Typography variant="h4" className={classes.name}>
            {`${informatie.voornaam} ${informatie.achternaam}`}
          </Typography>
          <Box className={classes.workContainer}>
            <WorkOutlineIcon className={classes.beroepIcon} />
            <Typography variant="subtitle1" className={classes.beroep}>
              {informatie.beroep}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className={classes.subContainer}>
        <Typography variant="h6" component="h3" className={classes.title}>
          {`Over ${informatie.voornaam}`}
        </Typography>
        <Typography variant="body1">{informatie.bio}</Typography>
      </Box>

      <Box className={classes.subContainer}>
        <Typography variant="h6" component="h3" className={classes.title}>
          Interesses
        </Typography>
        <Box className={classes.chips}>
          {interesses.items.map((interesse) => (
            <Chip key={interesse} label={interesse} />
          ))}
        </Box>
      </Box>
      <Box className={classes.subContainer}>
        <Typography variant="h6" component="h3" className={classes.title}>
          Kenmerkende eigenschappen
        </Typography>
        <Box className={classes.chips}>
          {eigenschappen.items.map((eigenschap) => (
            <Chip key={eigenschap} label={eigenschap} />
          ))}
        </Box>
      </Box>

      <Box className={classes.subContainer}>
        <Typography variant="h6" component="h3" className={classes.title}>
          Favoriete kunst
        </Typography>

        {favoKunst.items.map((kunst) => (
          <Card
            className={classes.card}
            key={kunst.title}
            onClick={() => console.log(`this is card ${kunst.title}`)}
          >
            <CardActionArea>
              <CardMedia
                className={classes.cardMedia}
                image={kunst.image}
                title={kunst.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {kunst.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProfileTab;
