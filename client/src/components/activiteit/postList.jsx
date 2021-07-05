import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FlatList from "flatlist-react";
import { Box, Button } from "@material-ui/core/";
import DetailPost from "../detailPost/detailPost";
import MuiAlert from "@material-ui/lab/Alert";
import pf from "../../assets/img/placeholders/profile_picture_placeholder.jpg";
import GroupIcon from "@material-ui/icons/Group";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import ReportProblemRoundedIcon from "@material-ui/icons/ReportProblemRounded";
import CardActionArea from '@material-ui/core/CardActionArea';

import { Snackbar } from "@material-ui/core";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
  },
  media: {
    height: 140,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  container: {
    paddingTop: "30px",
  },
  appBar: {
    position: "relative",
  },
  snackBar: {
    marginBottom: theme.spacing(10),
  },
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    display: "flex",
    marginRight: "13px",
    opacity: 0.7,

    "& p": {
      marginLeft: theme.spacing(0.5),
    },
  },
  aantalDeelnemers: {
    display: "flex",
    marginRight: theme.spacing(2),

    "& p": {
      marginLeft: theme.spacing(0.5),
    },
  },
}));

const TEST_URL = "http://127.0.0.1:8000/api/";

const PostList = ({ values }) => {
  const classes = useStyles();
  const [detailActiviteitOpen, setDetailActiviteitOpen] = useState(false);
  const [detailActiviteit, setDetailActiviteit] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [rapportageSuccesvol, setRapportageSuccesvol] = useState(false);

  const activiteitClick = (activiteit) => {
    setDetailActiviteitOpen(!detailActiviteitOpen);
    setDetailActiviteit(activiteit);
  };

  const handleClose = (gerapporteerd = false, valuesOfList = null) => {
    if (gerapporteerd === true) {
      let userActiviteit = {
        user_ID: valuesOfList.user_ID,
        activiteit_ID: valuesOfList.activiteit_ID,
      };
      const setRapportage = async () => {
        const res = await fetch(TEST_URL + "activiteit/rapporteer", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(userActiviteit),
        });
        if (res.status === 201) {
          openSnackBar(true);
          console.log("rapportage succesvol");
        }
        if (res.status === 200) {
          openSnackBar(false);
          console.log("al gerapporteerd!");
        }
      };
      setRapportage();
      //rapporteer activiteit ophalen in back end checken of deze user dit activiteit al heeft gerapporteerd if true return

      //else in de back end bij het activiteit +1 rapportage toevoegen
    }
    setAnchorEl(null);
  };

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

  function getDate(date) {
    const splitDate = date.split(/[-:.T]/);
    return splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];
  }

  const renderPost = (valuesOfList, idx) => {
    return (
      <div className={classes.container} key={idx}>
        <Card className={classes.root}>
          <CardHeader
            avatar={
              valuesOfList.profiel_foto === null ? (
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
                    valuesOfList.profiel_foto
                  }
                ></Avatar>
              )
            }
            action={
              <IconButton
                fontSize="small"
                onClick={() => {
                  handleClose(true, valuesOfList);
                }}
                aria-label="settings"
              >
                <ReportProblemRoundedIcon />
              </IconButton>
            }
            title={valuesOfList.titel}
            subheader={valuesOfList.categorie}
          />
          <CardActionArea
          onClick={() => {
            activiteitClick(valuesOfList);
          }}>
            <CardMedia
              className={classes.media}
              // image={`data:image/png;base64, ${valuesOfList.afbeelding}`}
              image={
                "http://localhost:8000/storage/profiel_foto/" +
                valuesOfList.afbeelding
              }
              title=""
            />
            <CardContent className={classes.content}>
              <Typography
                className={classes.contentText}
                variant="body2"
                color="textSecondary"
                component="p"
              >
                {valuesOfList.beschrijving.substring(0, 200) + "..."}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.cardActions}>
            <Button
              onClick={() => {
                activiteitClick(valuesOfList);
              }}
              size="small"
              color="primary"
            >
              Meer informatie
            </Button>

            <Box className={classes.date}>
              <Box className={classes.aantalDeelnemers}>
                <GroupIcon fontSize="small" />
                <Typography variant="body2">
                  {valuesOfList.max_aantal_deelnemers}
                </Typography>
              </Box>

              <QueryBuilderIcon
                fontSize="small"
                className={classes.detailsDatumIcon}
              />
              <Typography className={classes.detailsDatumText} variant="body2">
                {getDate(valuesOfList.created_at)}
              </Typography>
            </Box>
          </CardActions>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <FlatList
        list={values}
        renderItem={renderPost}
        renderWhenEmpty={() => <div>List is empty!</div>}
        renderOnScroll
        reversed
      />
      <Snackbar
        className={classes.snackBar}
        open={snackBarOpen}
        autoHideDuration={3000}
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
      <DetailPost
        open={detailActiviteitOpen}
        closeScreen={activiteitClick}
        activiteit={detailActiviteit}
      />
    </div>
  );
};

export default PostList;
