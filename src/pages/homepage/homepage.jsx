import React, {useState, useEffect} from "react";

import Typography from "@material-ui/core/Typography";
import CreatePost from "../../components/activiteit/createpost";
import ShowPost from "../../components/activiteit/showpost"

import InschrijvenActiviteit from "../../components/activiteit/inschrijvenActiviteit"
import { useAuth } from '../../contexts/authContext'
import isJson from '../../contexts/isJson'
import axios from "axios";

import Fab from "../../components/fab/fab";
import { Box, makeStyles, useTheme } from "@material-ui/core";

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
    <Box className={classes.pageContainer}>
      <Typography>Homepage</Typography>
      <ShowPost/>
      <CreatePost/>
      <InschrijvenActiviteit user={user} activiteit_ID={activiteit_ID}/>
      <Fab
        position={classes.fabPosition}
        color={"primary"}
        ariaLabel="schrijf post"
        size="medium"
      />
    </Box>
  );
};

export default Homepage;
