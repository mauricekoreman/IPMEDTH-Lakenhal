import React, {useState, useEffect} from "react";

import Typography from "@material-ui/core/Typography";
import CreatePost from "../../components/activiteit/createpost";
import PostList from "../../components/activiteit/postList"
import axios from "axios";
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
  const activiteitData = [];
  const [maakActiviteitOpen, setMaakActiviteitOpen] = useState(false)
  const [values, setValues] = useState(activiteitData);
  const maakActiviteitClick = () => {
    setMaakActiviteitOpen(!maakActiviteitOpen)
  }
  const TEST_URL = "http://127.0.0.1:8000/api/";

  const activiteitenFetch = () => {
    axios.get(TEST_URL+'activiteitenUsers')
        .then(response => {
            console.log(response.data)
            setValues(response.data)             
        })
        .catch(error => {
            console.log(error.response)
        })
  }

  useEffect(() => {
    activiteitenFetch()
  }, []);

  return (
    <div>
      <Grid container className={classes.container} spacing={3}>
        <Grid item xs={1}>
         
        </Grid>

        <Grid item xs={10}>
          <PostList values={values}/>
          
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
        <CreatePost open={maakActiviteitOpen} closeScreen={maakActiviteitClick} onReload={activiteitenFetch}/>
    </div>
  );
};

export default Homepage;
