import React, { forwardRef, useState, useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";
import lakenhal_sw from "../../assets/img/lakenhal_sw.png";
import pf from "../../assets/img/placeholders/profile_picture_placeholder.jpg";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import AanmeldingenList from "./aanmeldingenList.jsx";
import isJson from "../../contexts/isJson";
import InschrijvenActiviteit from "../activiteit/inschrijvenActiviteit";
import ActieButtons from "./ActieButtons.jsx";
import GroupIcon from "@material-ui/icons/Group";
import MuiAlert from "@material-ui/lab/Alert";

import {
  Typography,
  makeStyles,
  Box,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  Slide,
  Dialog,
  Chip,
  Snackbar
} from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  headerDetail: {
    display: "flex",
    justifyContent: "space-between",
    padding: theme.spacing(2, 0),
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  lakenhalLogo: {
    height: "50px",
    width: "auto",
  },
  profilePicture: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(1),
  },
  opdrachtSubtitle: {
    fontSize: "1rem",
    opacity: 0.6,
  },
  detailContainer: {
    padding: theme.spacing(0, 2),
  },
  detailsOpdracht: {
    opacity: 0.7,
  },
  detailsOpdrachtBottom: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(4),
  },
  detailsDatumText: {
    opacity: 0.7,
    marginLeft: "5px",
    marginRight: "20px",
  },
  detailsDatum: {
    display: "flex",
  },
  detailsDatumIcon: {
    opacity: 0.7,
  },
  topImage: {
    width: "100%",
    height: theme.spacing(22),
    padding: 0,
    margin: 0,
  },
  topImageAanmeldingPage: {
    width: "100%",
    height: theme.spacing(13),
    padding: 0,
    margin: 0,
  },
  aantalDeelnemersContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(3),

    "& p": {
      fontSize: "1.2rem",
      display: "flex",
      marginLeft: theme.spacing(1),

      "&:first-child": {
        color: theme.palette.primary.main,
      },
    },
  },
}));

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DetailPost = ({ open, closeScreen, activiteit, rapporteerPost = false }) => {
  console.log(rapporteerPost)
  const classes = useStyles();
  const [ingeschreven, setIngeschreven] = useState();
  const [aantalAanmeldingen, setAantalAanmeldingen] = useState(0);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [rapportageSuccesvol, setRapportageSuccesvol] = useState(false);

  const TEST_URL = "http://127.0.0.1:8000/api/";

  //pak de ingelogde user
  let user = localStorage.getItem("user");
  if (isJson(user)) {
    user = JSON.parse(user);
  }

  const fetchAangemeldeUsers = async () => {
    try {
      const res = await fetch(
        TEST_URL + "inschrijvingen/activiteitUser/" + activiteit.activiteit_ID
      );
      const aanmeldingen = await res.json();
      setAantalAanmeldingen(aanmeldingen.length);
    } catch (error) {
      console.log(error.response);
    }
  };

  //kijk of de user al ingescgreven is
  const fetchInschrijving = async () => {
    try {
      const res = await fetch(
        TEST_URL +
          "ingeschreven/activiteit/" +
          activiteit.activiteit_ID +
          "/" +
          user.user_ID
      );
      const ingeschreven = await res.json();
      setIngeschreven(ingeschreven);
    } catch (error) {
      console.log("user niet ingeschreven");
    }
  };

  function getDate(date) {
    const splitDate = date.split(/[-:.T]/);
    return splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];
  }

  const openSnackBar = (succesVolRapportage) => {
    setSnackBarOpen(true);
    setRapportageSuccesvol(succesVolRapportage);
  };

  const closeSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };

  useEffect(() => {
    if (activiteit !== undefined) {
      fetchInschrijving();
      fetchAangemeldeUsers();
    }
  }, [activiteit]);
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => closeScreen()}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => closeScreen()}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Detail Post
          </Typography>
        </Toolbar>
      </AppBar>

      {open && (
        <Box>
          {window.location.href !== "http://localhost:3000/profiel" ? (
            <img
              className={classes.topImage}
              src={
                "http://localhost:8000/storage/profiel_foto/" +
                activiteit.afbeelding
              }
              alt="activiteit afbeelding"
            />
          ) : (
            <img
              className={classes.topImageAanmeldingPage}
              src={
                "http://localhost:8000/storage/profiel_foto/" +
                activiteit.afbeelding
              }
              alt="activiteit afbeelding"
            />
          )}
          <Box className={classes.detailContainer}>
            <Box className={classes.headerDetail}>
              <Box className={classes.left}>
                {activiteit.profiel_foto === null ? (
                  <Avatar
                    alt="Profiel foto"
                    className={classes.profilePicture}
                    src={pf}
                  ></Avatar>
                ) : (
                  <Avatar
                    alt="Profiel foto"
                    className={classes.profilePicture}
                    src={
                      "http://localhost:8000/storage/profiel_foto/" +
                      activiteit.profiel_foto
                    }
                  ></Avatar>
                )}
                <Box className={classes.opdracht}>
                  <Typography
                    variant="h6"
                    component="h3"
                    className={classes.opdrachtTitle}
                  >
                    {activiteit.titel}
                  </Typography>
                  <Typography
                    variant="caption"
                    className={classes.opdrachtSubtitle}
                  >
                    {activiteit.categorie}
                  </Typography>
                </Box>
              </Box>
              <Box className={classes.right}>
                {activiteit.lakenhal_activiteit && (
                  <img
                    src={lakenhal_sw}
                    className={classes.lakenhalLogo}
                    alt="Lakenhal logo"
                  />
                )}
              </Box>
            </Box>

            <Typography variant="body1" className={classes.detailsOpdracht}>
              {activiteit.beschrijving}
            </Typography>
            <Box className={classes.detailsOpdrachtBottom}>
              <Chip label={activiteit.categorie} />
              <Box className={classes.detailsDatum}>
                <QueryBuilderIcon className={classes.detailsDatumIcon} />
                <Typography
                  className={classes.detailsDatumText}
                  variant="body1"
                >
                  {getDate(activiteit.created_at)}
                </Typography>
              </Box>
            </Box>

            <Box className={classes.aantalDeelnemersContainer}>
              <GroupIcon />
              <Typography variant="body1">
                Aantal deelnemers:{" "}
                <Typography variant="body1">
                  {aantalAanmeldingen} / {activiteit.max_aantal_deelnemers}
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Snackbar
            className={classes.snackBar}
            open={snackBarOpen}
            autoHideDuration={1500}
            onClose={closeSnackBar}
          >
            {rapportageSuccesvol ? (
              <Alert onClose={closeSnackBar} severity="success">
                Rapportage succesvol!
              </Alert>
            ) : (
              <Alert onClose={closeSnackBar} severity="error">
                Al gerapporteerd!
              </Alert>
            )}
          </Snackbar>
          {user !== null ? window.location.href === "http://localhost:3000/" &&
              user.user_ID !== activiteit.user_ID &&
              ingeschreven === false && rapporteerPost === false && (
                <InschrijvenActiviteit
                  user={user}
                  activiteit={activiteit.activiteit_ID}
                />
              )
             : (
                <div></div>
              )
          }
           {user !== null ?
            window.location.href === "http://localhost:3000/" &&
            user.user_ID !== activiteit.user_ID &&
            ingeschreven === false && rapporteerPost === true && (
              <ActieButtons
              close={closeScreen}
              user={activiteit.user_ID}
              activiteit={activiteit.activiteit_ID}
              rapporteerPost={rapporteerPost}
              openSnackBar={openSnackBar}
            />
            )    
            : (
            <div></div>
          )}
          {window.location.href === "http://localhost:3000/profiel" && (
            <AanmeldingenList activiteit_ID={activiteit.activiteit_ID} />
          )}
          {window.location.href === "http://localhost:3000/moderator" && (
            <ActieButtons
              closed={closeScreen}
              user={activiteit.user_ID}
              activiteit={activiteit.activiteit_ID}
            />
          )}
        </Box>
      )}
    </Dialog>
  );
};

export default DetailPost;
