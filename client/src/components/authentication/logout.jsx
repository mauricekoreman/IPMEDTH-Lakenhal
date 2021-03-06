import React from "react";

import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import { useHistory } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";
import { TEST_URL } from "../../assets/globalVariables";

const useStyles = makeStyles((theme) => ({
  logOutButton: {
    width: "80%", 
    margin: "0 auto", 
    marginTop: "20px",
    [theme.breakpoints.up("md")]: {
      fontSize: "25px"
    },
  }
}));

const Logout = () => {
   
  const classes = useStyles();
  const history = useHistory();
  const { setCurrentUser } = useAuth();

  const signOut = () => {
    const token = JSON.parse(localStorage.getItem("token"));

    axios
      .get(TEST_URL + "auth/logout", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        //ga naar loginpagina
        history.push("/login");
        //useContext user
        setCurrentUser(null);
        //localstorage user en token
        localStorage.clear();
      })
      .catch((error) => {
        history.push("/login");
        localStorage.clear();
        setCurrentUser(null);
        console.log(error.response);
      });
  };

  return (
    <Button
      variant="outlined"
      className={classes.logOutButton}
      onClick={() => signOut()}
    >
      Uitloggen
    </Button>
  );
};

export default Logout;
