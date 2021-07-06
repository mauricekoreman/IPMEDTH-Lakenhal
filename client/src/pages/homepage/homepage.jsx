import React, { useState, useEffect } from "react";

import CreatePost from "../../components/activiteit/createpost";
import PostList from "../../components/activiteit/postList";
import axios from "axios";
import Fab from "../../components/fab/fab";
import { FormHelperText, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "0 auto",
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(7),
    backgroundColor: "cyan",
  },
  fabPosition: {
    margin: 0,
    top: "auto",
    right: theme.spacing(2),
    bottom: theme.spacing(2) + 56, // 56 == root height of bottom bar
    left: "auto",
    position: "fixed",
    [theme.breakpoints.up("md")]: {
      bottom: theme.spacing(20),
      right: theme.spacing(30),
      width: '75px',
      height: '75px'
    },
  },
}));

const Homepage = () => {
  const classes = useStyles();
  const activiteitData = [];
  const [maakActiviteitOpen, setMaakActiviteitOpen] = useState(false);
  const [values, setValues] = useState(activiteitData);

  const maakActiviteitClick = () => {
    setMaakActiviteitOpen(!maakActiviteitOpen);
  };
  const TEST_URL = "http://127.0.0.1:8000/api/";

  const activiteitenFetch = (refresh = false) => {
    axios
      .get(TEST_URL + "activiteitenUsers")
      .then((response) => {
        console.log(response.data);
        setValues(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
    // if (refresh) {
    //   window.location.reload();
    // }
  };

  useEffect(() => {
    activiteitenFetch();
  }, []);

  return (
    <div>
      <PostList values={values} />
      <Fab
        position={classes.fabPosition}
        color={"primary"}
        ariaLabel="schrijf post"
        size="medium"
        maakActiviteitClick={maakActiviteitClick}
      />
      <CreatePost
        open={maakActiviteitOpen}
        closeScreen={maakActiviteitClick}
        onReload={() => {
          activiteitenFetch(true);
        }}
      />
    </div>
  );
};

export default Homepage;
