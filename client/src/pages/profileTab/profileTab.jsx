import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import isJson from "../../contexts/isJson";

import {
  Box,
  Button,
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

const ProfileTab = ({ selectedTab, user }) => {
  const classes = useStyles();

  // TODO:

  // zodra database images traag loaden -> npm install material-ui-image
  // dit moet vervangen worden voor database data uiteraard
  const props = [
    {
      category: "Informatie",
      bio: "voorbeeld biografie",
      beroep: "voorbeeld beroep",
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
      category: "interesses",
      items: ["voorbeeld interesse"],
    },
    {
      category: "eigenschappen",
      items: ["voorbeeld eigenschappen"],
    },
  ];

  const informatie = props[0];
  const favoKunst = props[1];
  const interesses = props[2];
  const eigenschappen = props[3];

  let Interesses = user && Object.assign({}, [user.interesses]);
  let Eigenschappen = user && Object.assign({}, [user.eigenschappen]);

  if (user && isJson([user.interesses])) {
    Interesses = Object.assign({}, JSON.parse([user.interesses]));
  }
  if (user && isJson([user.eigenschappen])) {
    Eigenschappen = Object.assign({}, JSON.parse([user.eigenschappen]));
  }

  return (
    <Box className={classes.pageContainer}>
      <Box className={classes.avatarContainer}>
        {user.profiel_foto != null ? (
          <Avatar
            alt="Profiel foto"
            className={classes.profilePicture}
            src={
              "http://localhost:8000/storage/profiel_foto/" + user.profiel_foto
            }
          />
        ) : (
          <Avatar
            alt="Profiel foto"
            className={classes.profilePicture}
            src={informatie.profielfoto}
          />
        )}
        <Box>
          <Typography variant="h4" className={classes.name}>
            {user.naam}
          </Typography>
          <Box className={classes.workContainer}>
            <WorkOutlineIcon className={classes.beroepIcon} />
            <Typography variant="subtitle1" className={classes.beroep}>
              {user.beroep ? user.beroep : informatie.beroep}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className={classes.subContainer}>
        <Typography variant="h6" component="h3" className={classes.title}>
          Over {user.naam}
        </Typography>
        <Typography variant="body1">
          {user.biografie ? user.biografie : informatie.bio}
        </Typography>
      </Box>

      <Box className={classes.subContainer}>
        <Typography variant="h6" component="h3" className={classes.title}>
          Interesses
        </Typography>
        <Box className={classes.chips}>
          {user.interesses
            ? Object.entries(Interesses).map(([key, value]) => {
                return <Chip key={key} label={value} />;
              })
            : interesses.items.map((interesse) => (
                <Chip key={interesse} label={interesse} />
              ))}
        </Box>
      </Box>
      <Box className={classes.subContainer}>
        <Typography variant="h6" component="h3" className={classes.title}>
          Kenmerkende eigenschappen
        </Typography>
        <Box className={classes.chips}>
          {user.eigenschappen
            ? Object.entries(Eigenschappen).map(([key, value]) => {
                return <Chip key={key} label={value} />;
              })
            : eigenschappen.items.map((eigenschap) => (
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
      <Button onClick={selectedTab}>Bewerk Profiel</Button>
    </Box>
  );
};

export default ProfileTab;
