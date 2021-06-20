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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FlatList from "flatlist-react";
import { Button } from "@material-ui/core/";
import DetailPost from "../detailPost/detailPost";
import MuiAlert from "@material-ui/lab/Alert";
import pf from "../../assets/img/placeholders/profile_picture_placeholder.jpg";

import { Menu, MenuItem, Snackbar } from "@material-ui/core";

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
    // maxHeight: "500px",
    paddingTop: "60px",
    // overflow: "auto",
  },
  appBar: {
    position: "relative",
  },
  content: {
    marginBottom: theme.spacing(0),
  },
  snackBar: {
    marginBottom: theme.spacing(10),
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
      console.log(valuesOfList);
      console.log("nani");
      console.log(valuesOfList.user_ID);
      console.log(valuesOfList.activiteit_ID);
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

  const handleClick = (event) => {
    console.log("hi");
    setAnchorEl(event.currentTarget);
    console.log(anchorEl);
  };

  const renderPost = (valuesOfList, idx) => {
    return (
      <div className={classes.container} key={idx}>
        <Card className={classes.root}>
          {console.log(valuesOfList.profiel_foto)}
          <CardHeader
            avatar={
              valuesOfList.profiel_foto === null ? (
                <Avatar
                  alt="Profiel foto"
                  className={classes.profilePicture}
                  // src={`data:image/png;base64, ${valuesOfList.profiel_foto}`}
                  src={pf}
                ></Avatar>
              ) : (
                <Avatar
                  alt="Profiel foto"
                  className={classes.profilePicture}
                  // src={`data:image/png;base64, ${valuesOfList.profiel_foto}`}
                  src={
                    "http://localhost:8000/storage/profiel_foto/" +
                    valuesOfList.profiel_foto
                  }
                ></Avatar>
              )
            }
            action={
              <div>
                <IconButton onClick={handleClick} aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>sluit menu</MenuItem>
                </Menu>
              </div>
            }
            title={valuesOfList.titel}
            subheader={valuesOfList.categorie}
          />
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
          <CardActions>
            <Button
              onClick={() => {
                activiteitClick(valuesOfList);
              }}
              size="small"
              color="primary"
            >
              Meer informatie
            </Button>
            <Button
              onClick={() => {
                handleClose(true, valuesOfList);
              }}
              size="small"
              color="primary"
            >
              Rapporteer
            </Button>
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