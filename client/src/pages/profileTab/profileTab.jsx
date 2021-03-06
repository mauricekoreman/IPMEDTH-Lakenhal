import React, { forwardRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import isJson from "../../contexts/isJson";
import ProfileEditTab from "./profileEditTab";

import { kunstwerken } from "../../assets/kunstwerken";

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  Typography,
  Slide,
} from "@material-ui/core";

// delete after making dynamic links
import pf from "../../assets/img/placeholders/profile_picture_placeholder.jpg";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(4),
    maxWidth: 600,
    margin: "0 auto",
  },
  topInfoContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
  },
  avatarContainer: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.grey[300],
    borderRadius: "100%",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
  },
  placeholderProfielPicture: {
    fontSize: "1.5rem",
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
    maxWidth: 600,
    marginBottom: theme.spacing(2),
    "&:last-child": {
      marginBottom: theme.spacing(8),
    },
  },
  cardMedia: {
    height: 210,
    [theme.breakpoints.down(450)]: {
      height: 140,
    },
  },
  editButton: {
    display: "block",
    position: "fixed",
    left: "0",
    right: "0",
    margin: "0 auto",
    bottom: "70px",
    width: "70%",
    [theme.breakpoints.up("sm")]: {
      width: "350px",
      height: "40px",
    },
    [theme.breakpoints.up("md")]: {
      bottom: "90px",
    },
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProfileTab = ({ user, editProfile = true }) => {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);

  function toggleDialog() {
    setOpenDialog(!openDialog);
  }

  let Interesses = user && Object.assign({}, [user.interesses]);
  let Eigenschappen = user && Object.assign({}, [user.eigenschappen]);
  let Favoriete_kunst = user && Object.assign({}, [user.Favoriete_kunst]);

  if (user && isJson([user.interesses])) {
    Interesses = Object.assign({}, JSON.parse([user.interesses]));
  }
  if (user && isJson([user.eigenschappen])) {
    Eigenschappen = Object.assign({}, JSON.parse([user.eigenschappen]));
  }
  if (user && isJson([user.favoriete_kunst])) {
    Favoriete_kunst = Object.assign({}, JSON.parse([user.favoriete_kunst]));
    console.log(Favoriete_kunst);
  }

  // TODO:

  // zodra database images traag loaden -> npm install material-ui-image
  // dit moet vervangen worden voor database data uiteraard
  const props = [
    {
      category: "Informatie",
      bio: "Bewerk je bio!",
      beroep: "Welk beroep je doe?",
      profielfoto: pf,
    },
    {
      category: "Favoriete kunst",
      items: [
        {
          title:
            user.favoriete_kunst == undefined
              ? kunstwerken[0].titel
              : kunstwerken[Favoriete_kunst[0].id].titel,
          image:
            user.favoriete_kunst == undefined
              ? kunstwerken[0].image
              : kunstwerken[Favoriete_kunst[0].id].image,
        },
        {
          title:
            user.favoriete_kunst == undefined
              ? kunstwerken[1].titel
              : kunstwerken[Favoriete_kunst[1].id].titel,
          image:
            user.favoriete_kunst == undefined
              ? kunstwerken[1].image
              : kunstwerken[Favoriete_kunst[1].id].image,
        },
      ],
    },
    {
      category: "interesses",
      items: ["Welke interesses?"],
    },
    {
      category: "eigenschappen",
      items: ["Welke eigenschappen?"],
    },
  ];

  const informatie = props[0];
  const favoKunst = props[1];
  const interesses = props[2];
  const eigenschappen = props[3];

  return (
    <Box className={classes.pageContainer} data-testid="testProfielTab">
      <Box className={classes.topInfoContainer}>
        <Box className={classes.avatarContainer}>
          {user.profiel_foto != null ? (
            <Avatar
              alt="Profiel foto"
              className={classes.profilePicture}
              src={
                "https://lakenhalmatchedapi.azurewebsites.net/storage/profiel_foto/" +
                user.profiel_foto
              }
            />
          ) : (
            <Typography className={classes.placeholderProfielPicture}>
              {user.naam[0]}
            </Typography>
          )}
        </Box>
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
          {user.interesses === "[]" || user.interesses == null
            ? interesses.items.map((interesse) => (
                <Chip key={interesse} label={interesse} />
              ))
            : Object.entries(Interesses).map(([key, value]) => {
                return <Chip key={key} label={value} />;
              })}
        </Box>
      </Box>
      <Box className={classes.subContainer}>
        <Typography variant="h6" component="h3" className={classes.title}>
          Kenmerkende eigenschappen
        </Typography>
        <Box className={classes.chips}>
          {user.eigenschappen === "[]" || user.eigenschappen == null
            ? eigenschappen.items.map((eigenschap) => (
                <Chip key={eigenschap} label={eigenschap} />
              ))
            : Object.entries(Eigenschappen).map(([key, value]) => {
                return <Chip key={key} label={value} />;
              })}
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
      {editProfile && (
        <div>
          <Button
            className={classes.editButton}
            variant="contained"
            color="primary"
            onClick={toggleDialog}
          >
            Bewerk Profiel
          </Button>
          <Dialog
            fullScreen
            open={openDialog}
            onClose={toggleDialog}
            TransitionComponent={Transition}
          >
            <ProfileEditTab user={user} closeDialog={toggleDialog} />
          </Dialog>
        </div>
      )}
    </Box>
  );
};

export default ProfileTab;
