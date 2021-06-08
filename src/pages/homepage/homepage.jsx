import React, {useState, useEffect} from "react";

import Typography from "@material-ui/core/Typography";
import CreatePost from "../../components/activiteit/createpost";
import PostList from "../../components/activiteit/postList"

import InschrijvenActiviteit from "../../components/activiteit/inschrijvenActiviteit"
import { useAuth } from '../../contexts/authContext'
import isJson from '../../contexts/isJson'
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
}));

const Homepage = () => {
  const classes = useStyles();

  const TEST_URL = "http://127.0.0.1:8000/api/";
  const { currentUser } = useAuth();
  const [activiteit_ID, setActiviteit_ID] = useState([]);
  let user = currentUser;
  if(isJson(currentUser)){
      user = JSON.parse(currentUser);
  }
  
  const Activiteit = async () =>{
    axios.get(TEST_URL+'activiteit')
    .then(response => {
        console.log(response.data[2].activiteit_ID)
        setActiviteit_ID(response.data[2].activiteit_ID)             
    })
    .catch(error => {
        console.log(error.response)
    })
  }

  useEffect(() => {
    Activiteit()
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={1}>
         
        </Grid>

        <Grid item xs={10}>
          <CreatePost/>
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
        />
    </div>
  );
};

export default Homepage;
