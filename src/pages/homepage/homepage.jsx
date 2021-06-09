import React, {useState, useEffect} from "react";

import Typography from "@material-ui/core/Typography";
import CreatePost from "../../components/activiteit/createpost";
import PostList from "../../components/activiteit/postList"

import Fab from "../../components/fab/fab";
import {Grid, Box, makeStyles, useTheme } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    position: "relative",
    display: "flex",
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(6),
  },
  fabPosition: {
    margin: 0,
    top: "auto",
    right: theme.spacing(2),
    bottom: theme.spacing(2) + 56, // 56 == root height of bottom bar
    left: "auto",
    position: "fixed",
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(7),
  },
}));

const Homepage = () => {
  const classes = useStyles();
  const [maakActiviteitOpen, setMaakActiviteitOpen] = useState(false)
  const maakActiviteitClick = () => {
    setMaakActiviteitOpen(!maakActiviteitOpen)
  }
  console.log(maakActiviteitOpen)
  return (
    <div>
      <Grid container className={classes.container} spacing={3}>
        <Grid item xs={1}>
         
        </Grid>

        <Grid item xs={10}>
          <PostList/>
          
        </Grid>

        <Grid item xs={1}>
          
        </Grid>
 

      </Grid>

      

      <Fab
          position={classes.fabPosition}
          color={"primary"}
          ariaLabel="schrijf post"
          size="medium"
          maakActiviteitClick={maakActiviteitClick}
        />
        <CreatePost open={maakActiviteitOpen} closeScreen={maakActiviteitClick}/>
    </div>
  );
};

export default Homepage;
