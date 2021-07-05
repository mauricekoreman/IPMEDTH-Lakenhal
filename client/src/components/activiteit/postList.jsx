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
import { Box, Button, FormHelperText } from "@material-ui/core/";
import DetailPost from "../detailPost/detailPost";
import MuiAlert from "@material-ui/lab/Alert";
import pf from "../../assets/img/placeholders/profile_picture_placeholder.jpg";
import GroupIcon from "@material-ui/icons/Group";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import ReportProblemRoundedIcon from "@material-ui/icons/ReportProblemRounded";
import CardActionArea from "@material-ui/core/CardActionArea";

import { Snackbar, Grid } from "@material-ui/core";

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
  containerCard: {
    "&:not(:last-child)": {
      marginBottom: theme.spacing(3),
    },
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
  container: {
    margin: "0 auto",
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(7),
    width: "90%",
    [theme.breakpoints.up("xl")]: {
      width: "80%",
    },
  },
  gridItem: {
    display: "flex",
    margin: "0 auto",
  },
  profilePicture: {
    [theme.breakpoints.up("md")]: {
      width: "90px",
      height: "90px",
    },
  },
  titleCard: {
    [theme.breakpoints.up("md")]: {
      fontSize: "26px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "34px",
    },
  },
  subheaderCard: {
    [theme.breakpoints.up("md")]: {
      fontSize: "24px",
    },
  },
  contentText: {
    [theme.breakpoints.up("md")]: {
      fontSize: "18px",
      height: "100px",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "18px",
      height: "100px",
    },
  },
  cardHeader: {
    [theme.breakpoints.up("lg")]: {
      height: "180px",
    },
  },
  informatieButton: {
    [theme.breakpoints.up("md")]: {
      fontSize: "20px",
    },
  },
}));

const TEST_URL = "http://127.0.0.1:8000/api/";

const PostList = ({ values }) => {
  const classes = useStyles();
  const [detailActiviteitOpen, setDetailActiviteitOpen] = useState(false);
  const [detailActiviteit, setDetailActiviteit] = useState([]);
  const [detailActiviteitRapportage, setDetailActiviteitRapportage] =
    useState(false);

  const activiteitClick = (activiteit, rapportage = false) => {
    if (rapportage) {
      setDetailActiviteitRapportage(true);
    } else {
      setDetailActiviteitRapportage(false);
    }
    setDetailActiviteitOpen(!detailActiviteitOpen);
    setDetailActiviteit(activiteit);
  };

  function getDate(date) {
    const splitDate = date.split(/[-:.T]/);
    return splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];
  }

  const renderPost = (valuesOfList, idx) => {
    return (
      <Grid item xs={12} sm={8} md={6} lg={4} className={classes.gridItem}>
        <Card className={classes.root}>
          <CardHeader
            className={classes.cardHeader}
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
                  activiteitClick(valuesOfList, true);
                }}
                aria-label="settings"
              >
                <ReportProblemRoundedIcon />
              </IconButton>
            }
            title={valuesOfList.titel}
            subheader={valuesOfList.categorie}
            classes={{
              title: classes.titleCard,
              subheader: classes.subheaderCard,
            }}
          />
          <CardActionArea
            onClick={() => {
              activiteitClick(valuesOfList);
            }}
          >
            {valuesOfList.afbeelding != null && (
              <CardMedia
                className={classes.media}
                image={
                  "http://localhost:8000/storage/profiel_foto/" +
                  valuesOfList.afbeelding
                }
                title=""
              />
            )}
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
              className={classes.informatieButton}
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
                <GroupIcon fontSize="small" className={classes.groepIcoon} />
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
      </Grid>
    );
  };

  return (
    <div>
      <Grid container spacing={3} className={classes.container}>
        <FlatList
          list={values}
          renderItem={renderPost}
          renderWhenEmpty={() => <></>}
          renderOnScroll
          reversed
        />
      </Grid>
      <DetailPost
        open={detailActiviteitOpen}
        closeScreen={activiteitClick}
        activiteit={detailActiviteit}
        rapporteerPost={detailActiviteitRapportage}
      />
    </div>
  );
};

export default PostList;
